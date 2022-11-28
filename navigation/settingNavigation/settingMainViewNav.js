import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SettingView from "../../screens/Setting/settingStack/SettingView";
import UserProfile from "../../screens/Setting/settingStack/userInfo/UserProfile";
import NoticeView from "../../screens/Setting/settingStack/notice/NoticeView";
import NoticeCreate from "../../screens/Setting/settingStack/notice/NotiveCreate";
import CustomerSupport from "../../screens/Setting/settingStack/customerSupport/CustomerSupport";
import DeleteUser from "../../screens/Setting/settingStack/deleteUser/DeleteUser";
import ServiceTerms from "../../screens/Setting/settingStack/serviceTerms/ServiceTerms";
import UseTerm from "../../screens/Setting/settingStack/serviceTerms/UseTerm";
import PrivacyPolicy from "../../screens/Setting/settingStack/serviceTerms/PrivacyPolicy";
import { View, Text } from "react-native";

const settingMainViewNav = createStackNavigator({
  SettingView: {
    screen: SettingView,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>설정</Text>
        </View>
      )
    }
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>계정관리</Text>
        </View>
      )
    }
  },
  NoticeView: {
    screen: NoticeView,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>공지사항</Text>
        </View>
      )
    }
  },
  NoticeCreate: {
    screen: NoticeCreate,
    navigationOptions: {
      headerShown: true
    }
  },
  CustomerSupport: {
    screen: CustomerSupport,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            고객지원/기능제안
          </Text>
        </View>
      )
    }
  },
  ServiceTerms: {
    screen: ServiceTerms,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>서비스 약관</Text>
        </View>
      )
    }
  },
  UseTerm: {
    screen: UseTerm,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>이용약관</Text>
        </View>
      )
    }
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
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
  DeleteUser: {
    screen: DeleteUser,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>회원탈퇴</Text>
        </View>
      )
    }
  }
});

export default createAppContainer(settingMainViewNav);
