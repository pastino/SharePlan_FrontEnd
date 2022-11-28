import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import contents from "../contents";

const Container = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.blueColor};
  width: ${contents.width / 1.9};
  height: ${contents.width / 10};
  border-radius: ${props => props.theme.ButtonInputRadius};
  margin-left: 15px;
`;
const TodayText = styled.Text`
  position: absolute;
  font-size: 13px;
  top: 2px;
  left: 8px;
  color: white;
`;
const WakeUpTime = styled.Text`
  font-size: 25px;
  color: white;
  padding-left: 10px;
`;
const ClockText = styled.Text`
  padding-right: 10px;
  color: white;
`;

const YearMonthDay = styled.Text`
  position: absolute;
  bottom: 1px;
  right: 3px;
  font-size: 10px;
  color: white;
`;

const WakeUpButton = ({ printTime, printDay, printMonth, printYear }) => (
  <Container>
    <TodayText>Today</TodayText>
    <WakeUpTime>{printTime}</WakeUpTime>
    <ClockText>시 기상</ClockText>
    <YearMonthDay>
      {printYear}.{printMonth}.{printDay}
    </YearMonthDay>
  </Container>
);

WakeUpButton.propTypes = {
  printTime: PropTypes.number,
  printDay: PropTypes.number,
  printMonth: PropTypes.number,
  printYear: PropTypes.number
};

export default WakeUpButton;
