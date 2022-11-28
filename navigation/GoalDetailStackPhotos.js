import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import styles from "../styles";
import SelectPhoto from "../screens/home/homeGoalScreen/GoalsList/InformationCreate/SelectPhoto";
import TakePhoto from "../screens/home/homeGoalScreen/GoalsList/InformationCreate/TakePhoto";

export default createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: createStackNavigator({
        SelectPhoto: {
          screen: SelectPhoto,
          navigationOptions: { headerStyle: { height: 60 } }
        }
      }),
      navigationOptions: {
        tabBarLabel: "저장된 이미지 업로드"
      }
    },
    TakePhoto: {
      screen: createStackNavigator({
        TakePhoto: {
          screen: TakePhoto,
          navigationOptions: { headerStyle: { height: 60 } }
        }
      }),
      navigationOptions: { tabBarLabel: "촬영하여 업로드" }
    }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      style: { backgroundColor: "white" },
      indicatorStyle: { backgroundColor: "blue" },
      labelStyle: { fontWeight: "700", color: "black" },
      indicatorStyle: {
        backgroundColor: "black"
      }
    }
  }
);
