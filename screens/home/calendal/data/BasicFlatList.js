import React, { useState, useEffect } from "react";

import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import contents from "../../../../contents";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../../../styles";
import ToDoListData from "./ToDoListData";
import moment from "moment";

const BasicFlatList = ({
  data,
  goalData,
  completeRoute,
  navigation,
  startDayView,
  inquiryperiodNumberView,
  onRefresh: toDoRefresh,
  meData,
}) => {
  const [toDoSelect, setToDoSelect] = useState(1);

  const selectedToDoList = data && data.dayToDoes;

  const completeFalse =
    selectedToDoList &&
    selectedToDoList.filter((list) => list.complete === false) &&
    selectedToDoList
      .filter((list) => list.complete === false)
      .sort((a, b) => a.index - b.index);

  const completeTrue =
    selectedToDoList &&
    selectedToDoList.filter((list) => list.complete === true) &&
    selectedToDoList
      .filter((list) => list.complete === true)
      .sort((a, b) => a.index - b.index);

  const [items, setItems] = useState({});
  const [trueItems, setTrueItems] = useState({});

  const test = {};
  const testTwo = {};

  useEffect(() => {
    for (let i = 0; i < inquiryperiodNumberView; i++) {
      const time = new Date(startDayView).getTime() + i * 24 * 60 * 60 * 1000;
      const date = new Date(time);
      const timeToString = moment(date).format("YYYY-MM-DD");
      const strTime = timeToString;
      const dayToDoes =
        completeFalse !== undefined
          ? completeFalse &&
            completeFalse.filter(
              (toDo) =>
                toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
                toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
            )
          : [];
      const trueDayToDoes =
        completeTrue !== undefined
          ? completeTrue &&
            completeTrue.filter(
              (toDo) =>
                toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
                toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
            )
          : [];

      if (dayToDoes.length === 0) {
        null;
      } else {
        test[strTime] = [];
        if (dayToDoes && dayToDoes.length > 0) {
          for (let j = 0; j < parseInt(dayToDoes && dayToDoes.length); j++) {
            test[strTime].push({
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
              originToDoId:
                dayToDoes && dayToDoes[j] && dayToDoes[j].originToDoId,
              memo: dayToDoes && dayToDoes[j] && dayToDoes[j].memo,
              index: dayToDoes && dayToDoes[j] && dayToDoes[j].index,
              user: dayToDoes && dayToDoes[j] && dayToDoes[j].user,
              strTime: strTime,
            });
          }
        }
      }

      if (trueDayToDoes && trueDayToDoes.length > 0) {
        testTwo[strTime] = [];
        for (
          let j = 0;
          j < parseInt(trueDayToDoes && trueDayToDoes.length);
          j++
        ) {
          testTwo[strTime].push({
            id: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].id,
            toDoList:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].toDoList,
            complete:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].complete,
            alrams:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].alrams,
            startDate:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].startDate,
            startTime:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].startTime,
            endDate:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].endDate,
            endTime:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].endTime,
            color: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].color,
            goal: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].goal,
            posts: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].posts,
            originToDoId:
              trueDayToDoes &&
              trueDayToDoes[j] &&
              trueDayToDoes[j].originToDoId,
            memo: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].memo,
            index: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].index,
            user: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].user,
            strTime: strTime,
          });
        }
      }
    }
    const newItems = {};
    const newItemsTwo = {};
    Object.keys(test).forEach((key) => {
      newItems[key] = test[key].length === 0 ? null : test[key];
    });
    Object.keys(testTwo).forEach((key) => {
      newItemsTwo[key] = testTwo[key].length === 0 ? null : testTwo[key];
    });
    setTrueItems(newItemsTwo);
    setItems(newItems);
  }, [startDayView]);

  useEffect(() => {
    for (let i = 0; i < inquiryperiodNumberView; i++) {
      const time = new Date(startDayView).getTime() + i * 24 * 60 * 60 * 1000;
      const date = new Date(time);
      const timeToString = moment(date).format("YYYY-MM-DD");
      const strTime = timeToString;
      const dayToDoes =
        completeFalse !== undefined
          ? completeFalse &&
            completeFalse.filter(
              (toDo) =>
                toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
                toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
            )
          : [];
      const trueDayToDoes =
        completeTrue !== undefined
          ? completeTrue &&
            completeTrue.filter(
              (toDo) =>
                toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
                toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
            )
          : [];

      if (dayToDoes.length === 0) {
        null;
      } else {
        test[strTime] = [];
        if (dayToDoes && dayToDoes.length > 0) {
          for (let j = 0; j < parseInt(dayToDoes && dayToDoes.length); j++) {
            test[strTime].push({
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
              originToDoId:
                dayToDoes && dayToDoes[j] && dayToDoes[j].originToDoId,
              memo: dayToDoes && dayToDoes[j] && dayToDoes[j].memo,
              index: dayToDoes && dayToDoes[j] && dayToDoes[j].index,
              user: dayToDoes && dayToDoes[j] && dayToDoes[j].user,
              strTime: strTime,
            });
          }
        }
      }

      if (trueDayToDoes && trueDayToDoes.length > 0) {
        testTwo[strTime] = [];
        for (
          let j = 0;
          j < parseInt(trueDayToDoes && trueDayToDoes.length);
          j++
        ) {
          testTwo[strTime].push({
            id: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].id,
            toDoList:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].toDoList,
            complete:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].complete,
            alrams:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].alrams,
            startDate:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].startDate,
            startTime:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].startTime,
            endDate:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].endDate,
            endTime:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].endTime,
            color: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].color,
            goal: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].goal,
            posts: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].posts,
            originToDoId:
              trueDayToDoes &&
              trueDayToDoes[j] &&
              trueDayToDoes[j].originToDoId,
            memo: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].memo,
            index: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].index,
            user: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].user,
            strTime: strTime,
          });
        }
      }
    }
    const newItems = {};
    const newItemsTwo = {};
    Object.keys(test).forEach((key) => {
      newItems[key] = test[key].length === 0 ? null : test[key];
    });
    Object.keys(testTwo).forEach((key) => {
      newItemsTwo[key] = testTwo[key].length === 0 ? null : testTwo[key];
    });
    setTrueItems(newItemsTwo);
    setItems(newItems);
  }, [inquiryperiodNumberView]);

  useEffect(() => {
    for (let i = 0; i < inquiryperiodNumberView; i++) {
      const time = new Date(startDayView).getTime() + i * 24 * 60 * 60 * 1000;
      const date = new Date(time);
      const timeToString = moment(date).format("YYYY-MM-DD");
      const strTime = timeToString;
      const dayToDoes =
        completeFalse !== undefined
          ? completeFalse &&
            completeFalse.filter(
              (toDo) =>
                toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
                toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
            )
          : [];
      const trueDayToDoes =
        completeTrue !== undefined
          ? completeTrue &&
            completeTrue.filter(
              (toDo) =>
                toDo.startDate <= moment(strTime).format("YYYY-MM-DD") &&
                toDo.endDate >= moment(strTime).format("YYYY-MM-DD")
            )
          : [];

      if (dayToDoes.length === 0) {
        null;
      } else {
        test[strTime] = [];
        if (dayToDoes && dayToDoes.length > 0) {
          for (let j = 0; j < parseInt(dayToDoes && dayToDoes.length); j++) {
            test[strTime].push({
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
              originToDoId:
                dayToDoes && dayToDoes[j] && dayToDoes[j].originToDoId,
              memo: dayToDoes && dayToDoes[j] && dayToDoes[j].memo,
              index: dayToDoes && dayToDoes[j] && dayToDoes[j].index,
              user: dayToDoes && dayToDoes[j] && dayToDoes[j].user,
              strTime: strTime,
            });
          }
        }
      }

      if (trueDayToDoes && trueDayToDoes.length > 0) {
        testTwo[strTime] = [];
        for (
          let j = 0;
          j < parseInt(trueDayToDoes && trueDayToDoes.length);
          j++
        ) {
          testTwo[strTime].push({
            id: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].id,
            toDoList:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].toDoList,
            complete:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].complete,
            alrams:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].alrams,
            startDate:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].startDate,
            startTime:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].startTime,
            endDate:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].endDate,
            endTime:
              trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].endTime,
            color: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].color,
            goal: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].goal,
            posts: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].posts,
            originToDoId:
              trueDayToDoes &&
              trueDayToDoes[j] &&
              trueDayToDoes[j].originToDoId,
            memo: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].memo,
            index: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].index,
            user: trueDayToDoes && trueDayToDoes[j] && trueDayToDoes[j].user,
            strTime: strTime,
          });
        }
      }
    }
    const newItems = {};
    const newItemsTwo = {};
    Object.keys(test).forEach((key) => {
      newItems[key] = test[key].length === 0 ? null : test[key];
    });
    Object.keys(testTwo).forEach((key) => {
      newItemsTwo[key] = testTwo[key].length === 0 ? null : testTwo[key];
    });
    setTrueItems(newItemsTwo);
    setItems(newItems);

    setTrueItems(newItemsTwo);
    setItems(newItems);
  }, [data]);

  const endDayView = moment(startDayView)
    .add(inquiryperiodNumberView, "days")
    .toDate();

  const toDoLength =
    completeFalse !== undefined
      ? completeFalse.filter(
          (toDo) =>
            toDo.startDate >= moment(startDayView).format("YYYY-MM-DD") &&
            toDo.startDate <= moment(endDayView).format("YYYY-MM-DD")
        ).length
      : 0;

  const toDoCompleteLength =
    completeTrue !== undefined
      ? completeTrue.filter(
          (toDo) =>
            toDo.startDate >= moment(startDayView).format("YYYY-MM-DD") &&
            toDo.startDate <= moment(endDayView).format("YYYY-MM-DD")
        ).length
      : 0;

  const [refreshing, setRefreshing] = useState(false);
  const [today, setToday] = useState(new Date());

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setToday(new Date());
      toDoRefresh();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            width: contents.width,
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderTopColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            borderBottomColor: styles.lightGreyColor,
            height: 47,
          }}
        >
          <TouchableOpacity onPress={() => setToDoSelect(1)} style={{}}>
            <View
              style={{
                width: contents.width / 2,
                height: 47,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                borderRightColor: styles.lightGreyColor,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: toDoSelect === 1 ? styles.MainColor : null,
                  fontWeight: toDoSelect === 1 ? "700" : null,
                  borderBottomWidth: toDoSelect === 1 ? 1 : null,
                  borderBottomColor: styles.MainColor,
                }}
              >
                해야할 일 ({toDoLength})
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToDoSelect(2)}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                width: contents.width / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: toDoSelect === 2 ? styles.MainColor : null,
                  fontWeight: toDoSelect === 2 ? "700" : null,
                  borderBottomWidth: toDoSelect === 2 ? 1 : null,
                  borderBottomColor: styles.MainColor,
                }}
              >
                완료한 일 ({toDoCompleteLength})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: contents.width,
          }}
        >
          {toDoSelect === 1 ? (
            <View style={{ alignItems: "center" }}>
              {completeFalse && completeFalse.length === 0 ? (
                <View
                  style={{
                    alignItems: "center",
                    minHeight: 50,
                    marginTop: 14,
                    paddingBottom: 5,
                    height:
                      completeRoute !== "calendar"
                        ? contents.height - 60 - 70 - 50 - 47 - 80
                        : contents.height - 60 - 70 - 50 - 47 - 300,
                  }}
                >
                  <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
                    아직 해야할 일이 없습니다
                  </Text>
                </View>
              ) : (
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  style={{
                    height: contents.height - 60 - 70 - 50 - 27,
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {Object.values(items).map((array) => (
                    <View
                      key={Math.random().toString()}
                      style={{ paddingTop: 10 }}
                    >
                      <ToDoListData
                        completeFalse={array}
                        navigation={navigation}
                        today={today}
                        meData={meData}
                      />
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          ) : (
            <View
              style={{
                width: contents.width,
                height:
                  completeRoute !== "calendar"
                    ? contents.height - 60 - 70 - 50 - 47 - 80
                    : contents.height - 60 - 70 - 50 - 47 - 300,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {completeTrue && completeTrue.length === 0 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 50,
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
                      아직 완료한 일이 없습니다
                    </Text>
                  </View>
                ) : (
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                      height: contents.height - 60 - 70 - 50 - 27,
                    }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  >
                    {Object.values(trueItems).map((array) => (
                      <View
                        key={Math.random().toString()}
                        style={{ paddingTop: 10 }}
                      >
                        <ToDoListData
                          completeFalse={array}
                          navigation={navigation}
                          today={today}
                          meData={meData}
                          // seeMe={seeMe}
                        />
                      </View>
                    ))}
                  </ScrollView>

                  // <ScrollView
                  //   contentContainerStyle={{
                  //     width: contents.width,
                  //     justifyContent: "center",
                  //     alignItems: "center",
                  //   }}
                  // >
                  //   {completeTrue &&
                  //     completeTrue.map((list) => (
                  //       <Fragment key={list.id}>
                  //         <TouchableWithoutFeedback
                  //           onPress={() => {
                  //             completeTrueHandle({ list });
                  //           }}
                  //         >
                  //           <View
                  //             style={{
                  //               width: contents.width / 1.15,
                  //               height: "auto",
                  //               padding: 10,
                  //               marginBottom: 10,
                  //               borderWidth: 1,
                  //               borderRadius: 10,
                  //               borderColor: styles.darkGreyColor,
                  //               flexDirection: "row",
                  //             }}
                  //           >
                  //             <Text
                  //               style={{
                  //                 textDecorationLine: "line-through",
                  //                 color: styles.darkGreyColor,
                  //               }}
                  //             >
                  //               {list.toDoList}
                  //             </Text>
                  //           </View>
                  //         </TouchableWithoutFeedback>
                  //       </Fragment>
                  //     ))}
                  // </ScrollView>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default BasicFlatList;
