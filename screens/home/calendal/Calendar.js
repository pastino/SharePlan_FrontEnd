import React, { useState } from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
import ExpoIcon from "../../../components/ExpoIcon";
import CalendarTodo from "./CalendarTodo";
import BasicFlatList from "./data/BasicFlatList";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../styles";
import {
  CreateDayToDoMutation,
  EditToDoListMutation,
  DeleteToDoMutation,
} from "./data/Mutation";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME } from "../HomeQueries";
import moment from "moment";
import contents from "../../../contents";
import { NavigationActions } from "react-navigation";

const CalendarContainer = styled.View`
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
`;
const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
`;
const HeaderText = styled.Text`
  font-size: 25px;
  font-family: "flower";
  margin-bottom: 30px;
  margin-top: 20px;
`;

const CalendarText = styled.Text`
  font-family: "flower";
`;

const ToDoAcountText = styled.Text`
  font-family: "flower";
`;

const Calendar = ({
  data,
  navigation,
  startDayView,
  inquiryperiodView,
  inquiryperiodNumberView,
}) => {
  //Hooks and Const

  const selectDate = new Date();
  const today = selectDate.getDate();
  const [day, setDay] = useState(selectDate.getDate());
  const [year, setYear] = useState(selectDate.getFullYear());
  const [month, setMonth] = useState(selectDate.getMonth());

  const week = new Array(
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  );

  const [todayLabel, setTodayLabel] = useState(selectDate.getDay());
  const firstDay = new Date(year, month, 1).getDay();
  const [isToDoListOfDay, setIsToDoListOfDay] = useState([]);
  const dayOfWeekday = week[todayLabel];
  const months = [
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
  ];
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const monthDay = `${year}-${
    month + 1 < 10 ? "0" + `${month + 1}` : month + 1
  }-${day < 10 ? "0" + day : day}`;

  const input = React.createRef();
  const [value, setValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModifyVisible, setModifyVisible] = useState(false);
  const [isChangeText, setIsChangeText] = useState(false);
  const [isImportWhether, setIsImportWhether] = useState(false);
  const [isCurrentList, setIsCurrentList] = useState([]);

  const [inquiryperiod, setInquiryperiod] = useState(inquiryperiodView);
  const [inquiryperiodNumber, setInquiryperiodNumber] = useState(
    inquiryperiodNumberView
  );

  const selectHandle = (item, month) => {
    selectDate.setMonth(month);
    selectDate.setDate(item);
    setDay(selectDate.getDate());
    setTodayLabel(selectDate.getDay());
    setIsToDoListOfDay(
      data &&
        data.dayToDoes &&
        data.dayToDoes.filter(
          (obj) =>
            obj.monthDay ===
            `${year}-${month + 1 < 10 ? "0" + `${month + 1}` : month + 1}-${
              item < 10 ? "0" + item : item
            }`
        )
    );
  };

  const selectDay = moment([year, month, day]).format("YYYY-MM-DD");

  let matrix;
  const generateMatrix = () => {
    matrix = [];
    matrix[0] = weekDays;
    let counter = 1;
    let row;
    let col;
    for (row = 1; row < 7; row++) {
      matrix[row] = [];
      for (col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
  };

  let maxDays = nDays[month];
  if (month === 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }

  const metrixCalendal = generateMatrix();

  let rows = [];
  rows = matrix.map((row, rowIndex) => {
    const rowItems = row.map((item, colIndex) => {
      const selectItem = `${year}-${
        month + 1 < 10 ? "0" + `${month + 1}` : month + 1
      }-${item < 10 ? "0" + item : item}`;
      const markToDo =
        data &&
        data.dayToDoes &&
        data.dayToDoes.filter((object) => object.startDate === selectItem);
      const markFalseToDo =
        data &&
        data.dayToDoes
          .filter((object) => object.complete === false)
          .filter((object) => object.startDate === selectItem);

      return item != -1 ? (
        <View
          key={Math.random().toString()}
          style={{
            fontWeight: item === today ? "700" : "normal",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            textAlign: "center",
            backgroundColor: item === day ? styles.MainColor : "white",
            borderRadius: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={() => selectHandle(item, month)}>
            <CalendarText
              style={{
                fontSize: 20,
                color:
                  colIndex === 0
                    ? "#a00"
                    : "#000" && item === day
                    ? "white"
                    : "black",
                fontWeight: item === today ? "700" : "normal",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                width: 50,
                textAlign: "center",
                borderRadius: 10,
              }}
            >
              {item}
            </CalendarText>
            {markToDo && markToDo.length ? (
              <ToDoAcountText
                style={{
                  textAlign: "center",
                  fontSize: 8,
                  paddingBottom: 5,
                  color:
                    colIndex === 0
                      ? "#a00"
                      : "#000" && item === day
                      ? "white"
                      : styles.ImportRedColor,
                }}
              >
                할 일: &nbsp;
                {markFalseToDo && markFalseToDo.length} /{" "}
                {markToDo && markToDo.length}
              </ToDoAcountText>
            ) : null}
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <CalendarText
          key={Math.random().toString()}
          style={{
            flex: 1,
          }}
        ></CalendarText>
      );
    });

    return (
      <View
        key={Math.random().toString()}
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        {rowItems}
      </View>
    );
  });

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          flexDirection: "row",
          padding: 15,
        }}
      >
        <Text style={{ fontWeight: "700" }}>기간조회</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              NavigationActions.navigate({
                routeName: "TabNavigation",
                params: {
                  selectDay,
                  inquiryperiod,
                  inquiryperiodNumber,
                },

                action: NavigationActions.navigate({
                  routeName: "Tab1",
                  params: {
                    selectDay,
                    inquiryperiod,
                    inquiryperiodNumber,
                  },
                  action: NavigationActions.navigate({
                    routeName: "HomeDiv",
                    params: {
                      selectDay,
                      inquiryperiod,
                      inquiryperiodNumber,
                    },
                    action: NavigationActions.navigate({
                      routeName: "Home",
                      params: {
                        selectDay,
                        inquiryperiod,
                        inquiryperiodNumber,
                      },
                    }),
                  }),
                }),
              })
            )
          }
        >
          <View>
            <ExpoIcon name={"check"} />
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <ScrollView>
          <GestureRecognizer
            onSwipeLeft={() => {
              if (month !== 11) {
                setMonth(month + 1);
              } else if (month === 11) {
                setYear(year + 1);
                setMonth(0);
              }
            }}
            onSwipeRight={() => {
              if (month !== 0) {
                setMonth(month - 1);
              } else if (month === 0) {
                setYear(year - 1);
                setMonth(11);
              }
            }}
            config={{
              velocityThreshold: 0.5,
              directionalOffsetThreshold: 80,
            }}
          >
            <CalendarContainer>
              <HeaderView>
                <TouchableOpacity
                  onPress={() => {
                    if (month !== 0) {
                      setMonth(month - 1);
                    } else if (month === 0) {
                      setYear(year - 1);
                      setMonth(11);
                    }
                  }}
                  style={{ marginTop: 20, marginRight: 80 }}
                >
                  <ExpoIcon name={"chevron-left"} />
                </TouchableOpacity>
                <HeaderText>
                  {year}년&nbsp;
                  {months[month]}
                </HeaderText>
                <TouchableOpacity
                  onPress={() => {
                    if (month !== 11) {
                      setMonth(month + 1);
                    } else if (month === 11) {
                      setYear(year + 1);
                      setMonth(0);
                    }
                  }}
                  style={{ marginTop: 20, marginLeft: 80 }}
                >
                  <ExpoIcon name={"chevron-right"} />
                </TouchableOpacity>
              </HeaderView>
              {rows}
            </CalendarContainer>
          </GestureRecognizer>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 17,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 17 }}>
              조회기간
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setInquiryperiod("오늘");
                  setInquiryperiodNumber(1);
                }}
              >
                <View
                  style={{
                    width: contents.width / 4.7,
                    height: 40,
                    backgroundColor:
                      inquiryperiod === "오늘"
                        ? styles.MainColor
                        : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    당일
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setInquiryperiod("일주일");
                  setInquiryperiodNumber(7);
                }}
              >
                <View
                  style={{
                    width: contents.width / 4.7,
                    height: 40,
                    backgroundColor:
                      inquiryperiod === "일주일"
                        ? styles.MainColor
                        : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    일주일
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setInquiryperiod("1개월");
                  setInquiryperiodNumber(30);
                }}
              >
                <View
                  style={{
                    width: contents.width / 4.7,
                    height: 40,
                    backgroundColor:
                      inquiryperiod === "1개월"
                        ? styles.MainColor
                        : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    1개월
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setInquiryperiod("3개월");
                  setInquiryperiodNumber(90);
                }}
              >
                <View
                  style={{
                    width: contents.width / 4.7,
                    height: 40,
                    backgroundColor:
                      inquiryperiod === "3개월"
                        ? styles.MainColor
                        : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    3개월
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* <BasicFlatList
            month={month}
            day={day}
            data={data}
            isToDoListOfDay={isToDoListOfDay}
            setIsToDoListOfDay={setIsToDoListOfDay}
            isImportWhether={isImportWhether}
            setIsImportWhether={setIsImportWhether}
            loading={loading}
            isModifyVisible={isModifyVisible}
            setModifyVisible={setModifyVisible}
            isChangeText={isChangeText}
            setIsChangeText={setIsChangeText}
            isCurrentList={isCurrentList}
            setIsCurrentList={setIsCurrentList}
            value={value}
            setValue={setValue}
            monthDay={monthDay}
            input={input}
            editToDoListMutation={EditToDoListMutation({
              isCurrentList,
              value,
              isImportWhether,
              monthDay,
            })} //Mutation
            deleteToDoMutation={DeleteToDoMutation({
              isCurrentList,
              monthDay,
            })} //Mutation
            navigation={navigation}
            completeRoute="calendar"
          /> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Calendar;
