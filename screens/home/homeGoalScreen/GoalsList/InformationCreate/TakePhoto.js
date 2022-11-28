import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { View, Text, Image, ToastAndroid, SafeAreaView } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import Loader from "../../../../../components/Loader";
import contents from "../../../../../contents";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import ExpoIcon from "../../../../../components/ExpoIcon";
import styles from "../../../../../styles";
import { Button } from "react-native-paper";

const TakeButton = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 9px solid ${styles.MainColor};
`;

const TakePhoto = ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [selected, setSelected] = useState([]);
  const [allPhoto, setAllPhoto] = useState([]);

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      setSelected(selected.concat(asset));
      setAllPhoto(allPhoto.concat(asset));

      setCanTakePhoto(true);
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };

  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  const toggleSelect = photo => {
    const selectedPhoto = selected.map(photo => photo.id).includes(photo.id);
    if (selectedPhoto) {
      setSelected(selected.filter(item => item.id !== photo.id));
    } else {
      setSelected(selected.concat(photo));
    }
  };

  const selectedHandle = () => {
    if (selected.length !== 0) {
      navigation.navigate("InformationCreate", { photo: selected });
    } else {
      ToastAndroid.show("사진을 선택해주세요.", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return loading ? (
    <Loader />
  ) : hasPermission ? (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        type={cameraType}
        style={{
          width: contents.width,
          height: contents.height / 1.3,
          justifyContent: "flex-end",
          padding: 10
        }}
      >
        <Button
          onPress={() => selectedHandle()}
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
        <View
          style={{
            marginTop: 2,
            width: contents.width,
            flexDirection: "row",
            position: "absolute",
            top: 0
          }}
        >
          <ScrollView horizontal>
            {allPhoto.map(photo => (
              <Fragment key={photo.id}>
                <TouchableOpacity onPress={() => toggleSelect(photo)}>
                  <Image
                    source={{ uri: photo.uri }}
                    style={{
                      width: contents.width / 3,
                      height: contents.height / 7.7,
                      marginLeft: 3,
                      opacity: selected
                        .map(photo => photo.id)
                        .includes(photo.id)
                        ? 0.4
                        : 1
                    }}
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
                    {selected.map(photo => photo.id).includes(photo.id) ? (
                      <ExpoIcon name={"check"} size={50} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </Fragment>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center"
          }}
        >
          <View style={{ position: "absolute", left: 10 }}>
            <TouchableOpacity onPress={() => toggleType()}>
              <ExpoIcon name={"camera-party-mode"} color={"white"} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => takePhoto()}
              disabled={!canTakePhoto}
            >
              <TakeButton />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  ) : null;
};

export default TakePhoto;
