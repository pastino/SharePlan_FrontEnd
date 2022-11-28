import React, { useState, useEffect } from "react";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import contents from "../../contents";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";
import { useMutation } from "react-apollo-hooks";
import { REQUEST_SECRET } from "./AuthQueries";

const FindPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navEmail = navigation.getParam("email");
  const [email, setEmail] = useState(navEmail);
  const [userIdRestrict, setUserIdRestrict] = useState(
    "※ 이메일 형식에 맞게 입력해주세요."
  );

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (reg.test(email) === false) {
      setUserIdRestrict("※ 이메일 형식에 맞게 입력해주세요.");
    } else {
      setUserIdRestrict("");
    }
  }, []);

  const emailOnChange = (text) => {
    setEmail(text);
    if (reg.test(text) === false) {
      setUserIdRestrict("※ 이메일 형식에 맞게 입력해주세요.");
    } else {
      setUserIdRestrict("");
    }
  };

  const [requestSecretMutation] = useMutation(REQUEST_SECRET, {
    variables: {
      email,
    },
  });

  const sendEmail = async () => {
    if (userIdRestrict) {
      Alert.alert("이메일 형식에 맞게 입력해주세요.");
    } else {
      setIsLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      if (requestSecret === "성공") {
        navigation.navigate("FindPasswordSecond", { email });
        Alert.alert("이메일이 발송 되었습니다. 확인 부탁드립니다.");
      } else if (requestSecret === "가입된 이메일이 아닙니다.") {
        Alert.alert("가입된 이메일이 아닙니다. 다시 확인해주세요.");
      } else if (requestSecret === "실패") {
        Alert.alert("이메일 전송이 실패하였습니다. 재전송 부탁드립니다.");
      }
      setIsLoading(false);
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
            height: contents.height,
          }}
        >
          <View style={{ marginTop: contents.height / 5 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 12 }}>
                이메일 주소를 입력 후 버튼을 눌러주세요.
              </Text>
              <Text style={{ fontSize: 12 }}>
                이메일로 비밀번호 재설정 방법을 알려드리겠습니다.
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1, height: contents.height }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ marginBottom: 17 }}>
                    <AuthInput
                      editable={!isLoading}
                      value={email}
                      onChange={emailOnChange}
                      placeholder={"이메일"}
                      keyboardType={"default"}
                      maxLength={40}
                      autoCompleteType={"off"}
                      autoCapitalize={"none"}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: styles.Wine,
                        marginLeft: 10,
                      }}
                    >
                      {userIdRestrict}
                    </Text>
                  </View>

                  <AuthButton
                    text={"비밀번호 찾기"}
                    onPress={() => sendEmail()}
                    loading={isLoading}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FindPassword;
