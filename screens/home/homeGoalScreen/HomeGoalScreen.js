import React from "react";
import GoalsList from "./GoalsList/GoalsList";
import { View } from "react-native";

const HomeGoalScreen = ({ me, navigation, seeDayToDo, goals }) => {
  return (
    <View>
      {goals && goals.length === 1
        ? goals &&
          goals.map((goal) => (
            <GoalsList
              key={goal.id}
              me={me}
              {...goal}
              navigation={navigation}
              division={"me"}
              seeDayToDo={seeDayToDo}
            />
          ))
        : goals &&
          goals.map((goal) => (
            <GoalsList
              key={goal.id}
              me={me}
              {...goal}
              navigation={navigation}
              division={"me"}
              seeDayToDo={seeDayToDo}
            />
          ))}
    </View>
  );
};

export default HomeGoalScreen;
