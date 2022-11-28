import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { View, Text } from "react-native";
import GoalComplete from "../../screens/home/homeGoalScreen/GoalEdit/GoalComplete";

const GoalCompleteNavigation = createStackNavigator({
  GoalComplete: {
    screen: GoalComplete,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>목표완료</Text>
        </View>
      )
    }
  }
});

export default createAppContainer(GoalCompleteNavigation);
