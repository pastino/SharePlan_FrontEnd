import React, { useState } from "react";
import styled from "styled-components";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import AuthInput from "../../components/AuthInput";
import {
  Keyboard,
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AuthButton from "../../components/AuthButton";
import styles from "../../styles";
import contents from "../../contents";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import ExpoIcon from "../../components/ExpoIcon";

const SingUp = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userIdRestrict, setUserIdRestrict] = useState(
    "※ 이메일 형식에 맞게 입력해주세요."
  );

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(
    "※ 8자리 ~ 20자리 이내로 입력해주세요."
  );
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyPasswordConfirm, setVerifyPasswordConfirm] = useState(
    "※ 비밀번호를 한번 더 입력해주세요."
  );

  const [nickname, setNickName] = useState("");
  const [nicknameConfirm, setNicknameConfirm] = useState(
    "※ 최소 1글자 ~ 최대 12글자 입력해주세요."
  );

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfBirthComment, setDateOfBirthComment] = useState(
    "※ 생년 4자리를 입력해주세요."
  );

  const [gender, setGender] = useState("");
  const [genderConfirm, setGenderConfirm] = useState("※ 성별을 선택해주세요.");

  const userIdOnChange = (text) => {
    setUserId(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setUserIdRestrict("※ 이메일 형식에 맞게 입력해주세요.");
    } else {
      setUserIdRestrict("");
    }
    // 아이디 validation
    // text = text.replace(/[^A-Za-z0-9]/g, "");
    // if (text.length < 6) {
    //   setUserIdRestrict("※ 최소 6글자 ~ 최대 10글자 입력");
    // } else {
    //   setUserIdRestrict("");
    // }
  };

  const passwordOnChange = (text) => {
    setPassword(text);
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

  const verifyPasswordOnChange = (text) => {
    setVerifyPassword(text);
    if (password !== text) {
      setVerifyPasswordConfirm("※ 비밀번호를 한번 더 입력해주세요.");
    } else {
      setVerifyPasswordConfirm("");
    }
  };

  const nicknameOnChange = (text) => {
    setNickName(text);
    if (text.length > 0) {
      setNicknameConfirm("");
    } else {
      setNicknameConfirm("※ 최소 1글자 ~ 최대 8글자 입력해주세요.");
    }
  };

  const dateOfBirthOnChange = (text) => {
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

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      nickname,
      dateOfBirth: parseInt(dateOfBirth),
      userId,
      password,
      gender,
      useTermsPrivacyagreement: isChecked,
    },
  });

  const signUpHandle = async () => {
    if (!isChecked) {
      Alert.alert("이용약관 및 개인정보 처리방침에 동의 후 가입이 가능합니다.");
    } else {
      if (
        userIdRestrict ||
        passwordConfirm ||
        verifyPasswordConfirm ||
        nicknameConfirm ||
        dateOfBirthComment ||
        !gender
      ) {
        Alert.alert("붉은글씨를 확인 후 재입력 해주세요.");
      } else {
        try {
          setIsLoading(true);
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (createAccount === "이미 아이디가 존재합니다.") {
            Alert.alert("이미 해당 이메일이 존재합니다.");
            setIsLoading(false);
          } else if (createAccount === "이미 닉네임이 존재합니다.") {
            Alert.alert("이미 닉네임이 존재합니다.");
            setIsLoading(false);
          } else if (createAccount === "facebook") {
            Alert.alert("이미 Facebook으로 로그인 인증한 아이디입니다.");
            setIsLoading(false);
          } else if (createAccount === "google") {
            Alert.alert("이미 google로 로그인 인증한 아이디입니다.");
            setIsLoading(false);
          } else if (createAccount === "성공") {
            setIsLoading(false);
            navigation.navigate("Login", { userId });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "white",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          marginTop: 50,
        }}
      >
        <View
          style={{
            borderWidth: 0.7,
            borderColor: styles.darkGreyColor,
            width: contents.width / 1.37,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <View>
            <Text style={{ textAlign: "center", fontSize: 10 }}>
              이메일 입력 시 정확하게 입력 부탁드립니다.
            </Text>
            <Text style={{ textAlign: "center", fontSize: 10 }}>
              비밀번호 분실 시 이메일 인증이 필요합니다.
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <View>
                <AuthInput
                  editable={!isLoading}
                  value={userId}
                  onChange={userIdOnChange}
                  placeholder={"이메일"}
                  keyboardType={"email-address"}
                  maxLength={40}
                  autoCompleteType={"off"}
                  autoCapitalize={"none"}
                />
                <View style={{ minHeight: 17, marginTop: 3 }}>
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
              </View>
              {/* <TouchableOpacity onPress={() => userIdDoubleCheck()}>
              <View
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
              </View>
            </TouchableOpacity> */}
            </View>
            <View style={{ marginTop: 7 }}>
              <AuthInput
                editable={!isLoading}
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
              <View style={{ minHeight: 17, marginTop: 3 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: styles.Wine,
                    marginLeft: 10,
                  }}
                >
                  {passwordConfirm}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 7 }}>
              <AuthInput
                editable={!isLoading}
                value={verifyPassword}
                onChange={verifyPasswordOnChange}
                placeholder={"비밀번호 확인"}
                keyboardType={"default"}
                secureTextEntry={true}
                textContentType={"password"}
                maxLength={20}
                autoCompleteType={"off"}
                autoCapitalize={"none"}
              />
              <View style={{ minHeight: 17, marginTop: 3 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: styles.Wine,
                    marginLeft: 10,
                  }}
                >
                  {verifyPasswordConfirm}
                </Text>
              </View>
            </View>
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
                      marginLeft: 10,
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
                marginTop: 7,
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
                    backgroundColor: gender === "남" ? styles.MainColor : null,
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
                    backgroundColor: gender === "여" ? styles.MainColor : null,
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
                    marginLeft: 10,
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
            alignItems: "center",
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
                borderBottomColor: styles.MainColor,
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
                borderBottomColor: styles.MainColor,
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
            marginTop: 20,
          }}
        >
          <AuthButton
            text={"가입하기"}
            onPress={() => signUpHandle()}
            loading={null}
            loading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SingUp;
