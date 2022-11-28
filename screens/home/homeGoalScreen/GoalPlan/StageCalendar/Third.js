import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar, LocaleConfig, CalendarList } from "react-native-calendars";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import styles from "../../../../../styles";
import contents from "../../../../../contents";

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

const Third = ({ navigation }) => {
  const editDivision = navigation.getParam("editDivision");
  const thirdStartDay = navigation.getParam("thirdStartDay");
  const division = navigation.getParam("division");

  const originDDay = navigation.getParam("originDDay");
  const [selectedDay, setSelectedDay] = useState();

  const [thirdSelectedLastDay, setThirdSelectedLastDay] = useState();

  const selectedDayHandle = (day) => {
    setThirdSelectedLastDay(day.dateString);

    let marking = {
      startingDay: true,
      color: "green",
      textColor: "white",
    };
    marking = {};

    let startDate = moment(thirdStartDay).format("YYYY-MM-DD");
    let endDate = moment(day.dateString).format("YYYY-MM-DD");
    startDate = moment(startDate);
    endDate = moment(endDate);
    const now = startDate,
      dates = [];

    while (now.isBefore(endDate) || now.isSame(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }

    const selectedDayArray = [
      { startingDay: true, color: "green", textColor: "white" },
      { color: "green", textColor: "white" },
      { selected: true, endingDay: true, color: "green", textColor: "white" },
    ];

    for (var i = 0; i < dates.length; i++) {
      const key = dates[i];
      let number;
      if (i === 0) {
        number = 0;
      } else if (i === dates.length - 1) {
        number = 2;
      } else {
        number = 1;
      }
      marking[key] = selectedDayArray[number];
    }
    setSelectedDay(marking);
  };

  return (
    <View>
      <View
        style={{
          height: 60,
          width: contents.width,
          backgroundColor: "white",
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={{ marginRight: 40, fontWeight: "700" }}>
            3단계 목표 완료일을 선택해주세요.
          </Text>
          <Text
            style={{
              marginRight: 40,
              color: styles.darkGreyColor,
              fontSize: 10,
            }}
          >
            각 단계 별 일정 고려하여 선택해주세요.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            division === "create"
              ? navigation.navigate("GoalStackFour", { thirdSelectedLastDay })
              : division === "edit"
              ? navigation.navigate("GoalEdit", { thirdSelectedLastDay })
              : editDivision === "edit"
              ? navigation.navigate("EditGoalStagePlan", {
                  thirdSelectedLastDay,
                })
              : navigation.navigate(
                  NavigationActions.navigate({
                    routeName: "GoalDetailContainer",
                    params: { thirdSelectedLastDay },
                    action: NavigationActions.navigate({
                      routeName: "GoalDetailStackNavigation",
                      params: { thirdSelectedLastDay },
                      action: NavigationActions.navigate({
                        routeName: "GoalPlan",
                        params: { thirdSelectedLastDay },
                        action: NavigationActions.navigate({
                          routeName: "GoalPlan",
                          params: { thirdSelectedLastDay },
                        }),
                      }),
                    }),
                  })
                )
          }
        >
          <View
            style={{
              width: 70,
              height: 35,
              backgroundColor: styles.MainColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginRight: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 13, fontWeight: "700" }}>
              완료
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <CalendarList
        current={thirdStartDay}
        minDate={thirdStartDay}
        maxDate={moment(originDDay).format("YYYY-MM-DD")}
        onDayPress={(day) => {
          selectedDayHandle(day);
        }}
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        monthFormat={"yyyy년 MM월"}
        markedDates={selectedDay}
        markingType={"period"}
        theme={{
          "stylesheet.day.period": {
            base: {
              overflow: "hidden",
              height: 34,
              alignItems: "center",
              width: 38,
            },
          },
        }}
      />
    </View>
  );
};

export default Third;
