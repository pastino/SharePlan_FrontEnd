import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { View, Text } from "react-native";
import GoalGiveUp from "../../screens/home/homeGoalScreen/GoalEdit/GoalGiveUp";

const GoalEditNavigation = createStackNavigator({
  GoalGiveUp: {
    screen: GoalGiveUp,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            목표 포기/삭제
          </Text>
        </View>
      )
    }
  }
});

export default createAppContainer(GoalEditNavigation);
