import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import ExpoIcon from "../ExpoIcon";
import PropTypes from "prop-types";

const CalendarIcon = ({ size = 30, color }) => (
  <View>
    <ExpoIcon name={"calendar-plus"} size={size} color={color} />
  </View>
);

CalendarIcon.propTypes = {
  size: PropTypes.number
};

export default CalendarIcon;
