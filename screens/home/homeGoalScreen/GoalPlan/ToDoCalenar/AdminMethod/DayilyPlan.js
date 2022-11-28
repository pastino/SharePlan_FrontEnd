import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import styled from "styled-components";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import styles from "../../../../../../styles";
import contents from "../../../../../../contents";
import ExpoIcon from "../../../../../../components/ExpoIcon";
import { useQuery, useMutation } from "react-apollo-hooks";
import { CREATE_TODO_PLAN, SEE_GOAL_TODO_PLAN } from "../../GoalPlanQuery";
import { SEE_DAYTODO } from "../../../../HomeQueries";
import Loader from "../../../../../../components/Loader";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "fr";

const ToDoView = styled.View`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;
const ToDoHeader = styled.View`
  display: flex;
  flex-direction: row;
`;

const ToDoAdd = styled.Text`
  color: #be2333;
`;

const DayilyPlan = ({ navigation, goalId, data, loading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [viewDates, setViewDates] = useState([]);
  const [isImportWhether, setIsImportWhether] = useState();

  const onChange = (text) => {
    setValue(text);
  };
  const today = new Date();
  const stageNumber = navigation.getParam("stageNumber");
  const stagePlan = navigation.getParam("stagePlan");
  const startDay = navigation.getParam("startDay");
  const endDay = navigation.getParam("endDay");

  const seePlanToDo = data && data.seePlanToDo;

  const monthDayArray = seePlanToDo && seePlanToDo.map((toDo) => toDo.monthDay);
  const importantArray =
    seePlanToDo && seePlanToDo.map((toDo) => toDo.importEvent);

  const [viewToDoes, setViewToDoes] = useState();

  useEffect(() => {
    setIsImportWhether("검정");
  }, []);

  useEffect(() => {
    if (monthDayArray !== undefined) {
      let marking;
      marking = {};
      const doubleCounts = monthDayArray.reduce((x, y, idx, arr) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});
      let counts;
      for (let i = 0; i < monthDayArray.length; i++) {
        counts = doubleCounts[monthDayArray[i]];
        let colorCounts = [];
        for (let i = 0; i < counts; i++) {
          colorCounts.push({
            color: styles.MainColor,
          });
        }
        const toDoesArray = [{ dots: colorCounts }];
        const key = monthDayArray[i];
        marking[key] = toDoesArray[0];
        setMarkedDates(marking);
      }
    }
  }, [loading, isLoading]);

  const onDaySelect = (day) => {
    const selectedDay = moment(day.dateString).format("YYYY-MM-DD");
    let selected = true;
    if (selectedDates[selectedDay]) {
      selected = !selectedDates[selectedDay].selected;
    }
    setSelectedDates({ ...selectedDates, ...{ [selectedDay]: { selected } } });
    if (viewDates.includes(selectedDay)) {
      viewDates.splice(
        viewDates.findIndex((date) => date === selectedDay),
        1
      );
    } else {
      setViewDates(viewDates.concat(selectedDay));
    }
  };

  const date_ascending = (a, b) => {
    var dateA = new Date(a).getTime();
    var dateB = new Date(b).getTime();
    return dateA > dateB ? 1 : -1;
  };

  const [createToDoPlanMutation] = useMutation(CREATE_TODO_PLAN, {
    variables: {
      goalId,
      monthDay: viewDates,
      toDoList: value,
      importEvent: isImportWhether,
    },
    awaitRefetchQueries: true,
    // update: (proxy, { data: { toDoPlanCreate } }) => {
    //   const data = proxy.readQuery({ query: SEE_GOAL_TODO_PLAN });
    //   // data && data.dayToDoes && data.dayToDoes.push(toDoPlanCreate);
    //   proxy.writeQuery({ query: SEE_GOAL_TODO_PLAN, data });
    //   console.log(toDoPlanCreate);
    // },
    // optimisticResponse: {
    //   toDoPlanCreate: {
    //     __typename: "DayToDo",
    //     id: Math.random().toString(),
    //     toDoList: value,
    //     importEvent: isImportWhether,
    //     complete: false,
    //     monthDay,
    //     index:
    //       data &&
    //       data.dayToDoes &&
    //       data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay) &&
    //       data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay).length !==
    //         0
    //         ? data &&
    //           data.dayToDoes &&
    //           data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay) &&
    //           data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay) &&
    //           data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay)
    //             .length + 1
    //         : 1,
    //     user: {
    //       __typename: "User",
    //       id: Math.random().toString(),
    //     },
    //   },
    // },
  });

  const createToDoPlan = async () => {
    setIsLoading(true);
    if (viewDates.includes(moment(today).format("YYYY-MM-DD"))) {
      await createToDoPlanMutation({
        refetchQueries: () => [
          {
            query: SEE_GOAL_TODO_PLAN,
            variables: {
              goalId,
            },
          },
          {
            query: SEE_DAYTODO,
          },
        ],
      });
    } else {
      await createToDoPlanMutation({
        refetchQueries: () => [
          {
            query: SEE_GOAL_TODO_PLAN,
            variables: {
              goalId,
            },
          },
        ],
      });
    }

    setViewDates([]);
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading || isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              marginTop: 7,
              paddingLeft: 10,
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 1,
              paddingBottom: 10,
              width: contents.width,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                color: styles.darkGreyColor,
              }}
            >
              하루 단위로 해야할 일에 대한 계획을 세우는 화면입니다.
            </Text>
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                하루가 아닌 기간단위로 해야하는 일은{" "}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                "Period Plan"
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                에서
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                {" "}
                계획을 세워주세요.
              </Text>
            </View>
          </View>
          <Calendar
            current={today}
            minDate={startDay}
            maxDate={endDay}
            onDayPress={(day) => {
              onDaySelect(day);
            }}
            onDayLongPress={(day) => {
              console.log("selected day", day);
            }}
            monthFormat={"yyyy년 MM월"}
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            hideArrows={true}
            markedDates={markedDates}
            markingType={"multi-dot"}
          />
          <View
            style={{ borderTopWidth: 1, borderTopColor: styles.lightGreyColor }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 10,
                minHeight: 40,
                borderBottomColor: styles.lightGreyColor,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}
            >
              {viewDates.length !== 0 ? (
                viewDates.sort(date_ascending).map((day) => (
                  <View
                    key={Math.random().toString()}
                    style={{
                      marginLeft: 7,
                      width: 50,
                      height: 25,
                      backgroundColor: styles.MainColor,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {moment(day).format("MM/DD")}
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor,
                    }}
                  >
                    날짜를 선택해주세요(다중선택 가능)
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>해야할 일</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                borderBottomColor: styles.lightGreyColor,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                style={{
                  width: contents.width / 1.2,
                  height: 40,
                  backgroundColor: styles.lightGreyColor,
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                marginBottom: 7,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>중요도</Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                flexDirection: "row",
                marginTop: 7,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: styles.lightGreyColor,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 7 }}
                onPress={() => setIsImportWhether("빨강")}
              >
                <View
                  style={{
                    width: 50,
                    height: 30,
                    backgroundColor: styles.Wine,
                    borderRadius: 5,
                  }}
                />
                {isImportWhether === "빨강" ? (
                  <View style={{ position: "absolute", right: 15, top: 4 }}>
                    <ExpoIcon
                      name={"checkbox-marked-circle"}
                      color={"white"}
                      size={20}
                    />
                  </View>
                ) : null}
                <Text style={{ textAlign: "center", fontSize: 10 }}>상</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 7 }}
                onPress={() => setIsImportWhether("파랑")}
              >
                <View
                  style={{
                    width: 50,
                    height: 30,
                    backgroundColor: styles.BlueText,
                    borderRadius: 5,
                  }}
                />
                {isImportWhether === "파랑" ? (
                  <View style={{ position: "absolute", right: 15, top: 4 }}>
                    <ExpoIcon
                      name={"checkbox-marked-circle"}
                      color={"white"}
                      size={20}
                    />
                  </View>
                ) : null}
                <Text style={{ textAlign: "center", fontSize: 10 }}>중</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsImportWhether("검정")}>
                <View
                  style={{
                    width: 50,
                    height: 30,
                    backgroundColor: "black",
                    borderRadius: 5,
                  }}
                />
                {isImportWhether === "검정" ? (
                  <View style={{ position: "absolute", right: 15, top: 4 }}>
                    <ExpoIcon
                      name={"checkbox-marked-circle"}
                      color={"white"}
                      size={20}
                    />
                  </View>
                ) : null}
                <Text style={{ textAlign: "center", fontSize: 10 }}>하</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={() => createToDoPlan()}>
                <View
                  style={{
                    width: 70,
                    height: 35,
                    backgroundColor: styles.MainColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "700", color: "white" }}>
                    완료
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <ToDoHeader
            style={{
              width: contents.width / 1.15,
              height: contents.height / 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              backgroundColor: styles.MainColor,
            }}
          >
            <ToDoAdd>
              <ExpoIcon name={"plus-circle-outline"} color={"white"} />
            </ToDoAdd>
          </ToDoHeader> */}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DayilyPlan;
