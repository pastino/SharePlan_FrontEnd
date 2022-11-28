import React, { useState } from "react";
import { View, Text, Alert, ToastAndroid } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "../../../../styles";
import contents from "../../../../contents";
import Modal from "react-native-modal";
import AuthInput from "../../../../components/AuthInput";
import ModalButton from "../../../../components/ModalButton";
import { useMutation } from "react-apollo-hooks";
import { PASSWORD_CHANGE, SEE_PROFILE } from "../../SettingQueries";

const PasswordChange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNuewPassword] = useState("");

  const currentPasswordOnChange = text => {
    setCurrentPassword(text);
  };

  const newPasswordOnChange = text => {
    setNewPassword(text);
  };

  const verifyNewPasswordOnChange = text => {
    setVerifyNuewPassword(text);
  };

  const [changePasswordMutation] = useMutation(PASSWORD_CHANGE, {
    variables: {
      currentPassword: currentPassword,
      changePassword: newPassword
    },
    refetchQueries: () => [{ query: SEE_PROFILE }],
    awaitRefetchQueries: true
  });

  const changePassword = async () => {
    if (newPassword !== verifyNewPassword) {
      ToastAndroid.show("비밀번호가 일치하지 않습니다.", ToastAndroid.SHORT);
    } else {
      var num = newPassword.search(/[0-9]/g);
      var eng = newPassword.search(/[a-z]/gi);
      var spe = newPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      if (newPassword.length < 8 || newPassword.length > 20) {
        ToastAndroid.show(
          "8자리 ~ 20자리 이내로 입력해주세요.",
          ToastAndroid.SHORT
        );
        return false;
      } else if (newPassword.search(/\s/) != -1) {
        ToastAndroid.show(
          "비밀번호는 공백 없이 입력해주세요.",
          ToastAndroid.SHORT
        );
        return false;
      } else if (num < 0 || eng < 0 || spe < 0) {
        ToastAndroid.show(
          "영문,숫자,특수문자를 혼합 입력해주세요.",
          ToastAndroid.SHORT
        );
        return false;
      } else {
        setIsLoading(true);
        const {
          data: { passwordChange }
        } = await changePasswordMutation();
        if (passwordChange === "현재 비밀번호가 다릅니다.") {
          Alert.alert("현재 비밀번호가 다릅니다.");
          setIsLoading(false);
        } else {
          if (passwordChange === "변경완료") {
            setIsLoading(false);
            Alert.alert("비밀번호 변경이 완료되었습니다.");
            setPasswordModal(!passwordModal);
            setCurrentPassword("");
            setNewPassword("");
            setVerifyNuewPassword("");
          }
        }
      }
    }
  };

  return (
    <View
      style={{
        width: contents.width / 1.03,
        height: 67,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => setPasswordModal(!passwordModal)}
      >
        <View
          style={{
            marginLeft: 7,
            justifyContent: "center",
            alignItems: "center",
            height: 67
          }}
        >
          <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
            비밀번호 변경
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        isVisible={passwordModal}
        onBackdropPress={() =>
          isLoading ? null : setPasswordModal(!passwordModal)
        }
        onRequestClose={() =>
          isLoading ? null : setPasswordModal(!passwordModal)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              width: 300,
              height: 280
            }}
          >
            <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 20 }}>
              <Text style={{ fontSize: 10 }}>닉네임 변경</Text>
            </View>
            <View
              style={{
                width: 300,
                marginTop: 10,
                alignItems: "center"
              }}
            >
              <View style={{ marginTop: 7 }}>
                <AuthInput
                  editable={!isLoading}
                  value={currentPassword}
                  onChange={currentPasswordOnChange}
                  placeholder={"현재 비밀번호"}
                  keyboardType={"default"}
                  secureTextEntry={true}
                  textContentType={"password"}
                  maxLength={20}
                  autoCompleteType={"off"}
                  autoCapitalize={"none"}
                />
              </View>
              <View style={{ marginTop: 7 }}>
                <AuthInput
                  editable={!isLoading}
                  value={newPassword}
                  onChange={newPasswordOnChange}
                  placeholder={"변경 비밀번호"}
                  keyboardType={"default"}
                  secureTextEntry={true}
                  textContentType={"password"}
                  maxLength={20}
                  autoCompleteType={"off"}
                  autoCapitalize={"none"}
                />
              </View>
              <View style={{ marginTop: 7 }}>
                <AuthInput
                  editable={!isLoading}
                  value={verifyNewPassword}
                  onChange={verifyNewPasswordOnChange}
                  placeholder={"변경 비밀번호 확인"}
                  keyboardType={"default"}
                  secureTextEntry={true}
                  textContentType={"password"}
                  maxLength={20}
                  autoCompleteType={"off"}
                  autoCapitalize={"none"}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                width: 300,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 17
              }}
            >
              <ModalButton
                text={"변경"}
                onPress={changePassword}
                backColor={styles.MainColor}
                textColor={"white"}
                disabled={isLoading}
                isLoading={isLoading}
                width={77}
                height={40}
                color={"white"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PasswordChange;
