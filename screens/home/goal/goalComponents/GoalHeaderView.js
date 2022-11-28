import React from "react";
import styled from "styled-components";
import contents from "../../../../contents";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExpoIcon from "../../../../components/ExpoIcon";
import PropTypes from "prop-types";

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${contents.height / 15};
  background-color: white;
  padding-left: 10px;
`;
const HeaderText = styled.Text`
  margin-left: 10px;
  font-weight: 700;
`;

const GoalHeaderView = ({ headerText, onPress }) => {
  return (
    <HeaderView>
      <TouchableOpacity onPress={onPress}>
        <ExpoIcon name={"arrow-left"} />
      </TouchableOpacity>
      <HeaderText>{headerText}</HeaderText>
    </HeaderView>
  );
};

GoalHeaderView.propTypes = {
  headerText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default GoalHeaderView;
