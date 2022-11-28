import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePikerModal = ({
  date,
  mode,
  show,
  onDateChange,
  setSelectedTime,
  minimumDate,
  maxDate,
}) => {
  return (
    <View>
      {show && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          minimumDate={minimumDate}
          maximumDate={maxDate}
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => {
            onDateChange(event, selectedDate);
            if (mode === "time") setSelectedTime(true);
          }}
        />
      )}
    </View>
  );
};

export default DatePikerModal;
