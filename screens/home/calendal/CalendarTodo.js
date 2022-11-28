import React from "react";
import styled from "styled-components";
import ExpoIcon from "../../../components/ExpoIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import contents from "../../../contents";
import styles from "../../../styles";
import InputModal from "./data/InputModal";

const ToDoView = styled.View`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;
const ToDoHeader = styled.View`
  display: flex;
  flex-direction: row;
`;
const ToDoDay = styled.Text``;
const ToDoAdd = styled.Text`
  color: #be2333;
`;

const CalendarTodo = ({
  month,
  day,
  data,
  dayOfWeekday,
  isImportWhether,
  setIsImportWhether,
  isModalVisible,
  setIsModalVisible,
  value,
  setValue,
  input,
  createToDoMutation,
  monthDay,
}) => {
  // Event
  const onPressHandle = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <ToDoView>
      <TouchableOpacity onPress={() => onPressHandle()}>
        <ToDoHeader
          style={{
            width: contents.width / 1.15,
            height: contents.height / 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundColor: styles.MainColor,
          }}
        >
          <ToDoDay
            style={{
              fontSize: 10,
              position: "absolute",
              left: 7,
              top: 5,
              color: "white",
            }}
          >
            {month + 1}월&nbsp;
            {day}일&nbsp;
            {dayOfWeekday}
          </ToDoDay>

          <ToDoAdd>
            <ExpoIcon name={"plus-circle-outline"} color={"white"} />
          </ToDoAdd>
        </ToDoHeader>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <InputModal
          headerText={"할일 추가"}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          onPressHandle={onPressHandle}
          input={input}
          buttonText={"저장"}
          month={month}
          day={day}
          isImportWhether={isImportWhether}
          setIsImportWhether={setIsImportWhether}
          mutation={createToDoMutation}
          value={value}
          setValue={setValue}
          placeholder={"할 일을 입력하세요"}
          isVisible={isModalVisible}
          transparent={true}
          onBackdropPress={() => {
            setIsModalVisible(!isModalVisible);
          }}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}
        />
      </View>
    </ToDoView>
  );
};

export default CalendarTodo;
