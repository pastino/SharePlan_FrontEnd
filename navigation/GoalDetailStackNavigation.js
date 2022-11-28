import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomeGoalStack from "../screens/home/homeGoalScreen/HomeGoalStack";
import HomeGoalStackTwo from "../screens/home/homeGoalScreen/HomeGoalStackTwo";
import styles from "../styles";
import GoalTitle from "../screens/home/homeGoalScreen/GoalsList/GoalTitle";
import GoalPlan from "../screens/home/homeGoalScreen/GoalPlan/GoalPlan";
import HomeGoalHistory from "../screens/home/homeGoalScreen/HomeGoalHistory";
import DownloadView from "../screens/home/homeGoalScreen/Download/DownloadView";

export default createMaterialTopTabNavigator(
  {
    // GoalPlan: {
    //   screen: createStackNavigator({
    //     GoalPlan: {
    //       screen: GoalPlan,
    //       navigationOptions: ({ navigation }) => {
    //         const goalText = navigation.getParam("goalText");
    //         return {
    //           headerTitle: () => (
    //             <GoalTitle goalTapName={"Plan"} goalText={goalText} />
    //           ),
    //           headerStyle: { height: 70 },
    //         };
    //       },
    //     },
    //   }),
    //   navigationOptions: { tabBarLabel: "Plan" },
    // },
    // HomeGoalStackTwo: {
    //   screen: createStackNavigator({
    //     HomeGoalStackTwo: {
    //       screen: HomeGoalStackTwo,
    //       navigationOptions: ({ navigation }) => {
    //         const goalText = navigation.getParam("goalText");
    //         return {
    //           headerTitle: () => (
    //             <GoalTitle goalTapName={"History"} goalText={goalText} />
    //           ),
    //           headerStyle: { height: 70 },
    //         };
    //       },
    //     },
    //   }),
    //   navigationOptions: { tabBarLabel: "History" },
    // },
    // HomeGoalStack: {
    //   screen: createStackNavigator({
    //     HomeGoalStack: {
    //       screen: HomeGoalStack,
    //       navigationOptions: ({ navigation }) => {
    //         const goalText = navigation.getParam("goalText");
    //         return {
    //           headerTitle: () => (
    //             <GoalTitle goalTapName={"Information"} goalText={goalText} />
    //           ),
    //           headerStyle: { height: 70 },
    //         };
    //       },
    //     },
    //   }),
    //   navigationOptions: {
    //     tabBarLabel: "Information",
    //   },
    // },
    HomeGoalHistory: {
      screen: createStackNavigator({
        HomeGoalHistory: {
          screen: HomeGoalHistory,
          navigationOptions: ({ navigation }) => {
            const id = navigation.getParam("id");
            const division = navigation.getParam("division");
            const goalText = navigation.getParam("goalText");
            return {
              headerTitle: () => (
                <GoalTitle goalTapName={"History"} goalText={goalText} />
              ),
              headerStyle: { height: 70 },
            };
          },
        },
      }),
      navigationOptions: {
        tabBarLabel: "History",
      },
    },
    DownloadView: {
      screen: createStackNavigator({
        DownloadView: {
          screen: DownloadView,
          navigationOptions: ({ navigation }) => {
            const goalText = navigation.getParam("goalText");
            return {
              headerShown: false,
            };
          },
        },
      }),
      navigationOptions: {
        tabBarLabel: "Download",
      },
    },
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      style: { backgroundColor: styles.MainColor },
      indicatorStyle: { backgroundColor: "blue" },
      labelStyle: { fontWeight: "700" },
      indicatorStyle: { backgroundColor: "#ffc600" },
    },
  }
);
