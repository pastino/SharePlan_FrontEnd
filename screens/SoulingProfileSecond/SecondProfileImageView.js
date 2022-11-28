import React from "react";
import { View, Text, Image } from "react-native";
import contents from "../../contents";
import styles from "../../styles";
import ImageZoom from "react-native-image-pan-zoom";

const SecondProfileImageView = ({ navigation }) => {
  const images = navigation.getParam("file");
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        source={{ uri: images }}
        resizeMode={"contain"}
        style={{
          width: contents.width / 1,
          height: contents.height / 1
        }}
      />
    </View>
  );
};

export default SecondProfileImageView;
