import React, { useState } from "react";
import BasicFlatList from "../calendal/data/BasicFlatList";

const ToDoList = ({
  navigation,
  data,
  goalData,
  startDayView,
  inquiryperiodNumberView,
  onRefresh,
  meData,
}) => {
  const input = React.createRef();

  return (
    <BasicFlatList
      data={data}
      input={input}
      goalData={goalData}
      navigation={navigation}
      completeRoute={"home"}
      startDayView={startDayView}
      inquiryperiodNumberView={inquiryperiodNumberView}
      onRefresh={onRefresh}
      meData={meData}
    />
  );
};

export default ToDoList;
