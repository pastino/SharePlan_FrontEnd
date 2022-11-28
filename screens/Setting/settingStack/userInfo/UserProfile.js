import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import contents from "../../../../contents";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native-gesture-handler";
import styles from "../../../../styles";
import Modal from "react-native-modal";
import ModalButton from "../../../../components/ModalButton";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  NICK_NAME,
  GENDER,
  DATE_OF_BIRTH,
  SEE_PROFILE,
  AVATAR,
  DELETE_AVATAR,
} from "../../SettingQueries";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from "expo-permissions";
import axios from "axios";
import options from "../../../../apollo";
import PasswordChange from "./PasswordChagne";
import Loader from "../../../../components/Loader";

const UserProfile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarDeleteLoading, setAvatarDeleteLoading] = useState(false);
  // const userId = navigation.getParam("userId");
  // const avatar = navigation.getParam("avatar");
  // const nickname = navigation.getParam("nickname");
  // const gender = navigation.getParam("gender");
  // const dateOfBirth = navigation.getParam("dateOfBirth");

  const { data, loading } = useQuery(SEE_PROFILE, {
    fetchPolicy: "network-only",
  });
  const avatar = data && data.seeProfile && data.seeProfile.avatar;
  const nickname = data && data.seeProfile && data.seeProfile.nickname;
  const gender = data && data.seeProfile && data.seeProfile.gender;
  const dateOfBirth = data && data.seeProfile && data.seeProfile.dateOfBirth;
  const snsLogin = data && data.seeProfile && data.seeProfile.snsLogin;

  // Avatar

  const [avatarModal, setAvatarModal] = useState(false);
  const [image, setImage] = useState(avatar);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("죄송합니다. 사진을 업로드 하기 위해 권한을 허용해주세요.");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const [avatarMutation] = useMutation(AVATAR, {
    refetchQueries: () => [{ query: SEE_PROFILE }],
    awaitRefetchQueries: true,
  });

  const avatarChange = async () => {
    if (image) {
      const formData = new FormData();
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format: "jpeg" }
      );
      formData.append("file", {
        name: resizedPhoto.uri,
        type: "image/jpeg",
        uri: resizedPhoto.uri,
      });
      try {
        setIsLoading(true);
        const {
          data: { location },
        } = await axios.post(
          options.httpLink.toString() + "/api/upload",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        const {
          data: { avatar },
        } = await avatarMutation({
          variables: {
            avatar: location[0],
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
        setAvatarModal(!avatarModal);
      }
    }
  };

  const seeImage = () => {
    if (avatar === undefined) {
      ToastAndroid.show("아직 등록된 이미지가 없습니다.", ToastAndroid.SHORT);
    } else {
      navigation.navigate("ProfileImageView", {
        file: avatar,
      });
      setAvatarModal(!avatarModal);
    }
  };

  const [deleteAvatarMutation] = useMutation(DELETE_AVATAR, {
    refetchQueries: () => [{ query: SEE_PROFILE }],
    awaitRefetchQueries: true,
  });

  const deleteImage = async () => {
    if (avatar === undefined || avatar === null) {
      ToastAndroid.show("아직 등록된 이미지가 없습니다.", ToastAndroid.SHORT);
    } else {
      setAvatarDeleteLoading(true);
      await deleteAvatarMutation();
      setAvatarDeleteLoading(false);
      setAvatarModal(!avatarModal);
    }
  };

  // Nickname
  const [nicknameModal, setNicknameModal] = useState(false);
  const [nicknameValue, setNicknameValue] = useState(nickname);

  const nicknameOnChange = (text) => {
    setNicknameValue(text);
  };
  const nicknameTouch = () => {
    setNicknameValue(nickname);
    setNicknameModal(!nicknameModal);
  };

  const [nicknameChangeMutation] = useMutation(NICK_NAME, {
    variables: {
      nickname: nicknameValue,
    },
    refetchQueries: () => [{ query: SEE_PROFILE }],
    awaitRefetchQueries: true,
  });

  const changeNickname = async () => {
    if (!nicknameValue) {
      ToastAndroid.show("닉네임을 입력해주세요.", ToastAndroid.SHORT);
    } else if (nickname === nicknameValue) {
      ToastAndroid.show("변동사항이 없습니다.", ToastAndroid.SHORT);
    } else {
      setIsLoading(true);
      const {
        data: { nickName },
      } = await nicknameChangeMutation();
      try {
        if (nickName === "이미 닉네임을 사용중 입니다.") {
          Alert.alert("이미 닉네임이 존재합니다.");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
        setNicknameModal(!nicknameModal);
      }
    }
  };

  // Gender

  const [genderModal, setGenderModal] = useState(false);
  const [genderValue, setGenderValue] = useState(gender);

  const genderTouch = () => {
    setGenderValue(gender);
    setGenderModal(!genderModal);
  };

  const [genderChangeMutation] = useMutation(GENDER, {
    variables: {
      gender: genderValue,
    },
    refetchQueries: () => [{ query: SEE_PROFILE }],
    awaitRefetchQueries: true,
  });

  const changeGender = async () => {
    if (gender === genderValue) {
      ToastAndroid.show("변동사항이 없습니다.", ToastAndroid.SHORT);
    } else {
      setIsLoading(true);
      await genderChangeMutation();
      setIsLoading(false);
      setGenderModal(!genderModal);
    }
  };

  // dateOfBirth

  const [dateOfBirthModal, setDateOfBirthModal] = useState(false);
  const [dateOfBirthValue, setDateOfBirthValue] = useState(dateOfBirth);

  const dateOfBirthOnChage = (text) => {
    setDateOfBirthValue(text);
  };

  const dateOfBirthTouch = () => {
    setDateOfBirthValue(dateOfBirth);
    setDateOfBirthModal(!dateOfBirthModal);
  };

  const [dateOfBirthChangeMutation] = useMutation(DATE_OF_BIRTH, {
    variables: {
      dateOfBirth: parseInt(dateOfBirthValue),
    },
    refetchQueries: () => [{ query: SEE_PROFILE }],
    awaitRefetchQueries: true,
  });

  const changeDateOfBirth = async () => {
    if (dateOfBirthValue.length !== 4) {
      ToastAndroid.show("생년 네자리를 입력해주세요.", ToastAndroid.SHORT);
    } else {
      if (
        dateOfBirthValue.split("")[0] != 1 &&
        dateOfBirthValue.split("")[0] != 2
      ) {
        ToastAndroid.show(
          "첫번째 자리는 1 또는 2를 입력해주세요.",
          ToastAndroid.SHORT
        );
      } else if (
        dateOfBirthValue.split("")[1] != 0 &&
        dateOfBirthValue.split("")[1] != 9
      ) {
        ToastAndroid.show(
          "두번째 자리는 0 또는 9를 입력해주세요.",
          ToastAndroid.SHORT
        );
      } else if (dateOfBirthValue > 2019) {
        ToastAndroid.show("2020년 이전으로 입력해주세요.", ToastAndroid.SHORT);
      } else {
        setIsLoading(true);
        await dateOfBirthChangeMutation();
        setDateOfBirthModal(!dateOfBirthModal);
        setIsLoading(false);
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView contentContainerStyle={{}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <View
            style={{
              width: contents.width / 1.03,
              height: 150,
              backgroundColor: "white",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setAvatarModal(!avatarModal)}
            >
              <Image
                source={
                  avatar !== undefined && avatar !== null
                    ? { uri: avatar }
                    : require("../../../../assets/noAvatar.png")
                }
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View
          style={{
            width: contents.width / 1.03,
            height: 67,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <View style={{ marginTop: 7, marginLeft: 7 }}>
            <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
              아이디(이메일)
            </Text>
            <Text style={{ marginTop: 7, marginLeft: 7 }}>
              {data && data.seeProfile && data.seeProfile.userId}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: contents.width / 1.03,
            height: 67,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={() => nicknameTouch()}>
            <View style={{ marginTop: 7, marginLeft: 7 }}>
              <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                닉네임
              </Text>
              <Text style={{ marginTop: 7, marginLeft: 7 }}>{nickname}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: contents.width / 1.03,
            height: 67,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={() => genderTouch()}>
            <View style={{ marginTop: 7, marginLeft: 7 }}>
              <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                성별
              </Text>
              <Text style={{ marginTop: 7, marginLeft: 7 }}>{gender}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: contents.width / 1.03,
            height: 67,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={() => dateOfBirthTouch()}>
            <View style={{ marginTop: 7, marginLeft: 7 }}>
              <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                생년
              </Text>
              <Text style={{ marginTop: 7, marginLeft: 7 }}>{dateOfBirth}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {snsLogin ? null : <PasswordChange />}
        <Modal
          isVisible={avatarModal}
          onBackdropPress={() =>
            isLoading || avatarDeleteLoading
              ? null
              : setAvatarModal(!avatarModal)
          }
          onRequestClose={() =>
            isLoading || avatarDeleteLoading
              ? null
              : setAvatarModal(!avatarModal)
          }
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                backgroundColor: "white",
                width: 300,
                height: 200,
              }}
            >
              <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontSize: 10 }}>프로필 사진</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: 300,
                  height: 110,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 17,
                }}
              >
                <View style={{ marginBottom: 10 }}>
                  <ModalButton
                    text={"보기"}
                    onPress={seeImage}
                    backColor={styles.MainColor}
                    textColor={"white"}
                    disabled={isLoading || avatarDeleteLoading}
                    width={100}
                    height={40}
                    color={"white"}
                  />
                </View>
                <ModalButton
                  text={"삭제"}
                  onPress={deleteImage}
                  backColor={styles.MainColor}
                  textColor={"white"}
                  disabled={isLoading || avatarDeleteLoading}
                  isLoading={avatarDeleteLoading}
                  width={100}
                  height={40}
                  color={"white"}
                />
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    disabled={isLoading || avatarDeleteLoading}
                    onPress={async () => {
                      let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [5, 5],
                        quality: 1,
                      });
                      if (!result.cancelled) {
                        setImage(result.uri);
                        avatarChange();
                      }
                    }}
                  >
                    <View
                      style={{
                        width: 100,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: styles.MainColor,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={"white"} />
                      ) : (
                        <Text style={{ color: "white", fontWeight: "700" }}>
                          변경
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  {/* <ModalButton
                    text={"사진변경"}
                    onPress={async () => {
                      let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [5.5, 4],
                        quality: 1
                      });
                      if (!result.cancelled) {
                        setImage(image.concat(result.uri));
                      }
                    }}
                    backColor={styles.MainColor}
                    textColor={"white"}
                    disabled={isLoading}
                    isLoading={isLoading}
                    width={100}
                    height={40}
                    color={"white"}
                  /> */}
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={nicknameModal}
          onBackdropPress={() =>
            isLoading ? null : setNicknameModal(!nicknameModal)
          }
          onRequestClose={() =>
            isLoading ? null : setNicknameModal(!nicknameModal)
          }
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                backgroundColor: "white",
                width: 300,
                height: 150,
              }}
            >
              <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontSize: 10 }}>닉네임 변경</Text>
              </View>
              <View
                style={{
                  width: 300,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <TextInput
                  editable={!isLoading}
                  value={nicknameValue}
                  onChangeText={nicknameOnChange}
                  placeholder={"닉네임"}
                  maxLength={12}
                  style={{
                    width: contents.width / 2,
                    height: contents.height / 20,
                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                    paddingLeft: 10,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: 300,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 17,
                }}
              >
                <ModalButton
                  text={"변경"}
                  onPress={changeNickname}
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
        <Modal
          isVisible={genderModal}
          onBackdropPress={() =>
            isLoading ? null : setGenderModal(!genderModal)
          }
          onRequestClose={() =>
            isLoading ? null : setGenderModal(!genderModal)
          }
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                backgroundColor: "white",
                width: 300,
                height: 150,
              }}
            >
              <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontSize: 10 }}>성별 변경</Text>
              </View>
              <View
                style={{
                  width: 300,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 250,
                    height: 40,
                    borderWidth: 1,
                    borderColor: styles.darkGreyColor,
                    flexDirection: "row",
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={() => setGenderValue("남")}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 125,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                        borderRightColor: styles.darkGreyColor,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        backgroundColor:
                          genderValue === "남" ? styles.MainColor : null,
                      }}
                    >
                      <Text
                        style={{ color: genderValue === "남" ? "white" : null }}
                      >
                        남
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={() => setGenderValue("여")}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 125,
                        height: 40,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor:
                          genderValue === "여" ? styles.MainColor : null,
                      }}
                    >
                      <Text
                        style={{ color: genderValue === "여" ? "white" : null }}
                      >
                        여
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: 300,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 17,
                }}
              >
                <ModalButton
                  text={"변경"}
                  color={"white"}
                  onPress={changeGender}
                  backColor={styles.MainColor}
                  textColor={"white"}
                  disabled={isLoading}
                  isLoading={isLoading}
                  width={77}
                  height={40}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={dateOfBirthModal}
          onBackdropPress={() =>
            isLoading ? null : setDateOfBirthModal(!dateOfBirthModal)
          }
          onRequestClose={() =>
            isLoading ? null : setDateOfBirthModal(!dateOfBirthModal)
          }
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                backgroundColor: "white",
                width: 300,
                height: 150,
              }}
            >
              <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontSize: 10 }}>생년 변경</Text>
              </View>
              <View
                style={{
                  width: 300,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <TextInput
                  editable={!isLoading}
                  value={String(dateOfBirthValue)}
                  onChangeText={dateOfBirthOnChage}
                  placeholder={"생년"}
                  keyboardType={"number-pad"}
                  maxLength={4}
                  style={{
                    width: contents.width / 2,
                    height: contents.height / 20,
                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                    paddingLeft: 10,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: 300,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 17,
                }}
              >
                <ModalButton
                  text={"변경"}
                  onPress={changeDateOfBirth}
                  color={"white"}
                  backColor={styles.MainColor}
                  textColor={"white"}
                  disabled={isLoading}
                  isLoading={isLoading}
                  width={77}
                  height={40}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
