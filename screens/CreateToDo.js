import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
} from "react-native-gesture-handler";
import contents from "../contents";
import styles from "../styles";
import ExpoIcon from "../components/ExpoIcon";
import moment from "moment";
import CreateToDoModal from "./CreateToDo/CreateToDoModal";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_DAYTODO, SEE_DAYTODO, SEE_MY_GOAL } from "./home/HomeQueries";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const CreateToDo = ({ navigation: { goBack }, navigation }) => {
  const [value, setValue] = useState("");
  const onChange = (text) => {
    setValue(text);
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const { data, loading } = useQuery(SEE_MY_GOAL, {
    fetchPolicy: "network-only",
  });

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

  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const [endDate, setEndDate] = useState(new Date());

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [showDate, setShowDate] = useState(today);
  const [showTime, setShowTime] = useState("00:00");
  const [ednShowDate, setEndShowDate] = useState(today);
  const [endShowTime, setEndShowTime] = useState("00:00");

  const [selectedTime, setSelectedTime] = useState(false);

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

  const cancleTime = () => {
    setSelectedTime(false);
  };

  //Alarm
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [alarmTimeArray, setAlarmTimeArray] = useState([]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setAlarmTimeArray([]);
    }
  };

  const [alarmView, setAlarmView] = useState([]);

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
  useEffect(() => {
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
  const [selectedColor, setSelectedColor] = useState("블랙(기본)");

  //Memo

  const [memoValue, setMemoValue] = useState("");
  const memoOnChange = (text) => {
    setMemoValue(text);
  };

  //Goal
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [selectGoal, setSelectGoal] = useState();
  const [goalId, setGoalId] = useState();
  const [startingDay, setStartingDay] = useState();
  const [endDay, setEndDay] = useState();

  const [stagePlanText, setStagePlanText] = useState();

  const [goalKeyword, setGoalKeyword] = useState();
  const [goalText, setGoalText] = useState();
  const [sale, setSale] = useState();

  useEffect(() => {
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
      setDate(new Date());
      setEndDate(new Date());
    } else {
      setDate(new Date(moment(startingDay).format()));
      setEndDate(new Date(moment(startingDay).format()));
    }
  }, [selectGoal]);

  const selectGoalStageHandle = ({
    goalId,
    stagePlanText,
    startingDay,
    endDay,
    goalKeyword,
    goalText,
    sale,
  }) => {
    setGoalId(goalId);
    setStagePlanText(stagePlanText);
    setStartingDay(startingDay);
    setEndDay(endDay);
    setGoalKeyword(goalKeyword);
    setGoalText(goalText);
    setSale(sale);
  };

  const selectedGoalCancle = () => {
    setGoalId();
    setStagePlanText();
    setStartingDay();
    setEndDay();
    setGoalKeyword();
    setGoalText();
    setSale();
  };

  const [createDayToDoMutation] = useMutation(CREATE_DAYTODO, {
    update: (proxy, { data: { createDayToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      data && data.dayToDoes && data.dayToDoes.push(createDayToDo);
      proxy.writeQuery({ query: SEE_DAYTODO, data });
    },
    optimisticResponse: {
      createDayToDo: {
        __typename: "DayToDo",
        id: Math.random().toString(),
        toDoList: value,
        color: selectedColor,
        complete: false,
        startDate: showDate.split(" ")[0],
        startTime: isEnabled ? showTime : null,
        endDate: ednShowDate.split(" ")[0],
        endTime: isEnabled ? endShowTime : null,
        alrams: alarmTimeArray.length === 0 ? null : alarmOpUiData,
        memo: memoValue ? memoValue : null,
        posts: null,
        originToDoId: null,
        goal: !goalId
          ? null
          : {
              __typename: "Goal",
              id: goalId,
              goalText,
              sale,
            },
        index: null,
        user: {
          __typename: "User",
          id: Math.random().toString(),
        },
      },
    },
  });

  // Alarm reservation

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
    goBack();
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
    if (alarmTimeArray.length > 0) {
      for (let i = 0; i < alarmTimeArray.length; i++) {
        const alarmTimeConfirm = moment(alarmDate)
          .subtract(alarmTimeArray[i].time, "minutes")
          .toDate();
        if (alarmTimeConfirm <= new Date()) {
          null;
        } else {
          const alarmTime = alarmTimeArray[i].time;
          const alarmCategoryId = alarmTimeArray.categoryId;
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
            categoryId: alarmCategoryId,
            android: {
              channelId: "chat-messages",
            },
          };
          const schedulingOptions = {
            time:
              new Date(moment(alarmDate).format()).getTime() -
              alarmTime * 60 * 1000,
          };
          const myid = await Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          );
          alarmId.push(myid);
        }
      }

      await createDayToDoMutation({
        variables: {
          toDoList: value,
          color: selectedColor,
          startDate: showDate.split(" ")[0],
          today: moment(new Date()).format(),
          startTime: isEnabled ? showTime : null,
          endDate: ednShowDate.split(" ")[0],
          endTime: isEnabled ? endShowTime : null,
          alrams:
            alarmTimeArray.length > 0
              ? alarmTimeArray.map((array) => array.time)
              : null,
          categoryId: alarmId.length > 0 ? alarmId : null,
          memo: memoValue ? memoValue : null,
          goalId: goalId ? goalId : null,
        },
      });
    } else {
      await createDayToDoMutation({
        variables: {
          toDoList: value,
          color: selectedColor,
          startDate: showDate.split(" ")[0],
          today: moment(new Date()).format(),
          startTime: isEnabled ? showTime : null,
          endDate: ednShowDate.split(" ")[0],
          endTime: isEnabled ? endShowTime : null,
          alrams:
            alarmTimeArray.length > 0
              ? alarmTimeArray.map((array) => array.time)
              : null,
          categoryId: alarmId.length > 0 ? alarmId : null,
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
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <ExpoIcon name={"arrow-left"} />
          </View>
        </TouchableWithoutFeedback>
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
            placeholder={"해야할 일"}
            multiline={true}
            numberOfLines={2}
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
            style={{
              flexDirection: "row",
              minHeight: 70,
              justifyContent: "center",
              alignItems: "center",
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
            {goalText ? (
              <>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: contents.width,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Text style={{ fontWeight: "700" }}>{goalText}</Text>
                  {stagePlanText ? (
                    <Text
                      style={{
                        fontWeight: "700",
                        marginTop: 7,
                        fontSize: 12,
                        color: styles.darkGreyColor,
                      }}
                    >
                      {stagePlanText}
                    </Text>
                  ) : null}
                  <View style={{ flexDirection: "row", marginTop: 7 }}>
                    <Text style={{ fontSize: 12 }}>
                      {moment(startingDay).format("YYYY-MM-DD")}
                    </Text>
                    <Text style={{ fontSize: 12 }}> ~ </Text>
                    <Text style={{ fontSize: 12 }}>
                      {moment(endDay).format("YYYY-MM-DD")}
                    </Text>
                  </View>
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
                  목표와 연계된 일은 목표선택 후 날짜 입력 바랍니다.
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
              onPress={() => {
                setAlarmModalVisible(!alarmModalVisible);
              }}
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
        navigation={navigation}
      />
    </View>
  );
};

export default CreateToDo;
