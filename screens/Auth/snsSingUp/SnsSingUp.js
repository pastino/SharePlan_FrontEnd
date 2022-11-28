import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
import contents from "../../../contents";
import AuthInput from "../../../components/AuthInput";
import { useMutation } from "react-apollo-hooks";
import { SNS_CREATE_USER } from "../AuthQueries";
import styles from "../../../styles";
import ExpoIcon from "../../../components/ExpoIcon";
import AuthButton from "../../../components/AuthButton";
import { useLogIn } from "../../../AuthContext";

const SnsSingUp = ({ navigation }) => {
  const email = navigation.getParam("email");
  const name = navigation.getParam("name");
  const initialNickname = navigation.getParam("nickname");
  const snsLogin = navigation.getParam("snsLogin");
  const [nickname, setNickName] = useState(initialNickname);

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logIn = useLogIn();

  const [nicknameConfirm, setNicknameConfirm] = useState(
    "※ 최소 1글자 ~ 최대 12글자 입력해주세요."
  );

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfBirthComment, setDateOfBirthComment] = useState(
    "※ 생년 4자리를 입력해주세요."
  );

  const [gender, setGender] = useState("");
  const [genderConfirm, setGenderConfirm] = useState("※ 성별을 선택해주세요.");

  const nicknameOnChange = text => {
    setNickName(text);
    if (text.length > 0) {
      setNicknameConfirm("");
    } else {
      setNicknameConfirm("※ 최소 1글자 ~ 최대 12글자 입력해주세요.");
    }
  };

  useEffect(() => {
    if (nickname.length > 0) {
      setNicknameConfirm("");
    }
  }, []);

  const dateOfBirthOnChange = text => {
    setDateOfBirth(text);
    setDateOfBirthComment(
      text.length === 3
        ? text.split("")[0] != 1 && text.split("")[0] != 2
          ? "※ 첫번째 숫자는 1 또는 2를 입력해주세요"
          : text.split("")[1] != 0 && text.split("")[1] != 9
          ? "※ 두번째 숫자는 0 또는 9를 입력해주세요"
          : text.length === 2
          ? "※ 생년 4자리를 입력해주세요."
          : text.length === 3
          ? "※ 생년 4자리를 입력해주세요."
          : ""
        : "※ 생년 4자리를 입력해주세요."
    );

    setDateOfBirthComment(
      text.length !== 4 && text.split("")[0] != 1 && text.split("")[0] != 2
        ? "※ 첫번째 자리는 1 또는 2를 입력해주세요"
        : text.length !== 4 && text.split("")[1] != 0 && text.split("")[1] != 9
        ? "※ 두번째 자리는 0 또는 9를 입력해주세요"
        : text > 2019
        ? "※ 2020년 이전으로 입력해주세요."
        : text.length !== 4
        ? "※ 생년 4자리를 입력해주세요."
        : ""
    );
  };

  const [createAccountMutation] = useMutation(SNS_CREATE_USER, {
    variables: {
      nickname,
      dateOfBirth: parseInt(dateOfBirth),
      userId: email,
      gender,
      useTermsPrivacyagreement: isChecked,
      snsLogin
    }
  });

  const signUpHandle = async () => {
    if (!isChecked) {
      Alert.alert("이용약관 및 개인정보 처리방침에 동의 후 가입이 가능합니다.");
    } else {
      if (nicknameConfirm || dateOfBirthComment || !gender) {
        Alert.alert("붉은글씨를 확인 후 재입력 해주세요.");
      } else {
        try {
          setIsLoading(true);
          const {
            data: { snsCreateAccount }
          } = await createAccountMutation();
          if (snsCreateAccount === "이미 닉네임이 존재합니다.") {
            Alert.alert("이미 닉네임이 존재합니다.");
            setIsLoading(false);
          } else {
            setIsLoading(false);
            if (snsCreateAccount !== "") {
              logIn(snsCreateAccount);
            }
          }
        } catch (e) {
          console.log(e);
        }
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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginBottom: 120
            }}
          >
            <View style={{ marginBottom: 30 }}>
              <Text style={{ fontSize: 12 }}>
                정보 추가사항을 입력해주시면 감사하겠습니다.
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.7,
                borderColor: styles.darkGreyColor,
                width: contents.width / 1.37,
                height: contents.height / 3,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <View>
                <Text style={{ fontSize: 10, marginBottom: 7 }}>
                  닉네임은 다른 이름으로 변경 가능합니다.
                </Text>
              </View>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ marginTop: 7, flexDirection: "row" }}>
                  <View style={{}}>
                    <AuthInput
                      editable={!isLoading}
                      value={nickname}
                      onChange={nicknameOnChange}
                      placeholder={"닉네임"}
                      keyboardType={"default"}
                      maxLength={12}
                      autoCompleteType={"off"}
                      autoCapitalize={"none"}
                    />
                    <View style={{ minHeight: 17, marginTop: 3 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.Wine,
                          marginLeft: 10
                        }}
                      >
                        {nicknameConfirm}
                      </Text>
                    </View>
                  </View>
                  {/* <View
            style={{
              marginLeft: 10,
              width: contents.width / 5,
              height: contents.height / 20,
              borderRadius: 10,
              backgroundColor: styles.darkGreyColor,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white" }}>중복확인</Text>
          </View> */}
                </View>
                <View style={{ marginTop: 7 }}>
                  <AuthInput
                    editable={!isLoading}
                    value={dateOfBirth}
                    onChange={dateOfBirthOnChange}
                    placeholder={"태어난 해    ex.1988"}
                    keyboardType={"number-pad"}
                    maxLength={4}
                    autoCompleteType={"off"}
                    autoCapitalize={"none"}
                  />
                </View>
                <View style={{ minHeight: 17, marginBottom: 10 }}>
                  <Text
                    style={{ fontSize: 10, color: styles.Wine, marginLeft: 10 }}
                  >
                    {dateOfBirthComment}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <View>
                <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
                  성별
                </Text>
                <View
                  style={{
                    width: contents.width / 1.9,
                    borderWidth: 1,
                    borderColor: styles.darkGreyColor,
                    flexDirection: "row",
                    height: contents.height / 20,
                    borderRadius: 10,
                    marginTop: 7
                  }}
                >
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={() => setGender("남")}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: contents.width / 1.9 / 2,
                        height: contents.height / 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderRightWidth: 1,
                        borderRightColor: styles.darkGreyColor,
                        backgroundColor:
                          gender === "남" ? styles.MainColor : null
                      }}
                    >
                      <Text style={{ color: gender === "남" ? "white" : null }}>
                        남
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={() => setGender("여")}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: contents.width / 1.9 / 2,
                        height: contents.height / 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor:
                          gender === "여" ? styles.MainColor : null
                      }}
                    >
                      <Text style={{ color: gender === "여" ? "white" : null }}>
                        여
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  {!gender ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: styles.Wine,
                        marginLeft: 10
                      }}
                    >
                      ※ 성별을 선택해주세요.
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ marginRight: 10 }}>
                {isChecked ? (
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <ExpoIcon name={"checkbox-marked"} size={27} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <ExpoIcon name={"checkbox-blank-outline"} size={27} />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={{ fontSize: 12 }}>회원가입 시 &nbsp;</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SingUpUseTerm")}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: styles.MainColor,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.MainColor
                  }}
                >
                  이용약관
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12 }}>, &nbsp;</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpPrivacyPolicy")}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: styles.MainColor,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.MainColor
                  }}
                >
                  개인정보 처리방침
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12 }}>에 동의합니다.</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
              }}
            >
              <AuthButton
                text={"로그인"}
                onPress={() => signUpHandle()}
                loading={null}
                loading={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SnsSingUp;
