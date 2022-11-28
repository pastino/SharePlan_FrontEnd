import React from "react";
import { View, Text } from "react-native";
import contents from "../../../contents";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import styles from "../../../styles";
import { useLogOut } from "../../../AuthContext";

const SettingView = ({ navigation }) => {
  const userId = navigation.getParam("userId");
  const avatar = navigation.getParam("avatar");
  const nickname = navigation.getParam("nickname");
  const gender = navigation.getParam("gender");
  const dateOfBirth = navigation.getParam("dateOfBirth");
  const logOut = useLogOut();

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserProfile", {
              avatar,
              nickname,
              gender,
              dateOfBirth,
              userId
            })
          }
        >
          <View
            style={{
              width: contents.width,
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingLeft: 10
            }}
          >
            <Text style={{ color: styles.darkGreyColor }}>계정관리</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("NoticeView", { userId })}
        >
          <View
            style={{
              width: contents.width,
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingLeft: 10
            }}
          >
            <Text style={{ color: styles.darkGreyColor }}>공지사항</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CustomerSupport", { userId })}
        >
          <View
            style={{
              width: contents.width,
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingLeft: 10
            }}
          >
            <Text style={{ color: styles.darkGreyColor }}>
              고객지원/기능제안
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ServiceTerms")}>
          <View
            style={{
              width: contents.width,
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingLeft: 10
            }}
          >
            <Text style={{ color: styles.darkGreyColor }}>
              개인정보 처리방침 및 이용약관
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logOut()}>
          <View
            style={{
              width: contents.width,
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingLeft: 10
            }}
          >
            <Text style={{ color: styles.darkGreyColor }}>로그아웃</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DeleteUser")}>
          <View
            style={{
              width: contents.width,
              height: 50,
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingLeft: 10
            }}
          >
            <Text style={{ color: styles.darkGreyColor }}>회원탈퇴</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingView;
