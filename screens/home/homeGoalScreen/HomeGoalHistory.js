import React, { useState, useEffect, Suspense } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Agenda } from "react-native-calendars";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import moment from "moment";
import { SEE_TODO_OF_GOAL, SEE_DAYTODO } from "../HomeQueries";
import styles from "../../../styles";
import contents from "../../../contents";
import HistoryView from "./History/HistoryView";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DOWN_LOAD, DOWN_LOAD_VIEW } from "./HistoryQuery";
import Modal from "react-native-modal";

const HomeGoalHistory = ({
  navigation,
  id: goalId,
  division,
  data,
  loading,
  startDate,
  goalText,
  originDDay,
  goalHistories,
  me,
}) => {
  const [items, setItems] = useState({});
  const [month, setMonth] = useState();
  const [markedDates, setMarkedDates] = useState({});

  const toDoes = data && data.seeToDoOfGoal;

  const startDay = new Date(startDate);

  useEffect(() => {
    if (
      division === "delete" ||
      division === "edit" ||
      division === "complete"
    ) {
      for (let i = -15; i < 85; i++) {
        const time = 1586649600000 + i * 24 * 60 * 60 * 1000;
        const date = new Date(time);
        const timeToString = moment(date).format("YYYY-MM-DD");
        const strTime = timeToString;
        const dayToDoes =
          toDoes &&
          toDoes.filter(
            (toDo) =>
              toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
              toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
          );
        items[strTime] = [];
        markedDates[strTime] = { dots: [] };
        if (dayToDoes && dayToDoes.length > 0) {
          for (let j = 0; j < parseInt(dayToDoes && dayToDoes.length); j++) {
            items[strTime].push({
              id: dayToDoes && dayToDoes[j] && dayToDoes[j].id,
              toDoList: dayToDoes && dayToDoes[j] && dayToDoes[j].toDoList,
              complete: dayToDoes && dayToDoes[j] && dayToDoes[j].complete,
              alrams: dayToDoes && dayToDoes[j] && dayToDoes[j].alrams,
              startDate: dayToDoes && dayToDoes[j] && dayToDoes[j].startDate,
              startTime: dayToDoes && dayToDoes[j] && dayToDoes[j].startTime,
              endDate: dayToDoes && dayToDoes[j] && dayToDoes[j].endDate,
              endTime: dayToDoes && dayToDoes[j] && dayToDoes[j].endTime,
              color: dayToDoes && dayToDoes[j] && dayToDoes[j].color,
              goal: dayToDoes && dayToDoes[j] && dayToDoes[j].goal,
              posts: dayToDoes && dayToDoes[j] && dayToDoes[j].posts,
              memo: dayToDoes && dayToDoes[j] && dayToDoes[j].memo,
              index: dayToDoes && dayToDoes[j] && dayToDoes[j].index,
              user: dayToDoes && dayToDoes[j] && dayToDoes[j].user,
              strTime: strTime,
            });
            markedDates[strTime].dots.push({
              color:
                dayToDoes && dayToDoes[j] && dayToDoes[j].complete === false
                  ? styles.TextMidiumPupple
                  : styles.darkGreyColor,
              selectedDotColor:
                dayToDoes && dayToDoes[j] && dayToDoes[j].complete === false
                  ? styles.TextMidiumPupple
                  : styles.darkGreyColor,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
      const newMarkedDates = {};
      Object.keys(markedDates).forEach((key) => {
        newMarkedDates[key] = markedDates[key];
      });
      setMarkedDates(newMarkedDates);
    }
  }, [data]);

  const loadItems = (day) => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const date = new Date(time);
      const timeToString = moment(date).format("YYYY-MM-DD");
      const strTime = timeToString;
      if (!items[strTime]) {
        items[strTime] = [];
        markedDates[strTime] = { dots: [] };
        const dayToDoes =
          toDoes &&
          toDoes.filter(
            (toDo) =>
              toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
              toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
          );

        if (dayToDoes && dayToDoes.length > 0) {
          for (let j = 0; j < parseInt(dayToDoes && dayToDoes.length); j++) {
            items[strTime].push({
              id: dayToDoes && dayToDoes[j] && dayToDoes[j].id,
              toDoList: dayToDoes && dayToDoes[j] && dayToDoes[j].toDoList,
              complete: dayToDoes && dayToDoes[j] && dayToDoes[j].complete,
              alrams: dayToDoes && dayToDoes[j] && dayToDoes[j].alrams,
              startDate: dayToDoes && dayToDoes[j] && dayToDoes[j].startDate,
              startTime: dayToDoes && dayToDoes[j] && dayToDoes[j].startTime,
              endDate: dayToDoes && dayToDoes[j] && dayToDoes[j].endDate,
              endTime: dayToDoes && dayToDoes[j] && dayToDoes[j].endTime,
              color: dayToDoes && dayToDoes[j] && dayToDoes[j].color,
              goal: dayToDoes && dayToDoes[j] && dayToDoes[j].goal,
              posts: dayToDoes && dayToDoes[j] && dayToDoes[j].posts,
              memo: dayToDoes && dayToDoes[j] && dayToDoes[j].memo,
              index: dayToDoes && dayToDoes[j] && dayToDoes[j].index,
              user: dayToDoes && dayToDoes[j] && dayToDoes[j].user,
              strTime: strTime,
            });
            markedDates[strTime].dots.push({
              color:
                dayToDoes && dayToDoes[j] && dayToDoes[j].complete === false
                  ? styles.TextLavendar
                  : styles.darkGreyColor,
              selectedDotColor:
                dayToDoes && dayToDoes[j] && dayToDoes[j].complete === false
                  ? styles.TextLavendar
                  : styles.darkGreyColor,
            });
          }
        }
      }
    }
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);

    const newMarkedDates = {};
    Object.keys(markedDates).forEach((key) => {
      newMarkedDates[key] = markedDates[key];
    });
    setMarkedDates(newMarkedDates);
  };

  const renderItem = (item) => {
    return (
      <HistoryView
        item={item}
        navigation={navigation}
        goalHistories={goalHistories}
        division={division}
        me={me}
      />
    );
  };

  const renderEmptyDate = (item) => {
    const timeToString = item.toISOString().split("T")[0];
    const dt = moment(timeToString).format("dd");
    const day = moment(timeToString).format("D");
    return (
      <>
        <View
          style={{
            width: contents.width / 1.3,
            marginLeft: 7,
            height: 30,
            borderBottomColor: styles.darkGreyColor,
            borderBottomWidth: 0.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1 !== r2;
  };

  const renderDay = (day, item) => {
    const dt = moment(day && day.dateString).format("dd");
    const month = day !== undefined ? day.month : null;

    return (
      <View
        style={{
          flexDirection: "row",
          width: contents.width / 8,
          height: 50,
          marginLeft: 13,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {month !== null ? (
          <>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                textAlign: "center",
                color: "#536878",
              }}
            >
              {month}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                textAlign: "center",
                color: "#536878",
              }}
            >
              /
            </Text>
          </>
        ) : null}

        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            textAlign: "center",
            color: "#536878",
          }}
        >
          {day && day.day < 10
            ? `0${day.day}`
            : day && day.day >= 10
            ? day.day
            : null}
        </Text>
        <Text style={{ color: "#536878", fontSize: 13, fontWeight: "700" }}>
          {day !== undefined ? `(${dt})` : null}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          width: contents.width,
          padding: 10,
          backgroundColor: "white",
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
        }}
      >
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontWeight: "700",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {goalText}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ color: styles.darkGreyColor, fontSize: 10 }}>
            {moment(startDate).format("YYYY-MM-DD")}
          </Text>
          <Text style={{ color: styles.darkGreyColor, fontSize: 10 }}> ~ </Text>
          <Text style={{ color: styles.darkGreyColor, fontSize: 10 }}>
            {moment(originDDay).format("YYYY-MM-DD")}
          </Text>
        </View>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"black"} size={20} />
        </View>
      ) : (
        <Agenda
          items={items}
          selected={new Date(startDay)}
          minDate={"2019-01-01"}
          maxDate={"2025-12-31"}
          loadItemsForMonth={(day) => {
            loadItems(day);
            setMonth(parseInt(moment(day.dateString).format("M")) + 1);
          }}
          // onCalendarToggled={() => setCalendarToggle(true)}
          renderItem={(item) => renderItem(item)}
          renderEmptyDate={(item) => renderEmptyDate(item)}
          rowHasChanged={(r1, r2) => rowHasChanged(r1, r2)}
          markingType={"multi-dot"}
          markedDates={markedDates}
          monthFormat={"yyyy년 MM월"}
          // refreshing={true}
          // onRefresh={(day) => console.log(day)}
          theme={{
            selectedDayBackgroundColor: null,
            selectedDayTextColor: styles.TextLavendar,
            todayTextColor: styles.TextSkyBlue,
            calendarBackground: "white",
            agendaKnobColor: styles.darkGreyColor,
            agendaTodayColor: "red",
            // backgroundColor: "#f1f2f6",
            // calendarBackground: "#ffffff",
            // textSectionTitleColor: "#b6c1cd",
            // selectedDayTextSize: 20,
            // dayTextColor: "#2d4150",
            // textDisabledColor: "#d9e1e8",
            // dotColor: "#00adf5",
            // selectedDotColor: "#ffffff",
            // arrowColor: "orange",
            // monthTextColor: language.primary,
            // indicatorColor: "blue",
            // textDayFontWeight: "300",
            // textMonthFontWeight: "bold",
            // textDayHeaderFontWeight: "300",
            // textDayFontSize: 20,
            // textMonthFontSize: 17,
            // textDayHeaderFontSize: 17,
            // agendaDayTextColor: "yellow",
            // agendaDayNumColor: "green",
            // agendaTodayColor: "red",
            // agendaKnobColor: "blue",
          }}
          renderDay={(day) => renderDay(day)}
          // hideExtraDays={false}
        />
      )}
    </>
  );
};

export default HomeGoalHistory;
