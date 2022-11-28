import React, { useEffect, Fragment } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import GoalStagePlanPresent from "./GoalStagePlanPresent/GoalStagePlanPresent";
import contents from "../../../contents";
import styles from "../../../styles";

const GoalStagePlanView = ({ data, loading, toDoData }) => {
  return (
    <View
      style={{
        width: contents.width,
      }}
    >
      {data &&
        data.seeFullPlan &&
        data.seeFullPlan.map((plan) => (
          <Fragment key={plan.id}>
            <GoalStagePlanPresent
              {...plan}
              data={data}
              loading={loading}
              toDoData={toDoData}
            />
          </Fragment>
        ))}
    </View>
  );
};

export default GoalStagePlanView;
