import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";
import contents from "../../contents";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";
import ExpoIcon from "../../components/ExpoIcon";

export default ({ navigation }) => {
  const userId = navigation.getParam("userId");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(userId);
  const [userIdRestrict, setUserIdRestrict] = useState(
    "※ 이메일 형식에 맞게 입력해주세요."
  );

  const savedUserId = async () => {
    if (!userId) {
      const savedUserId = await AsyncStorage.getItem("userId");
      if (savedUserId) {
        setValue(savedUserId);
      }
    }
  };

  useEffect(() => {
    savedUserId();
  }, []);

  const [password, setPassword] = useState("");
  const onChange = (text) => {
    setValue(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setUserIdRestrict("※ 이메일 형식에 맞게 입력해주세요.");
    } else {
      setUserIdRestrict("");
    }
  };
  const passwordOnChange = (text) => setPassword(text);
  const logIn = useLogIn();

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      userId: value,
      password,
    },
  });

  const handleLogin = async () => {
    if (value === "") {
      return Alert.alert("아이디를 입력해주세요.");
    } else if (value === " ") {
      return Alert.alert("띄어쓰기를 없애주세요.");
    } else if (password === "") {
      return Alert.alert("비밀번호를 입력해주세요.");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret === "비밀번호가 맞지 않습니다.") {
        Alert.alert("비밀번호가 맞지 않습니다.");
      } else if (confirmSecret === "등록된 아이디가 아닙니다.") {
        Alert.alert("등록된 아이디가 아닙니다.");
      } else if (confirmSecret === "facebook") {
        Alert.alert("Facebook으로 인증한 아이디 입니다.");
      } else if (confirmSecret === "google") {
        Alert.alert("google로 인증한 아이디 입니다.");
      } else {
        if (confirmSecret !== "") {
          logIn(confirmSecret, value);
        }
      }
    } catch (e) {
      Alert.alert("등록된 아이디가 아닙니다.");
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flexGrow: 1,
      }}
    >
      <View style={{ marginTop: contents.height / 3.7, flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, height: contents.height }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <AuthInput
                  value={value}
                  onChange={onChange}
                  placeholder={"이메일"}
                  keyboardType={"default"}
                  maxLength={40}
                  autoCompleteType={"off"}
                  autoCapitalize={"none"}
                />
                {/* <View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.Wine,
                          marginLeft: 10
                        }}
                      >
                        {userIdRestrict}
                      </Text>
                    </View> */}
              </View>
              <View style={{ marginBottom: 17 }}>
                <AuthInput
                  value={password}
                  onChange={passwordOnChange}
                  placeholder={"비밀번호"}
                  keyboardType={"default"}
                  secureTextEntry={true}
                  textContentType={"password"}
                  maxLength={20}
                  autoCompleteType={"off"}
                  autoCapitalize={"none"}
                />
              </View>
              <AuthButton
                text={"로그인"}
                onPress={() => handleLogin()}
                loading={loading}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FindPassword", { email: value })
                }
              >
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: styles.darkGreyColor,
                    color: styles.darkGreyColor,
                  }}
                >
                  비밀번호를 분실하셨나요?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};
