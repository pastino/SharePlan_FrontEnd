import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, ToastAndroid } from "react-native";
import GoalCreateIndication from "./goalComponents/GoalCreateIndication";
import GoalHeaderView from "./goalComponents/GoalHeaderView";
import GoalCategoryDetail from "./goalComponents/GoalCategoryDetail";
import contents from "../../../contents";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import ExpoIcon from "../../../components/ExpoIcon";

const GoalBody = styled.View`
  margin-bottom: 10px;
`;

const GoalStackTwo = ({ navigation }) => {
  const goalEdit = navigation.getParam("goalEdit");
  const [selectItem, setSelectItem] = useState(false);
  const selectCategory = navigation.getParam("selectItem");

  const nextButtonHandle = () => {
    if (selectItem) {
      if (goalEdit) {
        navigation.navigate("GoalEdit", { selectCategory, selectItem });
      } else {
        navigation.navigate("GoalStackThree", { selectCategory, selectItem });
      }
    } else {
      ToastAndroid.show("카테고리를 선택 해주세요.", ToastAndroid.SHORT);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <GoalHeaderView
        navigation={navigation}
        headerText={"상세 카테고리 설정"}
        onPress={() => navigation.navigate("GoalStack")}
      /> */}
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
        <TouchableOpacity onPress={() => navigation.navigate("GoalStack")}>
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
        <Text style={{ fontWeight: "700", fontSize: 15 }}>
          상세 카테고리 설정
        </Text>
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
          <GoalCreateIndication indication={2} />
        </GoalBody>
        <GoalCategoryDetail
          navigation={navigation}
          goalEdit={goalEdit}
          selectItem={selectItem}
          setSelectItem={setSelectItem}
          selectCategory={selectCategory}
        />
      </ScrollView>
    </View>
  );
};

export default GoalStackTwo;
