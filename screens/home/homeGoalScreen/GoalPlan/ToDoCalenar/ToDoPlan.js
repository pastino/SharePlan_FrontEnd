import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import contents from "../../../../../contents";
import styles from "../../../../../styles";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import ToDoStageView from "./ToDoStageView";

const ToDoPlan = ({ createdPlanData, navigation, id }) => {
  const [toDayStage, setToDayStage] = useState();

  const firstStage = createdPlanData && createdPlanData[0];
  const secondStage = createdPlanData && createdPlanData[1];
  const thirdStage = createdPlanData && createdPlanData[2];
  const forthStage = createdPlanData && createdPlanData[3];
  const fivethStage = createdPlanData && createdPlanData[4];

  const planDataLength = createdPlanData && createdPlanData.length;

  const today = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    for (let i = 0; i < planDataLength; i++) {
      const start = moment(
        createdPlanData && createdPlanData[i] && createdPlanData[i].startingDay
      ).format("YYYY-MM-DD");
      const end = moment(
        createdPlanData && createdPlanData[i] && createdPlanData[i].endDay
      ).format("YYYY-MM-DD");
      const startDate = moment(start, "YYYY-MM-DD");
      const endDate = moment(end, "YYYY-MM-DD");
      const date = moment(today, "YYYY-MM-DD");
      if (
        (date.isBefore(endDate) && date.isAfter(startDate)) ||
        date.isSame(startDate) ||
        date.isSame(endDate)
      ) {
        setToDayStage(i);
        break;
      }
    }
  }, [createdPlanData]);

  return (
    <View style={{ paddingBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          flexWrap: "wrap",
          marginLeft: contents.width / 30,
          marginRight: contents.width / 30,
          justifyContent: "space-between",
        }}
      >
        {planDataLength > 0 ? (
          <View>
            <ToDoStageView
              stageData={firstStage}
              stageNumber={1}
              toDayStage={toDayStage + 1}
              navigation={navigation}
              id={id}
            />
          </View>
        ) : null}
        {planDataLength > 1 ? (
          <View>
            <ToDoStageView
              stageData={secondStage}
              stageNumber={2}
              toDayStage={toDayStage + 1}
              navigation={navigation}
              id={id}
            />
          </View>
        ) : null}
        {planDataLength > 2 ? (
          <View style={{ marginTop: contents.width / 30 }}>
            <ToDoStageView
              stageData={thirdStage}
              stageNumber={3}
              toDayStage={toDayStage + 1}
              navigation={navigation}
              id={id}
            />
          </View>
        ) : null}
        {planDataLength > 3 ? (
          <View style={{ marginTop: contents.width / 30 }}>
            <ToDoStageView
              stageData={forthStage}
              stageNumber={4}
              toDayStage={toDayStage + 1}
              navigation={navigation}
              id={id}
            />
          </View>
        ) : null}
        {planDataLength > 4 ? (
          <View style={{ marginTop: contents.width / 30 }}>
            <ToDoStageView
              stageData={fivethStage}
              stageNumber={5}
              toDayStage={toDayStage + 1}
              navigation={navigation}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ToDoPlan;
