import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import contents from "../../../../../../contents";
import styles from "../../../../../../styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { SEE_GOAL_FAVORITE } from "../../../../../newQueries";

const MyGoalFavorite = ({ navigation }) => {
  const me = navigation.getParam("me");
  const goalId = navigation.getParam("goalId");
  const goalText = navigation.getParam("goalText");

  const { data, loading } = useQuery(SEE_GOAL_FAVORITE, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const favorite =
    data && data.seeGoalFavorite && data.seeGoalFavorite.favorites;

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            width: contents.width,
            height: 77,
            borderBottomWidth: 1,
            borderBottomColor: styles.darkGreyColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                textAlign: "center",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {goalText}
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 7,
                fontWeight: "700",
                color: styles.darkGreyColor,
              }}
            >
              {"  "}즐겨찾기한 유저
            </Text>
          </View>
        </View>
        {favorite && favorite.length === 0 ? (
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              아직 즐겨찾기한 유저가 없습니다.
            </Text>
          </View>
        ) : (
          favorite &&
          favorite.map((favorite) => (
            <TouchableOpacity
              key={favorite.id}
              onPress={() =>
                navigation.navigate("SoulerProfile", {
                  me,
                  userId: favorite && favorite.id,
                })
              }
            >
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  padding: 10,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={
                    favorite && favorite.avatar
                      ? { uri: favorite && favorite.avatar }
                      : require("../../../../../../assets/noAvatar.png")
                  }
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <Text style={{ fontWeight: "700" }}>
                    {favorite && favorite.nickname}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default MyGoalFavorite;
