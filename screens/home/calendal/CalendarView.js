import React from "react";
import Calendar from "./Calendar";
import { View } from "react-native";
import { SEE_DAYTODO } from "../HomeQueries";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import { ScrollView } from "react-native-gesture-handler";

const CalendarView = ({ navigation }) => {
  const startDayView = navigation.getParam("startDayView");
  const inquiryperiodView = navigation.getParam("inquiryperiodView");
  const inquiryperiodNumberView = navigation.getParam(
    "inquiryperiodNumberView"
  );

  const seeDayToDo = navigation.getParam("data");

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Calendar
          data={seeDayToDo}
          navigation={navigation}
          startDayView={startDayView}
          inquiryperiodView={inquiryperiodView}
          inquiryperiodNumberView={inquiryperiodNumberView}
        />
      </View>
    </ScrollView>
  );
};

export default CalendarView;
