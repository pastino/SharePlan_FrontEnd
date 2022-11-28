import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DayilyPlan from "./AdminMethod/DayilyPlan";
import styles from "../../../../../styles";
import PeriodPlan from "./AdminMethod/PeriodPlan";
import { useQuery } from "react-apollo-hooks";
import { SEE_GOAL_TODO_PLAN } from "../GoalPlanQuery";

const ToDoCalendar = ({ navigation }) => {
  const goalId = navigation.getParam("id");

  const { data, loading } = useQuery(SEE_GOAL_TODO_PLAN, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  return (
    <ScrollableTabView
      initialPage={0}
      onChangeTab={() => {
        null;
      }}
      style={{ backgroundColor: "white" }}
      tabBarActiveTextColor={styles.MainColor}
      tabBarUnderlineStyle={{
        backgroundColor: styles.MainColor,
        height: 3,
      }}
    >
      <DayilyPlan
        navigation={navigation}
        goalId={goalId}
        tabLabel="Dayil Plan"
        data={data}
        loading={loading}
      />
      <PeriodPlan
        navigation={navigation}
        goalId={goalId}
        tabLabel="Period Plan"
        data={data}
        loading={loading}
      />
    </ScrollableTabView>
  );
};

export default ToDoCalendar;
