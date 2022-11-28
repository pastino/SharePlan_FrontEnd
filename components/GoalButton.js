import React from "react";
import styled from "styled-components";
import contents from "../contents";
import Proptypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.rightBlack};
  width: ${contents.width / 3};
  height: ${contents.width / 10};
  border-radius: ${props => props.theme.ButtonInputRadius};
`;

const Text = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 700;
`;

const AuthButton = ({ loading = false, text, onPress }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: Proptypes.bool,
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired
};

export default AuthButton;
