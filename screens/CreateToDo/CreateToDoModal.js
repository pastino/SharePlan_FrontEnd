import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DatePikerModal from "../../components/DatePickerModal";
import styles from "../../styles";
import AlarmModal from "./Modal/AlarmModal";
import ColorModal from "./Modal/ColorModal";
import GoalSelectModal from "./Modal/GoalSelectModal";

const CreateToDoModal = ({
  date,
  mode,
  show,
  onDateChange,
  setSelectedTime,
  alarmModalVisible,
  setAlarmModalVisible,
  alarmTimeArray,
  setAlarmTimeArray,
  selectedAlarmHandle,
  setColorModalVisible,
  colorModalVisible,
  selectedColor,
  setSelectedColor,
  minimumDate,
  maxDate,
  goalModalVisible,
  setGoalModalVisible,
  selectGoal,
  setSelectGoal,
  selectGoalStageHandle,
  confirmAlarm,
  data,
  loading,
  alarmView,
  navigation,
}) => {
  return (
    <View>
      <GoalSelectModal
        goalModalVisible={goalModalVisible}
        setGoalModalVisible={setGoalModalVisible}
        selectGoal={selectGoal}
        setSelectGoal={setSelectGoal}
        selectGoalStageHandle={selectGoalStageHandle}
        data={data}
        loading={loading}
        navigation={navigation}
      />
      <DatePikerModal
        date={date}
        mode={mode}
        show={show}
        onDateChange={onDateChange}
        setSelectedTime={setSelectedTime}
        minimumDate={minimumDate}
        maxDate={maxDate}
      />
      <AlarmModal
        alarmModalVisible={alarmModalVisible}
        setAlarmModalVisible={setAlarmModalVisible}
        alarmTimeArray={alarmTimeArray}
        setAlarmTimeArray={setAlarmTimeArray}
        selectedAlarmHandle={selectedAlarmHandle}
        confirmAlarm={confirmAlarm}
        alarmView={alarmView}
      />
      <ColorModal
        setColorModalVisible={setColorModalVisible}
        colorModalVisible={colorModalVisible}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </View>
  );
};

export default CreateToDoModal;
