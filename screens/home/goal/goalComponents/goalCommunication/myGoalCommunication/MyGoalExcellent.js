import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import contents from "../../../../../../contents";
import styles from "../../../../../../styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { SEE_GOAL_EXECELLENT } from "../../../../../newQueries";

const MyGoalExcellent = ({ navigation }) => {
  const me = navigation.getParam("me");
  const goalText = navigation.getParam("goalText");
  const goalId = navigation.getParam("goalId");

  const { data, loading } = useQuery(SEE_GOAL_EXECELLENT, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const excellent =
    data && data.seeGoalExcellenct && data.seeGoalExcellenct.excellents;

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
              {"  "}추천한 유저
            </Text>
          </View>
        </View>
        {excellent && excellent.length === 0 ? (
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
              아직 추천한 유저가 없습니다.
            </Text>
          </View>
        ) : (
          excellent &&
          excellent.map((excellent) => (
            <TouchableOpacity
              key={excellent.id}
              onPress={() =>
                navigation.navigate("SoulerProfile", {
                  me,
                  userId: excellent && excellent.id,
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
                    excellent && excellent.avatar
                      ? { uri: excellent && excellent.avatar }
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
                    {excellent && excellent.nickname}
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
