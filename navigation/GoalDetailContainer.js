import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import GoalDetailStackNavigation from "./GoalDetailStackNavigation";
import InformationCreate from "../screens/home/homeGoalScreen/GoalsList/InformationCreate/InformationCreate";
import GoalDetailStackPhotos from "./GoalDetailStackPhotos";
import { createAppContainer } from "react-navigation";
import ImageView from "../screens/home/homeGoalScreen/GoalsList/ImageView";
import HomeGoalDetail from "../screens/home/homeGoalScreen/HomeGoalDetail";
import { View, Text } from "react-native";

const GoalDetailContainer = createStackNavigator({
  GoalDetailStackNavigation: {
    screen: GoalDetailStackNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  InformationCreate: {
    screen: InformationCreate,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>생성/수정</Text>
        </View>
      ),
    },
  },
  GoalDetailStackPhotos: {
    screen: GoalDetailStackPhotos,
    navigationOptions: {
      headerShown: false,
    },
  },
  HomeGoalDetail: {
    screen: HomeGoalDetail,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>포스트</Text>
        </View>
      ),
    },
  },
  ImageView: {
    screen: ImageView,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(GoalDetailContainer);
