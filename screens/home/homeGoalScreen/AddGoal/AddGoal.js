import React from "react";
import styled from "styled-components";
import ExpoIcon from "../../../../components/ExpoIcon";
import contents from "../../../../contents";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ToastAndroid } from "react-native";

const AddGoalContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${contents.width / 1.2};
  height: ${contents.height / 4.2};
  border-radius: 20px;
  background-color: #7c66cc;
`;

const AddGoalText = styled.Text`
  position: absolute;
  top: 10px;
  left: 15px;
  font-weight: 700;
  color: white;
`;

const AddGoal = ({ navigation, goalLength }) => {
  const addGoalHandle = () => {
    if (goalLength >= 5) {
      ToastAndroid.show(
        "목표카드는 5개를 초과할 수 없습니다.",
        ToastAndroid.SHORT
      );
    } else {
      navigation.navigate("GoalStack");
    }
  };
  return (
    <TouchableOpacity onPress={() => addGoalHandle()}>
      <AddGoalContainer>
        <AddGoalText>나의 목표</AddGoalText>
        <ExpoIcon name={"plus-circle-outline"} color={"white"} size={40} />
      </AddGoalContainer>
    </TouchableOpacity>
  );
};

export default AddGoal;
