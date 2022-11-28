import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Home";
import HomeGoal from "../screens/HomeGoal";
import styles from "../styles";
import ExpoIcon from "../components/ExpoIcon";
import { View, Text } from "react-native";

export default createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ExpoIcon name={"format-list-bulleted"} size={20} />
            <Text
              style={{
                color: styles.darkGreyColor,
                fontSize: 7,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              해야할 일
            </Text>
          </View>
        ),
      },
    },
    HomeGoal: {
      screen: HomeGoal,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ExpoIcon name={"bullseye-arrow"} size={20} />
            <Text
              style={{
                color: styles.darkGreyColor,
                fontSize: 7,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              나의 목표
            </Text>
          </View>
        ),
      },
    },
  },
  {
    tabBarPosition: "top",
    tabBarOptions: {
      style: { backgroundColor: "white", height: 50 },
      indicatorStyle: { backgroundColor: "blue" },
      labelStyle: { fontWeight: "700", color: "black" },
      indicatorStyle: {
        backgroundColor: "black",
      },
    },
  }
);
