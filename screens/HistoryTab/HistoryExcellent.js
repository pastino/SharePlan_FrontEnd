import React from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../styles";

const HistoryExcellent = ({ navigation }) => {
  const likes = navigation.getParam("likes");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          height: 60,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontWeight: "700" }}>훌륭해요!!</Text>
      </View>
      <ScrollView
        // style={{ marginTop: 10 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {likes &&
          likes.map((user) => (
            <View
              key={user.id}
              style={{
                marginTop: 10,
                flexDirection: "row",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={
                  user.avatar !== null
                    ? { uri: user.avatar }
                    : require("../../assets/noAvatar.png")
                }
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "700" }}>
                  {user.nickname}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default HistoryExcellent;
