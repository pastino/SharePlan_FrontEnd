import React, { useState, useEffect } from "react";
import { Button, Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const CameraTestClass = () => {
  const [image, setImage] = useState([]);

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Pick an image from camera roll"
        onPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 4],
            quality: 1
          });
          if (!result.cancelled) {
            setImage(image.concat(result.uri));
          }
        }}
      />
    </View>
  );
};
export default CameraTestClass;
