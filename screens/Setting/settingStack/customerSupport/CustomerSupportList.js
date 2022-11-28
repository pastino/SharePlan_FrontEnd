import React from "react";
import { View, Text, Image } from "react-native";
import contents from "../../../../contents";
import styles from "../../../../styles";
import { ScrollView } from "react-native-gesture-handler";

const CustomerSupportList = ({ user, text, image }) => {
  const date = new Date();
  const todayYear = date.getFullYear(date);

  const age = todayYear - parseInt(user && user.dateOfBirth) + 1;

  return (
    <View
      style={{
        width: contents.width / 1.1,
        minHeight: 100,
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: contents.width / 1.1,
          marginLeft: 10,
          marginTop: 10
        }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={
            user && user.avatar
              ? { uri: user && user.avatar }
              : require("../../../../assets/noAvatar.png")
          }
        />
        <View
          style={{
            marginLeft: 7,
            justifyContent: "center",
            alignItems: "center",
            height: 50
          }}
        >
          <Text style={{ fontWeight: "700" }}>{user && user.nickname}</Text>
          <Text style={{ color: styles.darkGreyColor, fontSize: 10 }}>
            {user && user.gender} / {age}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text>{text}</Text>
      </View>
      {image ? (
        <View>
          <Image
            source={{ uri: image }}
            style={{
              width: contents.width / 1.2,
              height: contents.width / 1.2
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default CustomerSupportList;
