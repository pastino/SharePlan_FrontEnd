import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import styles from "../../../../styles";
import Swiper from "react-native-swiper";
import { concat } from "apollo-boost";

const CalendarTest = () => {
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const selectDate = new Date();
  const [day, setDay] = useState(selectDate.getDate());
  const [year, setYear] = useState(selectDate.getFullYear());
  const [month, setMonth] = useState(selectDate.getMonth());

  const fullCalendar = [];
  const secondFullCalendar = [];

  const nDays = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (month === 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }

  let matrix;
  for (let a = 2020; a < 2022; a++) {
    for (let i = 0; i < 12; i++) {
      matrix = [];
      matrix[0] = weekDays;
      let counter = 1;
      let row;
      let col;
      for (row = 1; row < 7; row++) {
        matrix[row] = [];
        for (col = 0; col < 7; col++) {
          matrix[row][col] = -1;
          if (row == 1 && col >= new Date(a, i, 1).getDay()) {
            // Fill in rows only after the first day of the month
            matrix[row][col] = counter++;
          } else if (row > 1 && counter <= nDays[i]) {
            // Fill in rows only if the counter's not greater than
            // the number of days in the month
            matrix[row][col] = counter++;
          }
        }
      }
      if (a === 2020) {
        fullCalendar.push(matrix);
      } else {
        secondFullCalendar.push(matrix);
      }
    }
  }

  const bigFullCalendar = fullCalendar.concat(secondFullCalendar);

  return (
    <Swiper index={month} loop={false}>
      {bigFullCalendar.map((month, monthIndex) => (
        <View key={Math.random().toString()}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              {monthIndex >= 0 && monthIndex < 12 ? "2020년" : "2021년"}{" "}
              {monthIndex >= 0 && monthIndex < 12
                ? `${monthIndex + 1}월`
                : `${monthIndex - 11}월`}
            </Text>
          </View>
          {month.map((row, rowIndex) => (
            <View style={{ flexDirection: "row" }}>
              {row.map((item, colIndex) =>
                item != -1 ? (
                  <View
                    key={Math.random().toString()}
                    style={{
                      // fontWeight: item === today ? "700" : "normal",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 50,
                      textAlign: "center",
                      backgroundColor:
                        item === day ? styles.MainColor : "white",
                      borderRadius: 10,
                    }}
                  >
                    <Text>{item}</Text>
                  </View>
                ) : (
                  <View style={{ flex: 1 }}></View>
                )
              )}
            </View>
          ))}
        </View>
      ))}
    </Swiper>
  );
};

export default CalendarTest;
