import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import styles from "../../../../styles";
import contents from "../../../../contents";
import HistoryView from "../History/HistoryView";
import PreviewToDo from "./PreviewToDo";

import Modal from "react-native-modal";
import DownScheduleOption from "./DownScheduleOption";
import ExpoIcon from "../../../../components/ExpoIcon";

const DownScheduleView = ({ navigation }) => {
  const id = navigation.getParam("id");
  const value = navigation.getParam("value");
  const selectCategory = navigation.getParam("selectCategory");
  const selectItem = navigation.getParam("selectItem");
  const cardColor = navigation.getParam("cardColor");
  const select = navigation.getParam("select");
  const startSelectDate = navigation.getParam("startSelectDate");
  const isSwitch = navigation.getParam("isSwitch");
  const keywordValue = navigation.getParam("keywordValue");
  const toDoes = navigation.getParam("toDoes");

  // Origin Goal Regist Add Information
  const goalId = navigation.getParam("goalId");
  const maxEndDate = navigation.getParam("maxEndDate");
  //

  const [items, setItems] = useState({});
  const [month, setMonth] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(false);

  const [optionModal, setOptionModal] = useState(false);

  const [deleteColor, setDeleteColor] = useState(false);
  const [deleteAlarm, setDeleteAlarm] = useState(false);
  const [deleteTime, setDeleteTime] = useState(false);
  const [deleteMemo, setDelteMemo] = useState(false);

  const alarmLength = toDoes.filter((toDo) => toDo.alrams.length > 0).length;
  const timeLength = toDoes.filter((toDo) => toDo.startTime !== null).length;
  const colorLength = toDoes.filter((toDo) => toDo.color !== "블랙(기본)")
    .length;
  const memoLength = toDoes.filter((toDo) => toDo.memo).length;

  const cancleOptionHandle = () => {
    setOptionModal(!optionModal);
    setDeleteColor(false);
    setDeleteAlarm(false);
    setDeleteTime(false);
    setDelteMemo(false);
  };

  useEffect(() => {
    if (deleteTime === true) {
      setDeleteAlarm(true);
    }
  }, [deleteTime, deleteAlarm]);

  const optionConfimHandle = () => {
    loadItems();
    setOptionModal(!optionModal);
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time =
          new Date(startSelectDate).getTime() + i * 24 * 60 * 60 * 1000;
        const date = new Date(time);
        const timeToString = moment(date).format("YYYY-MM-DD");
        const strTime = timeToString;
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
              alrams: deleteAlarm
                ? []
                : dayToDoes && dayToDoes[j] && dayToDoes[j].alrams,
              startDate: dayToDoes && dayToDoes[j] && dayToDoes[j].startDate,
              startTime: deleteTime
                ? null
                : dayToDoes && dayToDoes[j] && dayToDoes[j].startTime,
              endDate: dayToDoes && dayToDoes[j] && dayToDoes[j].endDate,
              endTime: deleteTime
                ? null
                : dayToDoes && dayToDoes[j] && dayToDoes[j].endTime,
              color: deleteColor
                ? "블랙(기본)"
                : dayToDoes && dayToDoes[j] && dayToDoes[j].color,
              goal: dayToDoes && dayToDoes[j] && dayToDoes[j].goal,
              originToDoId:
                dayToDoes && dayToDoes[j] && dayToDoes[j].originToDoId,
              memo: deleteMemo
                ? null
                : dayToDoes && dayToDoes[j] && dayToDoes[j].memo,
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
    return <PreviewToDo item={item} navigation={navigation} />;
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
    const month = day && day.month;

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
        {day !== undefined ? (
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
          </>
        ) : null}
      </View>
    );
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <>
      <View
        style={{
          width: contents.width,
          backgroundColor: "white",
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: contents.width,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => setOptionModal(!optionModal)}>
            <View style={{ marginRight: 20 }}>
              <ExpoIcon name={"menu"} />
              <Text
                style={{
                  fontSize: 10,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                옵션
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NewGoalCreateView", {
                id,
                toDoes,
                deleteColor,
                deleteAlarm,
                deleteTime,
                deleteMemo,
                value,
                selectCategory,
                selectItem,
                cardColor,
                select,
                isSwitch,
                keywordValue,
                startSelectDate,
                goalId,
                maxEndDate,
              })
            }
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <ExpoIcon name={"download"} />
              <Text
                style={{
                  fontSize: 10,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                다운로드
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Agenda
        items={items}
        selected={new Date(startSelectDate)}
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
          backgroundColor: styles.lightGreyColor,
          // calendarBackground: "#ffffff",
          // textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: null,
          selectedDayTextColor: styles.TextLavendar,
          // selectedDayTextSize: 20,
          todayTextColor: styles.TextSkyBlue,
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
          calendarBackground: "white",
          agendaKnobColor: styles.darkGreyColor,
          agendaTodayColor: "red",
        }}
        renderDay={(day) => renderDay(day)}
        // hideExtraDays={false}
      />
      <Modal
        isVisible={optionModal}
        onBackdropPress={() => cancleOptionHandle()}
        onRequestClose={() => cancleOptionHandle()}
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
              width: 300,
              height: "auto",
            }}
          >
            <View
              style={{
                height: "auto",
              }}
            >
              <DownScheduleOption
                title={"색상"}
                boxText={"검정(기본)"}
                text={`검정색(글자색)이 아닌 색상이 ${colorLength}건이 있습니다.`}
                useState={deleteColor}
                setUseState={setDeleteColor}
                length={colorLength}
                zeroLengthText={
                  "모든 글자색은 검정색으로 변동가능한 옵션이 없습니다"
                }
              />

              <DownScheduleOption
                title={"알람"}
                boxText={"알람삭제"}
                text={`알람이 총 ${alarmLength}건이 있습니다.`}
                useState={deleteAlarm}
                setUseState={setDeleteAlarm}
                length={alarmLength}
                zeroLengthText={"삭제할 알람이 없습니다."}
                timeState={deleteTime}
              />
              <DownScheduleOption
                title={"시간"}
                boxText={"시간삭제"}
                text={`시간(시작/종료시간)이 총 ${timeLength}건이 있습니다.`}
                useState={deleteTime}
                setUseState={setDeleteTime}
                length={timeLength}
                zeroLengthText={"삭제할 시간정보가 없습니다"}
              />
              <DownScheduleOption
                title={"메모"}
                boxText={"메모삭제"}
                text={`메모가 총 ${memoLength}건이 있습니다.`}
                useState={deleteMemo}
                setUseState={setDelteMemo}
                length={memoLength}
                zeroLengthText={"삭제할 메모가 없습니다."}
              />
            </View>
            <View
              style={{
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                해당 옵션들은 각 할 일들의 상세정보에 대한 변경사항입니다.
              </Text>
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
              <TouchableOpacity onPress={() => cancleOptionHandle()}>
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
              <TouchableOpacity onPress={() => optionConfimHandle()}>
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
    </>
  );
};

export default DownScheduleView;
