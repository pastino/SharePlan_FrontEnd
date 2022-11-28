import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import Loader from "../../../../../components/Loader";
import contents from "../../../../../contents";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../../../../styles";
import { Button } from "react-native-paper";
import ExpoIcon from "../../../../../components/ExpoIcon";

const SelectPhotoComp = ({
  navigation,
  completeToDoStyle,
  selected,
  setSelected,
  profileImageModify,
  profileImage,
  setProfileImage,
  isLoading
}) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [allPhotos, setAllPhotos] = useState();

  const toggleSelect = photo => {
    const selectedPhoto = selected.map(photo => photo.id).includes(photo.id);
    try {
      if (selectedPhoto) {
        setSelected(selected.filter(item => item.id !== photo.id));
      } else {
        setSelected(selected.concat(photo));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const profileImageToggle = photo => {
    setProfileImage(photo);
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: MediaLibrary.SortBy.creationTime
      });
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  const selectedHandle = () => {
    try {
      if (selected.length !== 0) {
        navigation.navigate("InformationCreate", {
          photo: selected
        });
      } else {
        ToastAndroid.show("사진을 선택해주세요.", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View>
            <View style={{ backgroundColor: "black" }}>
              {hasPermission ? (
                <Image
                  resizeMode="contain"
                  style={{
                    width: completeToDoStyle ? 306 : contents.width,
                    height: completeToDoStyle ? 200 : contents.height / 2
                  }}
                  source={{
                    uri: !profileImageModify
                      ? selected.length !== 0
                        ? selected[selected.length - 1].uri
                        : null
                      : profileImage !== undefined
                      ? profileImage.uri
                      : null
                  }}
                />
              ) : null}
            </View>
            {completeToDoStyle ? null : (
              <Button
                onPress={selectedHandle}
                style={{
                  backgroundColor: styles.MainColor,
                  width: contents.width / 4.5,
                  height: contents.height / 23,
                  position: "absolute",
                  top: 10,
                  right: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>선택</Text>
              </Button>
            )}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>
                {!profileImageModify
                  ? selected.length === 0
                    ? "사진을 선택하세요."
                    : null
                  : profileImage === undefined
                  ? "사진을 선택하세요."
                  : null}
              </Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginLeft: completeToDoStyle ? 6 : 3.5
            }}
          >
            {allPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() =>
                  profileImageModify
                    ? profileImageToggle(photo)
                    : toggleSelect(photo)
                }
                disabled={isLoading}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    width: completeToDoStyle ? 75 : contents.width / 3.1,
                    height: completeToDoStyle ? 75 : contents.height / 7,
                    opacity: selected.map(photo => photo.id).includes(photo.id)
                      ? 0.5
                      : 1,
                    margin: 1
                  }}
                  source={{ uri: photo.uri }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {!profileImageModify ? (
                    selected.map(photo => photo.id).includes(photo.id) ? (
                      <ExpoIcon name={"check"} size={50} />
                    ) : null
                  ) : profileImage !== undefined ? (
                    profileImage.id === photo.id ? (
                      <ExpoIcon name={"check"} size={50} />
                    ) : null
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default SelectPhotoComp;
