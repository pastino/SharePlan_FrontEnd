import React, { useState, useEffect, Suspense, Fragment } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
} from "react-native";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SEE_TODO_OF_GOAL, SEE_DAYTODO, SEE_ME } from "../../HomeQueries";
import { DOWN_LOAD, DOWN_LOAD_VIEW } from "../HistoryQuery";
import contents from "../../../../contents";
import * as Progress from "react-native-progress";
import ToDoListText from "../../calendal/data/ToDoListText/ToDoListText";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import styles from "../../../../styles";
import { NavigationActions } from "react-navigation";

const NewGoalCreateView = ({ navigation }) => {
  const toDoes = navigation.getParam("toDoes");
  const [downLoading, setDownLoading] = useState(false);

  const id = navigation.getParam("id");
  const value = navigation.getParam("value");
  const selectCategory = navigation.getParam("selectCategory");
  const selectItem = navigation.getParam("selectItem");
  const cardColor = navigation.getParam("cardColor");
  const startSelectDate = navigation.getParam("startSelectDate");
  const select = navigation.getParam("select");
  const isSwitch = navigation.getParam("isSwitch");
  const keywordValue = navigation.getParam("keywordValue");

  const goalId = navigation.getParam("goalId");
  const maxEndDate = navigation.getParam("maxEndDate");

  const deleteColor = navigation.getParam("deleteColor");
  const deleteAlarm = navigation.getParam("deleteAlarm");
  const deleteTime = navigation.getParam("deleteTime");
  const deleteMemo = navigation.getParam("deleteMemo");

  const toDoList = toDoes && toDoes.map((toDo) => toDo.toDoList);
  const color = toDoes && toDoes.map((toDo) => toDo.color);

  const startDate = toDoes && toDoes.map((toDo) => toDo.startDate);
  const startTime = toDoes && toDoes.map((toDo) => toDo.startTime);
  const endDate = toDoes && toDoes.map((toDo) => toDo.endDate);
  const endTime = toDoes && toDoes.map((toDo) => toDo.endTime);
  const memo = toDoes && toDoes.map((toDo) => toDo.memo);
  const alrams = toDoes && toDoes.map((toDo) => toDo.alrams);
  const originToDoId = toDoes && toDoes.map((toDo) => toDo.originToDoId);

  const categoryId = toDoes && toDoes.map((toDo) => toDo.categoryId);

  const [deleteColorArray, setDeleteColorArray] = useState(null);
  const [deleteAlarmArray, setDeleteAlarmArray] = useState(null);
  const [deleteTimeArray, setDeleteTimeArray] = useState(null);
  const [deleteMemoArray, setDeleteMemoArray] = useState(null);

  useEffect(() => {
    if (deleteColor) {
      const colorArray = [];
      for (let i = 0; i < toDoes.length; i++) {
        colorArray.push("블랙(기본)");
      }
      setDeleteColorArray(colorArray);
    }
    if (deleteAlarm) {
      const alarmArray = [];
      for (let i = 0; i < toDoes.length; i++) {
        alarmArray.push([]);
      }
      setDeleteAlarmArray(alarmArray);
    }
    if (deleteTime) {
      const timeArray = [];
      for (let i = 0; i < toDoes.length; i++) {
        timeArray.push(null);
      }
      setDeleteTimeArray(timeArray);
    }
    if (deleteMemo) {
      const memoArray = [];
      for (let i = 0; i < toDoes.length; i++) {
        memoArray.push(null);
      }
      setDeleteMemoArray(memoArray);
    }
  }, []);

  const { data: test } = useSubscription(DOWN_LOAD_VIEW);

  const [downloadNumber, setDownloadNumber] = useState(0);

  const [downloadData, setDownloadData] = useState([]);

  useEffect(() => {
    if (test !== undefined) {
      setDownloadNumber(downloadNumber + 1 / toDoes.length);
    }
    if (test !== undefined || test != null) {
      setDownloadData(downloadData.concat(test && test.downloadPercentage));
    }
  }, [test]);

  const [downloadMutation] = useMutation(DOWN_LOAD, {
    refetchQueries: () => [{ query: SEE_DAYTODO }, { query: SEE_ME }],
    awaitRefetchQueries: true,
  });
  const toDoAlarmArray = toDoes.filter((toDo) => toDo.alrams.length > 0);

  const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && status === "granted")
      console.log("Notification permissions granted.");
  };

  useEffect(() => {
    if (toDoAlarmArray.length > 0) {
      askNotification();
    }
  }, []);

  const downloadHandle = async () => {
    if (downloadData.length === toDoes.length) {
      navigation.navigate(
        NavigationActions.navigate({
          routeName: "TabNavigation",
          action: NavigationActions.navigate({
            routeName: "Tab1",
            action: NavigationActions.navigate({
              routeName: "HomeDiv",
              action: NavigationActions.navigate({
                routeName: "Home",
              }),
            }),
          }),
        })
      );
    } else {
      setDownLoading(true);
      const alarmTotalArray = [];
      for (let i = 0; i < toDoes.length; i++) {
        if (toDoes[i].alrams.length > 0) {
          const forStartDate = toDoes[i].startDate;
          const splitTime = toDoes[i].startTime.split(":");
          const alarmDate = moment([
            new Date(forStartDate).getFullYear(),
            new Date(forStartDate).getMonth(),
            new Date(forStartDate).getDate(),
            parseInt(splitTime[0]),
            parseInt(splitTime[1]),
            0,
          ]);
          const alarmId = [];
          if (alarmDate > new Date()) {
            for (let j = 0; j < toDoes[i].alrams.length; j++) {
              const alarmTime = moment(alarmDate)
                .subtract(toDoes[i].alrams[j].time, "minutes")
                .toDate();
              if (alarmTime <= new Date()) {
                null;
              } else {
                Notifications.createChannelAndroidAsync("chat-messages", {
                  name: "Chat messages",
                  vibrate: true,
                  sound: true,
                  android: {
                    sound: true,
                  },
                  ios: {
                    sound: true,
                  },
                  priority: "max",
                });
              }
              const localNotification = {
                title:
                  toDoes[i].alrams[j].time === 1
                    ? "1분 후 해야할 일이 있습니다"
                    : toDoes[i].alrams[j].time === 5
                    ? "5분 후 해야할 일이 있습니다"
                    : toDoes[i].alrams[j].time === 15
                    ? "15분 후 해야할 일이 있습니다"
                    : toDoes[i].alrams[j].time === 30
                    ? "30분 후 해야할 일이 있습니다"
                    : toDoes[i].alrams[j].time === 60
                    ? "1시간 후 해야할 일이 있습니다"
                    : toDoes[i].alrams[j].time === 60 * 24
                    ? "24시간 후 해야할 일이 있습니다"
                    : null,
                body: `  · ${moment(alarmDate).format("LT")} - ${
                  toDoes[i].toDoList
                }`,
                android: {
                  channelId: "chat-messages",
                },
              };
              const schedulingOptions = {
                time:
                  new Date(moment(alarmDate).format()).getTime() -
                  toDoes[i].alrams[j].time * 60 * 1000,
              };

              // Notifications show only when app is not active.
              // (ie. another app being used or device's screen is locked)
              const myid = await Notifications.scheduleLocalNotificationAsync(
                localNotification,
                schedulingOptions
              );
              alarmId.push(myid);
            }
            alarmTotalArray.push(alarmId);
          } else {
            alarmTotalArray.push([]);
          }
        } else {
          alarmTotalArray.push([]);
        }
        if (i === toDoes.length - 1) {
          await downloadMutation({
            variables: {
              id,
              toDoList,
              color: deleteColor ? deleteColorArray : color,
              startDate,
              startTime: deleteTime ? deleteTimeArray : startTime,
              endDate,
              endTime: deleteTime ? deleteTimeArray : endTime,
              alrams: alrams.map((alarm) => alarm.map((array) => array.time)),
              alarmId: alarmTotalArray,
              memo: deleteMemo ? deleteMemoArray : memo,
              goalText: value,
              goalStartDate: startSelectDate,
              dDay: select,
              category: selectCategory,
              detailCategory: selectItem,
              keyWord: keywordValue,
              cardColor: cardColor,
              cardPrivate: isSwitch,
              goalId,
              originToDoId: originToDoId,
              maxEndDate: maxEndDate === null ? null : new Date(maxEndDate),
            },
          });
          setDownLoading(false);
          setDownloadNumber(0);
        }
      }
    }
  };

  useEffect(() => {
    if (downloadData.length === toDoes.length) {
      const backAction = () => {
        Alert.alert("다운로드 완료", "홈 화면으로 돌아가시겠습니까?", [
          {
            text: "아니오",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "예",
            onPress: () =>
              navigation.navigate(
                NavigationActions.navigate({
                  routeName: "TabNavigation",
                  action: NavigationActions.navigate({
                    routeName: "Tab1",
                    action: NavigationActions.navigate({
                      routeName: "HomeDiv",
                      action: NavigationActions.navigate({
                        routeName: "Home",
                      }),
                    }),
                  }),
                })
              ),
          },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    } else {
      null;
    }
  }, [downloadData]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: contents.height - 60,
        }}
      >
        {downloadData.length === toDoes.length ? (
          <View
            style={{
              width: contents.width,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
              다운로드가 완료되었습니다.
            </Text>
          </View>
        ) : null}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{
            width: contents.width,
          }}
        >
          {downloadData.length > 0 ? (
            downloadData.map((toDo) => (
              <View key={toDo.id}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 7,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  {toDo.startDate === toDo.endDate ? (
                    <Text
                      style={{
                        fontWeight: "700",
                        color: styles.darkGreyColor,
                      }}
                    >
                      {moment(toDo.startDate).format("YYYY-MM-DD (dd)")}
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontWeight: "700",
                          color: styles.darkGreyColor,
                        }}
                      >
                        {moment(toDo.startDate).format("YYYY-MM-DD (dd)")}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          color: styles.darkGreyColor,
                        }}
                      >
                        {" "}
                        ~{" "}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          color: styles.darkGreyColor,
                        }}
                      >
                        {moment(toDo.endDate).format("YYYY-MM-DD (dd)")}
                      </Text>
                    </>
                  )}
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    key={toDo.id}
                    style={{
                      width: contents.width / 1.15,
                      flexDirection: "column",
                      height: "auto",
                      minHeight: 57,
                      paddingRight: 10,
                      marginBottom: 10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 2,
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderBottomWidth: 0,
                      backgroundColor: "white",
                    }}
                  >
                    <ToDoListText
                      item={toDo}
                      touchable={null}
                      today={new Date()}
                      division={"download"}
                    />
                  </View>
                </View>
              </View>
              // <View key={toDo.id}>
              //   <Text>{toDo.toDoList}</Text>
              // </View>
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: contents.height - 60,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "700", textAlign: "center" }}
              >
                아래 `다운로드` 버튼을 누르시면 해당목표에
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                스케쥴 복사가 시작됩니다.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <TouchableWithoutFeedback onPress={() => downloadHandle()}>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: contents.width,
            height: 60,
            borderTopWidth: 1,
            borderTopColor: styles.lightGreyColor,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: styles.TextSkyBlue,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "700", color: "white" }}>
              {downloadData.length === toDoes.length
                ? "다운로드 완료"
                : "다운로드"}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {downLoading ? (
        <Modal isVisible={downLoading} transparent={true}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.3,
                }}
              >
                <Progress.Circle
                  progress={downloadNumber}
                  width={70}
                  showsText={true}
                  size={70}
                  thickness={5}
                  textStyle={{ color: "white" }}
                  color={"white"}
                  indeterminate={downloadNumber === 0 ? true : false}
                />
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: contents.width / 1.3,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text>
                  {downloadNumber === 0
                    ? "목표 카드 생성중 입니다."
                    : "스케쥴 복사중 입니다. 잠시 기다려주세요..."}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default NewGoalCreateView;
