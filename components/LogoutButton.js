import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLogOut } from "../AuthContext";

const LogoutText = styled.Text`
  margin-right: 20px;
`;

const LogoutButton = () => {
  const logOut = useLogOut();
  return (
    <TouchableOpacity onPress={() => logOut()}>
      <LogoutText>로그아웃</LogoutText>
    </TouchableOpacity>
  );
};

export default LogoutButton;
