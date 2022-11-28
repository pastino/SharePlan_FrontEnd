import React, { useState } from "react";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
  Text,
  SafeAreaView
} from "react-native";
import contents from "../../contents";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CAHNGE_PASSWORD } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import styles from "../../styles";

const FindPasswordSecond = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(
    "※ 8자리 ~ 20자리 이내로 입력해주세요."
  );

  const [newPasswordVerify, setNewPasswordVerify] = useState("");
  const [verifyPasswordConfirm, setVerifyPasswordConfirm] = useState(
    "※ 비밀번호를 한번 더 입력해주세요."
  );

  const email = navigation.getParam("email");

  const newPasswordOnChange = text => {
    setNewPassword(text);
    var num = text.search(/[0-9]/g);
    var eng = text.search(/[a-z]/gi);
    var spe = text.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    if (text.length < 8 || text.length > 20) {
      setPasswordConfirm("※ 8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    } else if (text.search(/\s/) != -1) {
      setPasswordConfirm("※ 비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      setPasswordConfirm("※ 영문,숫자,특수문자를 혼합 입력해주세요.");
      return false;
    } else {
      setPasswordConfirm("");
      return true;
    }
  };

  const newPasswordVerifyOnChange = text => {
    setNewPasswordVerify(text);
    if (newPassword !== text) {
      setVerifyPasswordConfirm("※ 비밀번호를 한번 더 입력해주세요.");
    } else {
      setVerifyPasswordConfirm("");
    }
  };

  const [changePasswordMutation] = useMutation(CAHNGE_PASSWORD, {
    variables: {
      userId: email,
      password: newPassword
    }
  });

  const changePasswordHandle = async () => {
    if (passwordConfirm || verifyPasswordConfirm) {
      Alert.alert("붉은글씨 확인 후 재입력 해주세요.");
    } else {
      setIsLoading(true);
      const {
        data: { changePassword }
      } = await changePasswordMutation();
      if (changePassword === "비밀번호 변경 완료") {
        Alert.alert("비밀번호 변경이 완료되었습니다.");
        setIsLoading(false);
        navigation.navigate("Login", { userId: email });
      } else {
        Alert.alert("비밀번호 변경에 실패하였습니다.");
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={{ height: contents.height }}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: contents.height
          }}
        >
          <View style={{ marginTop: contents.height / 3.7 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1, height: contents.height }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                  }}
                >
                  <View style={{ marginBottom: 10 }}>
                    <AuthInput
                      editable={!isLoading}
                      value={newPassword}
                      onChange={newPasswordOnChange}
                      placeholder={"변경하실 비밀번호"}
                      keyboardType={"default"}
                      secureTextEntry={true}
                      textContentType={"password"}
                      maxLength={20}
                      autoCompleteType={"off"}
                      autoCapitalize={"none"}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.Wine,
                          marginLeft: 10
                        }}
                      >
                        {passwordConfirm}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <AuthInput
                      editable={!isLoading}
                      value={newPasswordVerify}
                      onChange={newPasswordVerifyOnChange}
                      placeholder={"변경 비밀번호 확인"}
                      keyboardType={"default"}
                      secureTextEntry={true}
                      textContentType={"password"}
                      maxLength={20}
                      autoCompleteType={"off"}
                      autoCapitalize={"none"}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.Wine,
                          marginLeft: 10
                        }}
                      >
                        {verifyPasswordConfirm}
                      </Text>
                    </View>
                  </View>
                  <AuthButton
                    text={"비밀번호 변경"}
                    onPress={() => changePasswordHandle()}
                    loading={isLoading}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                ></View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FindPasswordSecond;
