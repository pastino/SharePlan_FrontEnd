import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Agenda } from "react-native-calendars";
import contents from "../contents";
import { useQuery } from "react-apollo-hooks";
import { SEE_DAYTODO } from "./home/HomeQueries";
import moment from "moment";
import styles from "../styles";
import AgendaView from "./CalendarCreateToDo/AgendaView";

const CalendarCreateToDo = ({ navigation }) => {
  const division = navigation.getParam("division");
  const [items, setItems] = useState({});
  const [month, setMonth] = useState();
  const [markedDates, setMarkedDates] = useState({});

  const { data, loading } = useQuery(SEE_DAYTODO, {
    fetchPolicy: "cache-and-network",
  });

  const toDoes = data && data.dayToDoes;

  useEffect(() => {
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
    // }
  }, [data]);

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15, len = 85; i < len; i++) {
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
            for (
              let j = 0, len = parseInt(dayToDoes && dayToDoes.length);
              j < len;
              j++
            ) {
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
    }, 1000);
  };

  const renderItem = (item) => {
    return <AgendaView item={item} navigation={navigation} />;
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
      <Agenda
        items={items}
        selected={new Date()}
        minDate={"2019-01-01"}
        maxDate={"2025-12-31"}
        loadItemsForMonth={(day) => {
          loadItems(day);
          setMonth(parseInt(moment(day.dateString).format("M")) + 1);
        }}
        renderItem={(item) => renderItem(item)}
        renderEmptyDate={(item) => renderEmptyDate(item)}
        rowHasChanged={(r1, r2) => rowHasChanged(r1, r2)}
        markingType={"multi-dot"}
        markedDates={markedDates}
        monthFormat={"yyyy년 MM월"}
        theme={{
          selectedDayBackgroundColor: null,
          selectedDayTextColor: styles.TextLavendar,

          todayTextColor: styles.TextSkyBlue,

          calendarBackground: "white",
          agendaKnobColor: styles.darkGreyColor,
          agendaTodayColor: "red",
        }}
        renderDay={(day) => renderDay(day)}
      />
    </>
  );
};

export default CalendarCreateToDo;
