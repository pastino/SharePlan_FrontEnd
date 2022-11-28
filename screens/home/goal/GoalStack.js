import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, ToastAndroid } from "react-native";
import GoalCreateIndication from "./goalComponents/GoalCreateIndication";
import GoalHeaderView from "./goalComponents/GoalHeaderView";
import BigCategory from "./goalComponents/GoalCategory";
import contents from "../../../contents";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import ExpoIcon from "../../../components/ExpoIcon";
import { NavigationActions } from "react-navigation";

const GoalBody = styled.View`
  margin-bottom: 10px;
`;

const GoalStack = ({ navigation }) => {
  const goalEdit = navigation.getParam("goalEdit");
  const [selectItem, setSelectItem] = useState(false);

  const nextButtonHandle = () => {
    if (selectItem) {
      navigation.navigate("GoalStackTwo", { selectItem, goalEdit });
    } else {
      ToastAndroid.show("카테고리를 선택 해주세요.", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          width: contents.width,
          height: 70,
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              NavigationActions.navigate({
                routeName: "TabNavigation",
                action: NavigationActions.navigate({
                  routeName: "Tab1",
                  action: NavigationActions.navigate({
                    routeName: "HomeDiv",
                    action: NavigationActions.navigate({
                      routeName: "HomeGoal",
                    }),
                  }),
                }),
              })
            )
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExpoIcon name={"chevron-left"} size={37} />
            <Text style={{ fontWeight: "700" }}>이전</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontWeight: "700", fontSize: 15 }}>카테고리 설정</Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          <TouchableOpacity onPress={() => nextButtonHandle()}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>다음</Text>
              <ExpoIcon name={"chevron-right"} size={37} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <GoalBody>
          <GoalCreateIndication indication={1} />
        </GoalBody>
        <BigCategory
          nextButtonHandle={nextButtonHandle}
          selectItem={selectItem}
          setSelectItem={setSelectItem}
        />
      </ScrollView>
    </View>
  );
};

export default GoalStack;
