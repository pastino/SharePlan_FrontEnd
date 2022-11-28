import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig, CalendarList } from "react-native-calendars";
import moment from "moment";
import { NavigationActions } from "react-navigation";
import styles from "../../../../styles";
import contents from "../../../../contents";
import Modal from "react-native-modal";

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

const InGoalSelectDate = ({ navigation }) => {
  const id = navigation.getParam("id");
  const goalId = navigation.getParam("goalId");
  const goalText = navigation.getParam("goalText");
  const goalStartDate = navigation.getParam("goalStartDate");
  const goalEndDate = navigation.getParam("goalEndDate");
  const schedulePeriod = navigation.getParam("schedulePeriod") - 1;
  const toDoes = navigation.getParam("toDoes");

  const [overDateModal, setOverDateModal] = useState(false);
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    if (new Date(goalStartDate).getTime() < new Date().getTime()) {
      setMinDate(new Date());
    } else {
      setMinDate(goalStartDate);
    }
  }, []);

  const [selectedDay, setSelectedDay] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const selectDateArray =
    selectedDay !== null ? Object.keys(selectedDay) : null;

  const maxEndDate =
    selectDateArray !== null
      ? selectDateArray.reduce(function (previous, current) {
          return previous > current ? previous : current;
        })
      : null;

  const timestampArray =
    toDoes.length === 0
      ? null
      : toDoes.map((toDo) => new Date(toDo.startDate).getTime());

  const min =
    timestampArray !== null
      ? timestampArray.reduce(function (previous, current) {
          return previous > current ? current : previous;
        })
      : null;

  const [changeToDo, setChangeToDo] = useState([]);

  useEffect(() => {
    const test = [];
    for (let i = 0; i < toDoes.length; i++) {
      //Start Date
      const startDay = new Date(min);
      const originStartDay = new Date(
        toDoes && toDoes[i] && toDoes[i].startDate
      );
      const originStartDiff = moment(originStartDay).diff(startDay, `days`);
      const startDateFull =
        startDate !== null
          ? moment(startDate).add(originStartDiff, "days").toDate()
          : null;
      const startDateInput = moment(startDateFull).format("YYYY-MM-DD");

      //End Date
      const toDoStartDate = new Date(
        toDoes && toDoes[i] && toDoes[i].startDate
      );
      const endDate = new Date(toDoes && toDoes[i] && toDoes[i].endDate);
      const endDateDiff = moment(endDate).diff(toDoStartDate, `days`);
      const endDateFull = moment(startDateInput)
        .add(endDateDiff, "days")
        .toDate();
      const endDateInput = moment(endDateFull).format("YYYY-MM-DD");
      test.push({
        id: toDoes && toDoes[i] && toDoes[i].id,
        toDoList: toDoes && toDoes[i] && toDoes[i].toDoList,
        complete: toDoes && toDoes[i] && toDoes[i].complete,
        alrams: toDoes && toDoes[i] && toDoes[i].alrams,
        startDate: startDateInput,
        startTime: toDoes && toDoes[i] && toDoes[i].startTime,
        endDate: endDateInput,
        endTime: toDoes && toDoes[i] && toDoes[i].endTime,
        color: toDoes && toDoes[i] && toDoes[i].color,
        goal: toDoes && toDoes[i] && toDoes[i].goal,
        originToDoId: toDoes && toDoes[i] && toDoes[i].originToDoId,
        memo: toDoes && toDoes[i] && toDoes[i].memo,
        index: toDoes && toDoes[i] && toDoes[i].index,
        user: toDoes && toDoes[i] && toDoes[i].user,
      });
    }
    setChangeToDo(test);
  }, [startDate]);

  const selectedDayHandle = (day) => {
    setStartDate(day.dateString);
    let marking = {
      startingDay: true,
      color: "green",
      textColor: "white",
    };
    marking = {};
    let startDate = moment(day.dateString).format("YYYY-MM-DD");
    const endDateStr = moment(day.dateString)
      .add(schedulePeriod, "days")
      .toDate();
    let endDate = moment(endDateStr).format("YYYY-MM-DD");
    startDate = moment(startDate);
    endDate = moment(endDate);
    const now = startDate,
      dates = [];
    if (
      moment(endDate).format("YYYY-MM-DD") >
        moment(goalEndDate).format("YYYY-MM-DD") &&
      !day.chagneEndDate
    ) {
      setOverDateModal(!overDateModal);
    } else {
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
    }
  };

  return (
    <View>
      <View
        style={{
          width: contents.width,
          backgroundColor: "white",
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: contents.width / 1.5,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          <View style={{}}>
            <Text style={{ fontWeight: "700", fontSize: 12 }}>
              아래 목표에 다운받을 스케쥴의 시작일을 선택해주세요.
            </Text>
          </View>
          <View style={{ marginTop: 7 }}>
            <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
              {goalText}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
                {moment(goalStartDate).format("YYYY-MM-DD")}
              </Text>
              <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
                {" "}
                ~{" "}
              </Text>
              <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
                {moment(goalEndDate).format("YYYY-MM-DD") < maxEndDate
                  ? maxEndDate
                  : moment(goalEndDate).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DownScheduleView", {
              id,
              toDoes: changeToDo,
              startSelectDate: startDate,
              goalId,
              maxEndDate:
                moment(goalEndDate).format("YYYY-MM-DD") < maxEndDate
                  ? maxEndDate
                  : null,
            })
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
        current={new Date()}
        minDate={minDate}
        maxDate={moment(goalEndDate).format("YYYY-MM-DD")}
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
      <Modal
        isVisible={overDateModal}
        onBackdropPress={() => setOverDateModal(!overDateModal)}
        onRequestClose={() => setOverDateModal(!overDateModal)}
        transparent={true}
      >
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
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>목표 완료일을 초과합니다. </Text>
              <Text>목표카드 완료일을 변경하시겠습니까?</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setOverDateModal(!overDateModal)}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>아니오</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOverDateModal(!overDateModal);
                  selectedDayHandle({
                    dateString: startDate,
                    chagneEndDate: true,
                  });
                }}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>예</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InGoalSelectDate;
