import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import styles from "../../../styles";
import contents from "../../../contents";

const SoulerList = ({
  avatar,
  dateOfBirth,
  nickname,
  gender,
  postCounts,
  goalCounts,
  navigation,
  id,
  me
}) => {
  // age Calcluate
  const stringBirth = String(dateOfBirth).substring(0, 4);
  const intBirth = parseInt(stringBirth);
  const date = new Date();
  const todayYear = moment(date).format("YYYY");
  //
  const soulerAge = todayYear - intBirth + 1;

  return (
    <View
      style={{
        width: contents.width,
        height: 75,
        borderBottomWidth: 1,
        borderBottomColor: styles.lightGreyColor,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <TouchableOpacity
        disabled={me && me.id === id}
        onPress={() =>
          navigation.navigate("SecondSoulerProfile", { userId: id, me })
        }
      >
        <View style={{ marginLeft: 10, flexDirection: "row" }}>
          <Image
            source={
              avatar ? { uri: avatar } : require("../../../assets/noAvatar.png")
            }
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 7
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>{nickname}</Text>
            <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
              {gender} / {soulerAge}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 55,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <View style={{ marginRight: 20 }}>
          <Text>목표카드</Text>
          <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
            {goalCounts}
          </Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <Text>게시물</Text>
          <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
            {postCounts}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SoulerList;
