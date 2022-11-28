import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import styles from "../../../../styles";
import { useMutation } from "react-apollo-hooks";
import { DELETE_USER } from "../../SettingQueries";
import { useLogOut } from "../../../../AuthContext";
import Modal from "react-native-modal";
import AuthInput from "../../../../components/AuthInput";

const DeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logOut = useLogOut();
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [randomNum, setRandomNum] = useState("");

  const onChange = text => {
    setValue(text);
  };

  const [deleteUserMutation] = useMutation(DELETE_USER);

  const deleteUser = async () => {
    if (parseInt(value) === parseInt(randomNum)) {
      setIsLoading(true);
      const {
        data: { deleteUser }
      } = await deleteUserMutation();
      if (deleteUser === true) {
        Alert.alert("회원탈퇴(계정삭제)가 완료되었습니다.");
        logOut();
      }
      setIsLoading(false);
    } else {
      ToastAndroid.show("숫자 입력이 잘못되었습니다.", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    randomNumHandle();
  }, [modalVisible]);

  const randomNumHandle = () => {
    setRandomNum(Math.floor(Math.random() * 10000));
  };

  const modalCancle = () => {
    setModalVisible(!modalVisible);
    setValue("");
  };

  return (
    <View style={{ marginLeft: 10, marginRight: 10, alignItems: "center" }}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          회원탈퇴(계정삭제) 안내
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", color: styles.Wine }}>
          탈퇴와 동시에 회원님의 개인정보 및 모든 이용정보가
        </Text>
        <Text style={{ textAlign: "center", color: styles.Wine }}>
          그 즉시 삭제되며 복구가 불가능합니다.
        </Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View
          style={{
            marginTop: 20,
            width: 100,
            height: 45,
            backgroundColor: styles.MainColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>회원탈퇴</Text>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => modalCancle()}
        onRequestClose={() => modalCancle()}
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
              alignItems: "center",
              width: 300,
              height: 250
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 12
              }}
            >
              실수 방지를 위하여 아래의 번호를 기입 후 탈퇴진행 부탁드립니다.
            </Text>
            <Text style={{ marginBottom: 10 }}>{randomNum}</Text>
            <AuthInput
              editable={!isLoading}
              value={value}
              onChange={onChange}
              keyboardType={"number-pad"}
              maxLength={4}
              autoCompleteType={"off"}
              autoCapitalize={"none"}
            />
            <TouchableOpacity disabled={isLoading} onPress={() => deleteUser()}>
              <View
                style={{
                  width: 90,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  backgroundColor: styles.MainColor,
                  marginTop: 20
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text style={{ fontWeight: "700", color: "white" }}>
                    회원탈퇴
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteUser;
