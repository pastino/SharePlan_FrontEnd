import React from "react";
import { Image, View, TouchableOpacity, Alert, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Feed from "../screens/Feed";
import Talk from "../screens/Talk";
import Settings from "../screens/Settings";
import CalendarCreateToDo from "../screens/CalendarCreateToDo";
import CreateToDo from "../screens/CreateToDo";
import ExpoIcon from "../components/ExpoIcon";
import HomeDivisionNav from "./HomeDivisionNav";
import HomeDiv from "../screens/HomeDiv";
import styles from "../styles";
import ClockContainer from "../screens/home/clock/ClockContainer";
import GoalScreen from "../screens/home/goal/GoalScreen";
import contents from "../contents";
import { useQuery } from "react-apollo-hooks";
import { SEE_DAYTODO } from "../screens/home/HomeQueries";
import HistoryTab from "../screens/HistoryTab";

const screens = {
  Tab1: {
    screen: HomeDiv,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <ExpoIcon
          name={"home"}
          color={focused ? "black" : styles.darkGreyColor}
          focused={focused}
          size={30}
        />
      ),
      tabBarLabel: ({ focused }) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 10,
              color: focused ? "black" : styles.darkGreyColor,
              fontWeight: focused ? "700" : null,
            }}
          >
            홈
          </Text>
        </View>
      ),
    },
  },
  Tab2: {
    screen: Feed,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <ExpoIcon
          name={"magnify"}
          color={focused ? "black" : styles.darkGreyColor}
          focused={focused}
          size={30}
        />
      ),
      tabBarLabel: ({ focused }) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 10,
              color: focused ? "black" : styles.darkGreyColor,
              fontWeight: focused ? "700" : null,
            }}
          >
            목표찾기
          </Text>
        </View>
      ),
    },
  },
  // Tab3: {
  //   screen: CalendarCreateToDo,
  //   navigationOptions: {
  //     tabBarIcon: ({ focused }) => (
  //       <View
  //         style={{
  //           flex: 1,
  //           flexDirection: "column",
  //         }}
  //       >
  //         <View
  //           style={{
  //             alignSelf: "center",
  //             backgroundColor: styles.lightGreyColor,
  //             justifyContent: "center",
  //             alignItems: "center",
  //             width: 50,
  //             height: 50,
  //             marginTop: 5,
  //             zIndex: 10,
  //             shadowColor: "#000",
  //             shadowOffset: { width: 0, height: 2 },
  //             shadowOpacity: 0.8,
  //             shadowRadius: 2,
  //             elevation: 1,
  //             borderRadius: 7,
  //             borderWidth: 1,
  //             borderColor: "#ddd",
  //             borderBottomWidth: 0,
  //           }}
  //         >
  //           <ExpoIcon
  //             name={"calendar-plus"}
  //             color={styles.darkGreyColor}
  //             containerStyle={{ alignSelf: "center" }}
  //             reverse
  //             size={28}
  //           />
  //         </View>
  //       </View>
  //     ),
  //     tabBarLabel: ({ focused }) => (
  //       <View style={{ justifyContent: "center", alignItems: "center" }}></View>
  //     ),
  //   },
  // },
  Tab3: {
    screen: CreateToDo,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              backgroundColor: styles.lightGreyColor,
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              marginTop: 5,
              zIndex: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: "#ddd",
              borderBottomWidth: 0,
            }}
          >
            <ExpoIcon
              name={"plus"}
              color={styles.darkGreyColor}
              containerStyle={{ alignSelf: "center" }}
              reverse
              size={28}
            />
          </View>
        </View>
      ),
      tabBarLabel: ({ focused }) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}></View>
      ),
    },
  },
  Tab4: {
    screen: HistoryTab,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <ExpoIcon
          name={"book-open"}
          focused={focused}
          color={focused ? "black" : styles.darkGreyColor}
          size={25}
        />
      ),
      tabBarLabel: ({ focused }) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 10,
              color: focused ? "black" : styles.darkGreyColor,
              fontWeight: focused ? "700" : null,
            }}
          >
            히스토리
          </Text>
        </View>
      ),
    },
  },
  Tab5: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <ExpoIcon
          name={"account"}
          focused={focused}
          color={focused ? "black" : styles.darkGreyColor}
          size={30}
        />
      ),
      tabBarLabel: ({ focused }) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 10,
              color: focused ? "black" : styles.darkGreyColor,
              fontWeight: focused ? "700" : null,
            }}
          >
            프로필
          </Text>
        </View>
      ),
    },
  },
};

