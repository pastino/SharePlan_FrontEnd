import React, { useState, useEffect } from "react";
import { View, Text, ToastAndroid, Image, Button } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import contents from "../../contents";

const CameraTest = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [hasPermission, setHasPermission] = useState(false);
  const [allPhotos, setAllPhotos] = useState();

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

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap"
      }}
    >
      {allPhotos &&
        allPhotos.map(photo => (
          <TouchableOpacity
            key={photo.id}
            onPress={() => setSelectedPhoto(photo.uri)}
          >
            <Image
              resizeMode="cover"
              style={{
                width: contents.width / 3,
                height: contents.height / 7
              }}
              source={{ uri: photo.uri }}
            />
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default CameraTest;
