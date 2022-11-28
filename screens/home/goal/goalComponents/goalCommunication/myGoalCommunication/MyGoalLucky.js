import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import contents from "../../../../../../contents";
import styles from "../../../../../../styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SEE_GOAL_LUCKY } from "../../../../../newQueries";
import { useQuery } from "react-apollo-hooks";

const MyGoalExcellent = ({ navigation }) => {
  const me = navigation.getParam("me");
  const goalId = navigation.getParam("goalId");
  const goalText = navigation.getParam("goalText");

  const { data, loading } = useQuery(SEE_GOAL_LUCKY, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const lucky = data && data.seeGoalLucky && data.seeGoalLucky.luckies;

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
              {"  "}행운을 빌어준 유저
            </Text>
          </View>
        </View>
        {lucky && lucky.length === 0 ? (
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
              아직 행운을 빌어준 유저가 없습니다.
            </Text>
          </View>
        ) : (
          lucky &&
          lucky.map((lucky) => (
            <TouchableOpacity
              key={lucky.id}
              onPress={() =>
                navigation.navigate("SoulerProfile", {
                  me,
                  userId: lucky && lucky.id,
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
                    lucky && lucky.avatar
                      ? { uri: lucky && lucky.avatar }
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
                    {lucky && lucky.nickname}
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

export default MyGoalExcellent;
