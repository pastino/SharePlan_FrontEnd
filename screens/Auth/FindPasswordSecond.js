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
import { SECRET_CONFIRM } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";

const FindPasswordSecond = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navEmail = navigation.getParam("email");
  const [secretKey, setSecretKey] = useState("");

  const secretKeyOnChange = text => {
    setSecretKey(text);
  };

  const [secretConfirmMutation] = useMutation(SECRET_CONFIRM, {
    variables: {
      email: navEmail,
      secret: secretKey
    }
  });

  const secretConfirmHandle = async () => {
    setIsLoading(true);
    const {
      data: { secretConfirm }
    } = await secretConfirmMutation();
    if (secretConfirm === "성공") {
      navigation.navigate("FindPasswordThird", { email: navEmail });
    } else if (secretConfirm === "시크릿 문자가 틀렸습니다.") {
      Alert.alert("잘못 입력하였습니다.");
    }
    setIsLoading(false);
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
                  <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 10, textAlign: "center" }}>
                      이메일로 받으신 시크릿 문자를 확인 후 입력해주세요.
                    </Text>
                    <Text style={{ fontSize: 10, textAlign: "center" }}>
                      확인이 완료되면 비밀번호를 안전하게 변경하실 수 있습니다.
                    </Text>
                  </View>
                  <View style={{ marginBottom: 17 }}>
                    <AuthInput
                      editable={!isLoading}
                      value={secretKey}
                      onChange={secretKeyOnChange}
                      placeholder={"시크릿 문자"}
                      keyboardType={"default"}
                      textContentType={"password"}
                      maxLength={12}
                      autoCompleteType={"off"}
                      autoCapitalize={"none"}
                    />
                  </View>
                  <AuthButton
                    text={"입력 완료"}
                    onPress={() => secretConfirmHandle()}
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
