import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import FindPassword from "../screens/Auth/FindPassword";
import FindPasswordSecond from "../screens/Auth/FindPasswordSecond";
import FindPasswordThird from "../screens/Auth/FindPasswordThird";
import SingUpUseTerm from "../screens/Auth/serviceTerm/SignUpUseTerm";
import SignUpPrivacyPolicy from "../screens/Auth/serviceTerm/SignUpPrivacyPolicy";
import SnsSingUp from "../screens/Auth/snsSingUp/SnsSingUp";
import { View, Text } from "react-native";

const AuthNavigation = createStackNavigator({
  AuthHome: {
    screen: AuthHome,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>로그인</Text>
        </View>
      )
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>계정생성</Text>
        </View>
      )
    }
  },
  FindPassword: {
    screen: FindPassword,
    navigationOptions: {
      headerShown: false
    }
  },
  FindPasswordSecond: {
    screen: FindPasswordSecond,
    navigationOptions: {
      headerShown: false
    }
  },
  FindPasswordThird: {
    screen: FindPasswordThird,
    navigationOptions: {
      headerShown: false
    }
  },
  SingUpUseTerm: {
    screen: SingUpUseTerm,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>이용약관</Text>
        </View>
      )
    }
  },
  SignUpPrivacyPolicy: {
    screen: SignUpPrivacyPolicy,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            개인정보 처리방침
          </Text>
        </View>
      )
    }
  },
  SnsSingUp: {
    screen: SnsSingUp,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default createAppContainer(AuthNavigation);
