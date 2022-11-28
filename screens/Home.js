import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import HomeMainScreen from "./home/homeMainScreen/HomeMainScreen";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({
  navigation,
  loading,
  data,
  refetch,
  seeDayToDo,
  toDoLoading,
  toDoRefetch,
}) => {
  const selectDay = navigation.getParam("selectDay");
  const inquiryperiod = navigation.getParam("inquiryperiod");
  const inquiryperiodNumber = navigation.getParam("inquiryperiodNumber");

  const [startDayView, setStartDayView] = useState(
    selectDay === undefined ? new Date() : selectDay
  );

  const [inquiryperiodView, setInquiryperiodView] = useState(
    inquiryperiod === undefined ? "일주일" : inquiryperiod
  );

  const [inquiryperiodNumberView, setinquiryperiodNumberView] = useState(
    inquiryperiodNumber === undefined ? 7 : inquiryperiodNumber
  );

  useEffect(() => {
    if (selectDay !== undefined) {
      setStartDayView(selectDay);
    }
  }, [selectDay]);

  useEffect(() => {
    if (inquiryperiod !== undefined) {
      setInquiryperiodView(inquiryperiod);
    }
  }, [inquiryperiod]);

  useEffect(() => {
    if (inquiryperiodNumber !== undefined) {
      setinquiryperiodNumberView(inquiryperiodNumber);
    }
  }, [inquiryperiodNumber]);

  const onRefresh = async () => {
    try {
      await toDoRefetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <HomeMainScreen
        navigation={navigation}
        goalData={data}
        data={seeDayToDo}
        startDayView={startDayView}
        inquiryperiodView={inquiryperiodView}
        inquiryperiodNumberView={inquiryperiodNumberView}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default Home;
