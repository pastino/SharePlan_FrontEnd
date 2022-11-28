import React, { Fragment, useEffect, useState } from "react";
import { View, Text } from "react-native";
import GoalStageBar from "./GoalStageBar";
import moment from "moment";

const GoalStagePlanPresent = ({
  keyWord,
  detailPlans,
  data,
  loading,
  toDoData,
  id,
}) => {
  const [todayData, setTodayData] = useState(null);
  const [index, setIndex] = useState();

  useEffect(() => {
    if (detailPlans && detailPlans.length !== 0) {
      for (let i = 0; i < parseInt(detailPlans && detailPlans.length); i++) {
        let startDate = moment(
          detailPlans && detailPlans[i] && detailPlans[i].startingDay
        ).format("YYYY-MM-DD");
        let endDate = moment(
          detailPlans && detailPlans[i] && detailPlans[i].endDay
        ).format("YYYY-MM-DD");
        startDate = moment(startDate);
        endDate = moment(endDate);
        const now = startDate,
          dates = [];
        while (now.isBefore(endDate) || now.isSame(endDate)) {
          dates.push(now.format("YYYY-MM-DD"));
          now.add(1, "days");
        }
        const today = moment(new Date()).format("YYYY-MM-DD");
        const todayStageConfirm = dates.includes(today);
        if (todayStageConfirm) {
          setTodayData(detailPlans && detailPlans[i]);
          setIndex(i);
          break;
        }
      }
    }
  }, [data]);

  return todayData !== null ? (
    <View>
      <GoalStageBar
        startingDay={todayData.startingDay}
        endDay={todayData.endDay}
        stagePlanText={todayData.stagePlanText}
        goalId={id}
        data={data}
        loading={loading}
        keyWord={keyWord}
        index={index + 1}
        toDoData={toDoData}
      />
    </View>
  ) : null;
};

export default GoalStagePlanPresent;
