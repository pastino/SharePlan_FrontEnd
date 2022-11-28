import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import contents from "../../../../../contents";
import styles from "../../../../../styles";
import ExpoIcon from "../../../../../components/ExpoIcon";

const MainImage = ({ selectedPhoto, setSelectedPhoto }) => {
  const [hasPermission, setHasPermission] = useState(false);

  const getPhotos = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5.5, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedPhoto(result.uri);
      }
    } else {
      askPermission();
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

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: contents.width,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          height: "auto",
        }}
      >
        <Text style={{ fontWeight: "700", padding: 10 }}>메인 사진</Text>
        <View
          style={{
            width: contents.width,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          {selectedPhoto ? (
            <TouchableWithoutFeedback onPress={() => askPermission()}>
              <Image
                source={{ uri: selectedPhoto }}
                style={{
                  width: contents.width / 1.4,
                  height: contents.width / 1.7,
                  marginTop: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                resizeMode={"contain"}
              />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => askPermission()}>
              <View
                style={{
                  width: contents.width / 1.5,
                  height: contents.width / 1.7,
                  marginTop: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                  backgroundColor: "white",
                }}
              >
                <ExpoIcon
                  name={"plus"}
                  size={50}
                  color={styles.darkGreyColor}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: contents.width,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: styles.darkGreyColor,
              fontWeight: "700",
            }}
          >
            달성한 목표의 Image를 선택해주세요.
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: styles.darkGreyColor,
              fontWeight: "700",
            }}
          >
            달성사진이 없다면 목표를 시각화 해줄 수 있는 Image.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MainImage;
