import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
} from "react-native-gesture-handler";
import { useMutation, useQuery } from "react-apollo-hooks";
import moment from "moment";
import CreateToDoModal from "./CreateToDoModal";
import { SEE_DAYTODO, SEE_MY_GOAL, EDIT_TODO } from "../home/HomeQueries";
import contents from "../../contents";
import styles from "../../styles";
import ExpoIcon from "../../components/ExpoIcon";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { NavigationActions } from "react-navigation";

const EditToDo = ({ navigation: { goBack }, navigation }) => {
  const item = navigation.getParam("item");
  const division = navigation.getParam("division");
  const [value, setValue] = useState(item.toDoList);
  const onChange = (text) => {
    setValue(text);
  };

  const { data, loading } = useQuery(SEE_MY_GOAL, {
    fetchPolicy: "cache-and-network",
  });

  // Origin Goal

  const originGoal = item.goal
    ? data &&
      data.seeMyGoalList &&
      data.seeMyGoalList.filter((goal) => goal.id === item.goal.id) &&
      data.seeMyGoalList.filter((goal) => goal.id === item.goal.id)[0]
    : null;

  console.log(originGoal);

  const goalStagePlans = originGoal && originGoal.detailPlans;

  const startDate = moment(item.startDate).format();

  const oringinGoalPlan =
    goalStagePlans &&
    goalStagePlans.filter(
      (detailPlan) =>
        detailPlan.startingDay <= startDate && detailPlan.endDay >= startDate
    ) &&
    goalStagePlans.filter(
      (detailPlan) =>
        detailPlan.startingDay <= startDate && detailPlan.endDay >= startDate
    )[0];

  const [isEnabled, setIsEnabled] = useState(item.startTime ? true : false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //start
  const today = moment(new Date()).format("YYYY-MM-DD (dd)");
  const [startEndDivision, setStartEndDivision] = useState();
  const [startMinDate, setStartMinDate] = useState();
  const [startMaxDate, setStartMaxDate] = useState();
  const [endMinDate, setEndMinDate] = useState();
  const [endMaxDate, setEndMaxDate] = useState();

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const splitTime = item.startTime ? item.startTime.split(":") : ["00", "00"];
  const splitEndTime = item.endTime ? item.endTime.split(":") : ["00", "00"];

  const [date, setDate] = useState(
    item.startTime
      ? new Date(
          moment([
            new Date(startDate).getFullYear(),
            new Date(startDate).getMonth(),
            new Date(startDate).getDate(),
            parseInt(splitTime[0]),
            parseInt(splitTime[1]),
          ])
        )
      : new Date(item.startDate)
  );

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const [endDate, setEndDate] = useState(
    item.endTime
      ? new Date(
          moment([
            new Date(item.endDate).getFullYear(),
            new Date(item.endDate).getMonth(),
            new Date(item.endDate).getDate(),
            parseInt(splitEndTime[0]),
            parseInt(splitEndTime[1]),
          ])
        )
      : new Date(item.endDate)
  );

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [showDate, setShowDate] = useState(item.startDate);
  const [showTime, setShowTime] = useState(
    item.startTime ? item.startTime : "00:00"
  );

  const [ednShowDate, setEndShowDate] = useState(item.endDate);
  const [endShowTime, setEndShowTime] = useState(
    item.endDate ? item.endDate : "00:00"
  );

  const [selectedTime, setSelectedTime] = useState(false);

  useEffect(() => {
    setShowDate(moment(item.startDate).format("YYYY-MM-DD (dd)"));
    setShowTime(
      item.startTime ? item.startTime : moment(new Date()).format("HH:mm")
    );
    setEndShowDate(moment(item.endDate).format("YYYY-MM-DD (dd)"));
    setEndShowTime(
      item.endTime ? item.endTime : moment(new Date()).format("HH:mm")
    );
    if (originGoal !== undefined && originGoal !== null) {
      setStartMinDate(
        new Date(
          moment(originGoal && originGoal.startDate).format("YYYY"),
          moment(originGoal && originGoal.startDate).format("M") - 1,
          moment(originGoal && originGoal.startDate).format("D")
        )
      );
      setStartMaxDate(
        new Date(
          moment(originGoal && originGoal.dDay).format("YYYY"),
          moment(originGoal && originGoal.dDay).format("M") - 1,
          moment(originGoal && originGoal.dDay).format("D")
        )
      );
      setEndMinDate(
        new Date(
          moment(originGoal && originGoal.startDate).format("YYYY"),
          moment(originGoal && originGoal.startDate).format("M") - 1,
          moment(originGoal && originGoal.startDate).format("D")
        )
      );
      setEndMaxDate(
        new Date(
          moment(originGoal && originGoal.dDay).format("YYYY"),
          moment(originGoal && originGoal.dDay).format("M") - 1,
          moment(originGoal && originGoal.dDay).format("D")
        )
      );
    }
  }, []);

  useEffect(() => {
    setShowDate(moment(date).format("YYYY-MM-DD (dd)"));
    setShowTime(moment(date).format("HH:mm"));
    setEndMinDate(new Date(year, month, day));
    if (date > endDate) {
      setEndDate(date);
    }
  }, [date]);

  useEffect(() => {
    setEndShowDate(moment(endDate).format("YYYY-MM-DD (dd)"));
    setEndShowTime(moment(endDate).format("HH:mm"));
  }, [endDate]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    if (startEndDivision === "start") {
      setDate(currentDate !== undefined ? currentDate : date);
    } else {
      const testDate = moment(date, "YYYY-MM-DD HH:mm");
      const testSelect = moment(currentDate, "YYYY-MM-DD HH:mm");
      const diff = moment.duration(testSelect.diff(testDate)).asMinutes();
      if (mode === "time" && diff < 0) {
        Alert.alert("시작시간 이후로 입력이 가능합니다.");
      } else {
        setEndDate(currentDate !== undefined ? currentDate : endDate);
      }
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //Alarm
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [alarmTimeArray, setAlarmTimeArray] = useState(
    item && item.alrams.length > 0 ? item.alrams : []
  );
  const [alarmView, setAlarmView] = useState(
    item && item.alrams.length > 0 ? item.alrams : []
  );

  const selectedAlarmHandle = ({ select, categoryId }) => {
    if (alarmTimeArray.map((alarm) => alarm.time).includes(select)) {
      setAlarmTimeArray(
        alarmTimeArray.filter((alarm) => alarm.time !== select)
      );
    } else {
      setAlarmTimeArray(alarmTimeArray.concat({ time: select, categoryId }));
    }
  };

  const confirmAlarm = () => {
    setAlarmView(alarmTimeArray);
  };

  const [alarmOpUiData, setAlarmOpUiData] = useState();
  const [alarmCreateData, setAlarmCreateData] = useState([]);
  const [alarmDeleteData, setAlarmDeleteData] = useState([]);

  useEffect(() => {
    const deleteAlram = [];
    const createAlram = [];
    for (let i = 0; i < alarmTimeArray.length; i++) {
      if (
        item.alrams.map((alram) => alram.time).includes(alarmTimeArray[i].time)
      ) {
        null;
      } else {
        createAlram.push(alarmTimeArray[i]);
      }
    }
    for (let i = 0; i < item.alrams.map((alram) => alram.time).length; i++) {
      if (
        alarmTimeArray.map((alarm) => alarm.time).includes(item.alrams[i].time)
      ) {
        null;
      } else {
        deleteAlram.push(item.alrams[i]);
      }
    }

    setAlarmCreateData(createAlram);
    setAlarmDeleteData(deleteAlram);
    const alarmOpUiArray = [];
    for (let i = 0; i < alarmTimeArray.length; i++) {
      alarmOpUiArray.push({
        __typename: "Alram",
        id: Math.random().toString(),
        time: alarmTimeArray[i].time,
        categoryId: alarmTimeArray[i].categoryId,
      });
    }
    setAlarmOpUiData(alarmOpUiArray);
  }, [alarmTimeArray]);

  //Color
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(item.color);

  //Memo

  const [memoValue, setMemoValue] = useState(item.memo ? item.memo : null);
  const memoOnChange = (text) => {
    setMemoValue(text);
  };

  //Goal
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [selectGoal, setSelectGoal] = useState();

  const [goalId, setGoalId] = useState(item && item.goal ? item.goal.id : null);
  const [stagePlanText, setStagePlanText] = useState(
    item && item.goal ? oringinGoalPlan && oringinGoalPlan.stagePlanText : null
  );

  const [startingDay, setStartingDay] = useState(
    item && item.goal ? oringinGoalPlan && oringinGoalPlan.startingDay : null
  );
  const [endDay, setEndDay] = useState(
    item && item.goal ? oringinGoalPlan && oringinGoalPlan.endDay : null
  );
  const [goalKeyword, setGoalKeyword] = useState(
    item && item.goal && originGoal !== undefined ? originGoal.keyWord : null
  );
  const [goalText, setGoalText] = useState(
    item && item.goal && originGoal !== undefined ? originGoal.goalText : null
  );

  const [sale, setSale] = useState(
    item && item.goal && originGoal !== undefined ? originGoal.sale : null
  );

  const selectGoalStageHandle = ({
    goalId,
    stagePlanText,
    startingDay,
    endDay,
    goalKeyword,
    goalText,
  }) => {
    setGoalId(goalId);
    setStagePlanText(stagePlanText);
    setStartingDay(startingDay);
    setEndDay(endDay);
    setGoalKeyword(goalKeyword);
    setGoalText(goalText);
    if (goalId) {
      setStartMinDate(
        goalId
          ? new Date(
              moment(startingDay).format("YYYY"),
              moment(startingDay).format("M") - 1,
              moment(startingDay).format("D")
            )
          : null
      );
      setStartMaxDate(
        goalId
          ? new Date(
              moment(endDay).format("YYYY"),
              moment(endDay).format("M") - 1,
              moment(endDay).format("D")
            )
          : null
      );
      setEndMaxDate(
        goalId
          ? new Date(
              moment(endDay).format("YYYY"),
              moment(endDay).format("M") - 1,
              moment(endDay).format("D")
            )
          : null
      );
      if (
        moment(new Date()).format() >= startingDay &&
        moment(new Date()).format() <= endDay
      ) {
        null;
      } else {
        setDate(new Date(moment(startingDay).format()));
        setEndDate(new Date(moment(startingDay).format()));
      }
    }
  };

  const selectedGoalCancle = () => {
    setGoalId();
    setStagePlanText();
    setStartingDay();
    setEndDay();
    setGoalKeyword();
    setGoalText();
  };

  const [editToDo] = useMutation(EDIT_TODO, {
    update: (proxy, { data: { editToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      const newToDo = data && data.dayToDoes;
      newToDo.splice(
        newToDo.findIndex((obj) => obj.id === item.id),
        1,
        editToDo
      );
      proxy.writeQuery({ query: SEE_DAYTODO, data });
    },
    optimisticResponse: {
      editToDo: {
        __typename: "DayToDo",
        id: item.id,
        toDoList: value,
        color: selectedColor,
        complete: false,
        startDate: showDate.split(" ")[0],
        startTime: isEnabled ? showTime : null,
        endDate: ednShowDate.split(" ")[0],
        endTime: isEnabled ? endShowTime : null,
        alrams: alarmTimeArray.length === 0 ? [] : alarmOpUiData,
        memo: memoValue ? memoValue : null,
        goal: !goalId
          ? null
          : {
              __typename: "Goal",
              id: goalId,
              goalText,
              sale: sale,
            },
        posts: item.posts,
        originToDoId: item.originToDoId,
        index: item.index,
        fixed: item.fixed,
        user: {
          __typename: "User",
          id: Math.random().toString(),
        },
      },
    },
  });

  const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && status === "granted")
      console.log("Notification permissions granted.");
  };

  useEffect(() => {
    askNotification();
  }, []);

  const createToDo = async () => {
    if (item.alrams.length > 0) {
      for (let i = 0; i < item.alrams.length; i++) {
        Notifications.cancelScheduledNotificationAsync(
          item.alrams[i].categoryId
        );
      }
    }
    if (alarmTimeArray.length > 0) {
      const startDate = showDate.split(" ")[0];
      const splitTime = isEnabled ? showTime.split(":") : ["00", "00"];
      const alarmDate = moment([
        new Date(startDate).getFullYear(),
        new Date(startDate).getMonth(),
        new Date(startDate).getDate(),
        parseInt(splitTime[0]),
        parseInt(splitTime[1]),
        0,
      ]);
      const alarmId = [];
      for (let i = 0; i < alarmTimeArray.length; i++) {
        const alarmTime = moment(alarmDate)
          .subtract(alarmTimeArray[i].time, "minutes")
          .toDate();
        if (alarmTime <= new Date()) {
          ToastAndroid.show(
            `알람 ${
              alarmTimeArray[i].time === 1
                ? "1분"
                : alarmTimeArray[i].time === 5
                ? "5분"
                : alarmTimeArray[i].time === 15
                ? "15분"
                : alarmTimeArray[i].time === 30
                ? "30분"
                : alarmTimeArray[i].time === 60
                ? "1시간"
                : alarmTimeArray[i].time === 60 * 24
                ? "24시간"
                : null
            } 전은 설정이 불가합니다.`,
            ToastAndroid.SHORT
          );
          break;
        } else {
          if (i === alarmTimeArray.length - 1) {
            if (division === "calendar") {
              navigation.navigate("CalendarCreateToDo", { division: "edit" });
            } else if (division === "home") {
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
              goBack();
            }
          }
          const alarmTime = alarmTimeArray[i].time;
          const alarmCategoryId = alarmTimeArray[i].categoryId;
          const startDate = showDate.split(" ")[0];
          const splitTime = isEnabled ? showTime.split(":") : ["00", "00"];
          const alarmDate = moment([
            new Date(startDate).getFullYear(),
            new Date(startDate).getMonth(),
            new Date(startDate).getDate(),
            parseInt(splitTime[0]),
            parseInt(splitTime[1]),
            0,
          ]);

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

          const localNotification = {
            title:
              alarmTime === 1
                ? "1분 후 해야할 일이 있습니다"
                : alarmTime === 5
                ? "5분 후 해야할 일이 있습니다"
                : alarmTime === 15
                ? "15분 후 해야할 일이 있습니다"
                : alarmTime === 30
                ? "30분 후 해야할 일이 있습니다"
                : alarmTime === 60
                ? "1시간 후 해야할 일이 있습니다"
                : alarmTime === 60 * 24
                ? "24시간 후 해야할 일이 있습니다"
                : null,
            body: `  · ${moment(alarmDate).format("LT")} - ${value}`,
            // categoryId: alarmCategoryId,
            android: {
              channelId: "chat-messages",
            },
          };

          const schedulingOptions = {
            time:
              new Date(moment(alarmDate).format()).getTime() -
              alarmTime * 60 * 1000,
          };

          // Notifications show only when app is not active.
          // (ie. another app being used or device's screen is locked)
          const myid = await Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          );
          alarmId.push({ myid: myid, time: alarmTime });
        }
        if (i === alarmTimeArray.length - 1) {
          await editToDo({
            variables: {
              id: item.id,
              toDoList: value,
              color: selectedColor,
              startDate: showDate.split(" ")[0],
              startTime: isEnabled ? showTime : null,
              endDate: ednShowDate.split(" ")[0],
              endTime: isEnabled ? endShowTime : null,
              createAlrams:
                alarmCreateData.length > 0
                  ? alarmCreateData.map((alarm) => alarm.time)
                  : null,
              deleteAlrams:
                alarmDeleteData.length > 0
                  ? alarmDeleteData.map((alarm) => alarm.id)
                  : null,
              categoryId:
                alarmId.length > 0 ? alarmId.map((obj) => obj.myid) : null,
              categoryTime:
                alarmId.length > 0 ? alarmId.map((obj) => obj.time) : null,
              memo: memoValue ? memoValue : null,
              goalId: goalId ? goalId : null,
            },
          });
        }
      }
    } else {
      if (division === "calendar") {
        navigation.navigate("CalendarCreateToDo", { division: "edit" });
      } else if (division === "home") {
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
        goBack();
      }
      await editToDo({
        variables: {
          id: item.id,
          toDoList: value,
          color: selectedColor,
          startDate: showDate.split(" ")[0],
          startTime: isEnabled ? showTime : null,
          endDate: ednShowDate.split(" ")[0],
          endTime: isEnabled ? endShowTime : null,
          createAlrams:
            alarmCreateData.length > 0 && alarmId.length > 0
              ? alarmCreateData.map((alarm) => alarm.time)
              : null,
          deleteAlrams:
            alarmDeleteData.length > 0
              ? alarmDeleteData.map((alarm) => alarm.id)
              : null,
          memo: memoValue ? memoValue : null,
          goalId: goalId ? goalId : null,
        },
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: styles.lightGreyColor,
          paddingBottom: 20,
        }}
      >
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <ExpoIcon name={"arrow-left"} />
        </View>
        <TouchableOpacity onPress={() => createToDo()}>
          <View style={{ marginTop: 10, marginRight: 20 }}>
            <ExpoIcon name={"check-outline"} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            width: contents.width,
            alignItems: "center",
            marginTop: 10,
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
        >
          <TextInput
            value={value}
            onChangeText={onChange}
            multiline={true}
            numberOfLines={2}
            placeholder={"해야할 일"}
            style={{
              width: contents.width / 1.2,
              height: 50,
              borderBottomColor: styles.darkGreyColor,
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            width: contents.width,
          }}
        >
          <TouchableWithoutFeedback
            disabled={item.originToDoId !== null}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 70,
            }}
            onPress={() => {
              setSelectGoal();
              setGoalModalVisible(!goalModalVisible);
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: 10,
              }}
            >
              <ExpoIcon
                name={"target"}
                color={styles.darkGreyColor}
                size={20}
              />
              <Text
                style={{
                  fontSize: 9,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                목표
              </Text>
            </View>

            {stagePlanText || goalText ? (
              <>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: contents.width,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color:
                          item.originToDoId !== null
                            ? styles.darkGreyColor
                            : null,
                      }}
                    >
                      {goalText}
                    </Text>
                  </View>
                  {stagePlanText ? (
                    <>
                      <Text style={{ fontWeight: "700" }}>{stagePlanText}</Text>
                      <View style={{ flexDirection: "row", marginTop: 7 }}>
                        <Text style={{ fontSize: 12 }}>
                          {moment(startingDay).format("YYYY-MM-DD")}
                        </Text>
                        <Text style={{ fontSize: 12 }}> ~ </Text>
                        <Text style={{ fontSize: 12 }}>
                          {moment(endDay).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                    </>
                  ) : null}
                </View>
              </>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: styles.darkGreyColor,
                    fontSize: 10,
                  }}
                >
                  목표와 연계된 일은 목표선택 후 날짜 입력 부탁드립니다.
                </Text>
              </View>
            )}
          </TouchableWithoutFeedback>
          {stagePlanText ? (
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 10 }}
              onPress={() => selectedGoalCancle()}
            >
              <View style={{}}>
                <ExpoIcon name={"close"} size={20} />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            height: 130,
            width: contents.width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View style={{ marginRight: 3 }}>
              <ExpoIcon
                name={"clock-outline"}
                color={styles.darkGreyColor}
                size={20}
              />
            </View>
            <View style={{ marginRight: 7 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#999999" }}
                thumbColor={isEnabled ? "#58CC95" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              height: 70,
              left: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <ExpoIcon
                name={"calendar"}
                color={styles.darkGreyColor}
                size={20}
              />
            </View>
            <Text
              style={{
                fontSize: 9,
                color: styles.darkGreyColor,
                fontWeight: "700",
              }}
            >
              날짜
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 30,
              width: contents.width / 1.2,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setStartEndDivision("start");
                  showDatepicker();
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View style={{}}>
                    <ExpoIcon name={"ray-start-arrow"} size={30} />
                  </View>
                  <Text style={{ fontSize: 15 }}>{showDate}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStartEndDivision("start");
                  showTimepicker();
                }}
                style={{ marginTop: 10 }}
              >
                <View>
                  {isEnabled ? (
                    <Text style={{ fontSize: 15 }}>{showTime}</Text>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setStartEndDivision("end");
                  showDatepicker();
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View style={{}}>
                    <ExpoIcon name={"ray-end"} size={30} />
                  </View>
                  <Text style={{ fontSize: 15 }}>{ednShowDate}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStartEndDivision("end");
                  showTimepicker();
                }}
                style={{ marginTop: 10 }}
              >
                <View>
                  {isEnabled ? (
                    <Text style={{ fontSize: 15 }}>{endShowTime}</Text>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {isEnabled ? (
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 1,
              width: contents.width,
            }}
          >
            <TouchableWithoutFeedback
              style={{
                height: 70,
                flexDirection: "row",
                width: contents.width,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => setAlarmModalVisible(!alarmModalVisible)}
            >
              <View
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  width: contents.width / 20,
                }}
              >
                <ExpoIcon
                  name={"alarm"}
                  color={styles.darkGreyColor}
                  size={20}
                />
                <Text
                  style={{
                    fontSize: 9,
                    color: styles.darkGreyColor,
                    fontWeight: "700",
                  }}
                >
                  알람
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  width: contents.width - contents.width / 20 - 10,
                }}
              >
                {alarmView.length > 0 ? (
                  alarmView.map((alarm) => (
                    <Fragment key={Math.random().toString()}>
                      <Text style={{ marginRight: 10, textAlign: "center" }}>
                        {alarm.time === 1 ||
                        alarm.time === 5 ||
                        alarm.time === 15 ||
                        alarm.time === 30
                          ? `${alarm.time}분전`
                          : alarm.time === 60
                          ? "1시간전"
                          : alarm.time === 60 * 24
                          ? "1일전"
                          : null}
                      </Text>
                    </Fragment>
                  ))
                ) : (
                  <Text style={{ fontSize: 20, color: styles.lightGreyColor }}>
                    00분 전
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
            {alarmView.length > 0 ? (
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={() => {
                  setAlarmTimeArray([]);
                  setAlarmView([]);
                }}
              >
                <View style={{}}>
                  <ExpoIcon name={"close"} size={20} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        <TouchableWithoutFeedback
          onPress={() => setColorModalVisible(!colorModalVisible)}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 1,
              height: 70,
            }}
          >
            <View
              style={{
                position: "absolute",
                height: 70,
                left: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ExpoIcon
                name={"marker"}
                color={styles.darkGreyColor}
                size={20}
              />
              <Text
                style={{
                  fontSize: 9,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                칼라
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: contents.width,
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      selectedColor === "블랙(기본)"
                        ? "black"
                        : selectedColor === "레드 와인"
                        ? styles.TextWine
                        : selectedColor === "블루"
                        ? styles.BlueText
                        : selectedColor === "포레스트 그린"
                        ? styles.TextForestGreen
                        : selectedColor === "오렌지 옐로우"
                        ? styles.TextOrangeYellow
                        : selectedColor === "라벤더"
                        ? styles.TextLavendar
                        : selectedColor === "미디엄 퍼플"
                        ? styles.TextMidiumPupple
                        : selectedColor === "스카이 블루"
                        ? styles.TextSkyBlue
                        : selectedColor === "골드"
                        ? styles.TextGold
                        : null,
                    borderRadius: 5,
                    width: 30,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
                <Text
                  style={{
                    color:
                      selectedColor === "블랙(기본)"
                        ? "black"
                        : selectedColor === "레드 와인"
                        ? styles.TextWine
                        : selectedColor === "블루"
                        ? styles.BlueText
                        : selectedColor === "포레스트 그린"
                        ? styles.TextForestGreen
                        : selectedColor === "오렌지 옐로우"
                        ? styles.TextOrangeYellow
                        : selectedColor === "라벤더"
                        ? styles.TextLavendar
                        : selectedColor === "미디엄 퍼플"
                        ? styles.TextMidiumPupple
                        : selectedColor === "스카이 블루"
                        ? styles.TextSkyBlue
                        : selectedColor === "골드"
                        ? styles.TextGold
                        : null,
                    marginLeft: 10,
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {selectedColor}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            height: 150,
          }}
        >
          <View
            style={{
              position: "absolute",
              height: 70,
              left: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExpoIcon
              name={"note-outline"}
              color={styles.darkGreyColor}
              size={20}
            />
            <Text
              style={{
                fontSize: 9,
                color: styles.darkGreyColor,
                fontWeight: "700",
              }}
            >
              메모
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: contents.width,
              marginLeft: contents.width / 25,
            }}
          >
            <TextInput
              value={memoValue}
              onChangeText={memoOnChange}
              placeholder={"Memo"}
              multiline={true}
              numberOfLines={4}
              style={{
                width: contents.width / 1.3,
                height: 100,
                padding: 10,
                justifyContent: "flex-start",
                textAlignVertical: "top",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 2,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                borderBottomWidth: 0,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <CreateToDoModal
        showDatepicker={showDatepicker}
        showTimepicker={showTimepicker}
        date={startEndDivision === "start" ? date : endDate}
        mode={mode}
        show={show}
        onDateChange={onDateChange}
        setSelectedTime={setSelectedTime}
        alarmModalVisible={alarmModalVisible}
        setAlarmModalVisible={setAlarmModalVisible}
        alarmTimeArray={alarmTimeArray}
        setAlarmTimeArray={setAlarmTimeArray}
        selectedAlarmHandle={selectedAlarmHandle}
        colorModalVisible={colorModalVisible}
        setColorModalVisible={setColorModalVisible}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        minimumDate={startEndDivision === "end" ? endMinDate : startMinDate}
        maxDate={startEndDivision === "end" ? endMaxDate : startMaxDate}
        goalModalVisible={goalModalVisible}
        setGoalModalVisible={setGoalModalVisible}
        selectGoal={selectGoal}
        setSelectGoal={setSelectGoal}
        selectGoalStageHandle={selectGoalStageHandle}
        confirmAlarm={confirmAlarm}
        data={data}
        loading={loading}
        alarmView={alarmView}
      />
    </View>
  );
};

export default EditToDo;