const config = {
  headerMode: "none",
  initialRouteName: "Tab1",
  defaultNavigationOptions: {
    tabBarOnPress: (data) => {
      // this is where the magic happens
      const { navigation, defaultHandler } = data;
      // we check to see if the navigation key is going to be on Tab3
      if (navigation.state.key === "Tab3") {
        // if it is we show the ModalScreen by navigating to it
        navigation.navigate("CreateToDo");
      } else {
        // otherwise we call the defaultHandler and navigate to the tab we pressed
        defaultHandler(navigation.state.key);
      }
    },
  },
  tabBarOptions: {
    style: {
      height: 60,
    },
    labelStyle: {
      fontSize: 15,
    },
    showLabel: true,
  },
};

const TabNavigator = createBottomTabNavigator(screens, config);

const stackScreens = {
  Tabs: {
    screen: TabNavigator,
  },
  // CalendarCreateToDo: {
  //   screen: CalendarCreateToDo,
  // },
  CreateToDo: {
    screen: CreateToDo,
  },
};

//we need to set the mode to be modal
const stackConfig = {
  headerMode: "none",
  initialRouteName: "Tabs",
  mode: "modal",
};

const MainNavigator = createStackNavigator(stackScreens, stackConfig);

export default createAppContainer(MainNavigator);

// const stackFactory = (initialRoute, customConfig) =>
//   createStackNavigator({
//     initialRoute: {
//       screen: initialRoute,
//       navigationOptions: {
//         ...customConfig,
//         headerStyle: { height: 70 },
//         headerRightContainerStyle: {
//           width: contents.width / 1.3,
//           marginRight: 10,
//         },
//       },
//     },
//   });

// export default createBottomTabNavigator(
//   {
//     HomeDivisionNav: {
//       screen: createStackNavigator({
//         HomeDivisionNav: {
//           screen: HomeDivisionNav,
//           navigationOptions: {
//             headerShown: false,
//           },
//         },
//       }),
//       screen: stackFactory(HomeDivisionNav, {
//         headerTitle: () => <ClockContainer />,
//         // headerRight: () => <GoalScreen />,
//         headerTintColor: "#000000",
//       }),
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <ExpoIcon
//             name={focused ? "home" : "home-outline"}
//             focused={focused}
//             size={35}
//           />
//         ),
//       },
//     },
// Feed: {
//   screen: stackFactory(Feed),
//   navigationOptions: {
//     tabBarIcon: ({ focused }) => (
//       <ExpoIcon
//         name={focused ? "cards" : "cards-outline"}
//         focused={focused}
//         size={35}
//       />
//     )
//   }
// },
//     Feed: {
//       screen: createStackNavigator({
//         Feed: {
//           screen: Feed,
//           navigationOptions: {
//             headerShown: false,
//           },
//         },
//       }),
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <ExpoIcon
//             name={focused ? "cards" : "cards-outline"}
//             focused={focused}
//             size={35}
//           />
//         ),
//       },
//     },
//     CreateToDo: {
//       screen: createStackNavigator({
//         CreateToDo: {
//           screen: CreateToDo,
//           navigationOptions: {
//             headerShown: false,
//           },
//         },
//       }),
//       navigationOptions: {

//         tabBarIcon: ({ focused }) => (
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "column",
//               backgroundColor: "#f8f4f4",
//             }}
//           >
//             <View
//               style={{
//                 position: "absolute",
//                 alignSelf: "center",
//                 backgroundColor: styles.MainColor,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: 60,
//                 height: 60,
//                 borderRadius: 35,
//                 bottom: 25,
//                 zIndex: 10,
//               }}
//             >
//               <TouchableOpacity onPress={() => Alert.alert("123")}>
//                 <ExpoIcon
//                   name={"plus"}
//                   color={"white"}
//                   containerStyle={{ alignSelf: "center" }}
//                   reverse
//                   size={28}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         ),
//       },
//     },
//     Talk: {
//       screen: createStackNavigator({
//         Talk: {
//           screen: Talk,
//           navigationOptions: {
//             headerShown: false,
//           },
//         },
//       }),
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <ExpoIcon
//             name={focused ? "pencil-box" : "pencil-box-outline"}
//             focused={focused}
//             size={35}
//           />
//         ),
//       },
//     },
//     Settings: {
//       screen: stackFactory(Settings, {
//         headerTitle: () => (
//           <Image
//             resizeMode={"contain"}
//             source={require("../assets/hongicLogo.png")}
//             style={{
//               width: 57,
//               height: 57,
//             }}
//           />
//         ),
//       }),
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <ExpoIcon
//             name={focused ? "account" : "account-outline"}
//             focused={focused}
//             size={35}
//           />
//         ),
//       },
//     },
//   },
//   {
//     initialRouteName: "HomeDivisionNav",
//     tabBarOptions: {
//       style: {
//         height: 60,
//       },
//       labelStyle: {
//         fontSize: 15,
//       },
//       showLabel: false,
//     },
//   }
// );
