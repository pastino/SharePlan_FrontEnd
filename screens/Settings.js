import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Image,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEE_ME } from "./home/HomeQueries";
import contents from "../contents";
import ExpoIcon from "../components/ExpoIcon";
import styles from "../styles";
import ProfileImage from "./Setting/ProfileImage";
import moment from "moment";
import ProfileInfo from "../screens/SoulingProfile/ProfileInfo";
import { NavigationActions } from "react-navigation";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import { AVATAR, DELETE_AVATAR } from "./Setting/SettingQueries";
import axios from "axios";
import options from "../apollo";

const Settings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDelteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectTap, setSelectTap] = useState(1);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState();

  const { data, loading, refetch } = useQuery(SEE_ME, {
    fetchPolicy: "network-only",
  });

  const me = data && data.me;
  const userId = me && me.userId;
  const avatar = me && me.avatar;
  const nickname = me && me.nickname;
  const gender = me && me.gender;
  const followers = me && me.followers;
  const following = me && me.following;
  const createdAt = me && me.createdAt;

  // age Calcluate
  const dateOfBirth = me && me.dateOfBirth;
  const stringBirth = String(dateOfBirth).substring(0, 4);
  const intBirth = parseInt(stringBirth);
  const date = new Date();
  const todayYear = moment(date).format("YYYY");
  //

  const age = todayYear - intBirth + 1;

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("죄송합니다. 사진을 업로드 하기 위해 권한을 허용해주세요.");
      }
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { data } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const ImageViewHandle = () => {
    if (!avatar) {
      ToastAndroid.show("업로드 된 이미지가 없습니다.", ToastAndroid.SHORT);
    } else {
      setImageModal(!imageModal);
      navigation.navigate("ProfileImageView", {
        file: avatar ? avatar : null,
      });
    }
  };

  const [avatarUploadMutation] = useMutation(AVATAR, {
    refetchQueries: () => [{ query: SEE_ME }],
    awaitRefetchQueries: true,
  });

  const [avatarDeleteMutation] = useMutation(DELETE_AVATAR, {
    refetchQueries: () => [{ query: SEE_ME }],
    awaitRefetchQueries: true,
  });

  const uploadAvatarHandle = async ({ image }) => {
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
        } = await avatarUploadMutation({
          variables: {
            avatar: location[0],
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
        setImageModal(!imageModal);
      }
    }
  };

  const deleteAvatarHandle = async () => {
    if (!avatar) {
      ToastAndroid.show("삭제 할 이미지가 없습니다.", ToastAndroid.SHORT);
    } else {
      setDelteLoading(true);
      await avatarDeleteMutation();
      setDelteLoading(false);
      setImageModal(!imageModal);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Image
          source={require("../assets/basicPicture.jpg")}
          style={{ width: contents.width, height: 100, opacity: 0.5 }}
        />

        <View
          style={{
            position: "absolute",
            width: 74,
            height: 74,
            left: contents.width / 2 - 35,
            bottom: -20,
            backgroundColor: "white",
            borderRadius: 37,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setImageModal(!imageModal)}>
            <Image
              resizeMode={"cover"}
              source={
                avatar ? { uri: avatar } : require("../assets/noAvatar.png")
              }
              style={{ width: 70, height: 70, borderRadius: 35 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Constants.width,
            alignItems: "flex-end",
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                NavigationActions.navigate({
                  routeName: "settingMainViewNav",
                  params: { avatar, nickname, gender, dateOfBirth, userId },
                  action: NavigationActions.navigate({
                    routeName: "SettingView",
                    params: { avatar, nickname, gender, dateOfBirth, userId },
                  }),
                })
              )
            }
          >
            <ExpoIcon name={"settings"} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={imageModal}
        onBackdropPress={() =>
          isLoading || deleteLoading ? null : setImageModal(!imageModal)
        }
        onRequestClose={() =>
          isLoading || deleteLoading ? null : setImageModal(!imageModal)
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
              alignItems: "center",
              width: 300,
              height: 220,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 300,
                height: 220,
              }}
            >
              <TouchableOpacity
                disabled={isLoading || deleteLoading}
                onPress={() => ImageViewHandle()}
              >
                <View
                  style={{
                    width: 100,
                    height: 50,
                    backgroundColor: styles.MainColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 7,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    보기
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading || deleteLoading}
                onPress={() => deleteAvatarHandle()}
              >
                <View
                  style={{
                    width: 100,
                    height: 50,
                    backgroundColor: styles.MainColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 7,
                  }}
                >
                  {deleteLoading ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    <Text style={{ color: "white", fontWeight: "700" }}>
                      삭제
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading || deleteLoading}
                onPress={async () => {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [5.5, 5.5],
                    quality: 1,
                  });
                  if (!result.cancelled) {
                    setImage(result.uri);
                    uploadAvatarHandle({ image: result.uri });
                  }
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 50,
                    backgroundColor: styles.MainColor,
                    borderRadius: 10,
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
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 80,
          marginTop: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "700" }}>{nickname}</Text>
          <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
            {gender} / {age}
          </Text>
        </View>
      </View>
      <ProfileInfo
        user={me}
        selectTap={selectTap}
        setSelectTap={setSelectTap}
        followers={followers}
        following={following}
        navigation={navigation}
        createdAt={createdAt}
        division={"myProfile"}
        refreshing={refreshing}
        onRefresh={onRefresh}
        me={me}
      />
    </View>
  );
};

export default Settings;
