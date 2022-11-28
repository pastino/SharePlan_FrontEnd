import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../../../styles";
import contents from "../../../../contents";
import { useMutation } from "react-apollo-hooks";
import { COMPLETE_GOAL_CARD } from "../../HomeQueries";
import { NavigationActions } from "react-navigation";
import { SEE_HOME_GOAL } from "../../../newQueries";

const GoalComplete = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const goalInformations = navigation.getParam("goalInformations");
  const goalHistories = navigation.getParam("goalHistories");
  const goalId = navigation.getParam("goalId");
  const navValue = navigation.getParam("navValue");

  const [completeGoalMutation] = useMutation(COMPLETE_GOAL_CARD, {
    variables: {
      goalId,
    },
    refetchQueries: () => [{ query: SEE_HOME_GOAL }],
    awaitRefetchQueries: true,
  });

  const completeGoalHandle = async () => {
    setIsLoading(true);
    await completeGoalMutation();
    setIsLoading(false);
    Alert.alert("목표카드가 완료처리 되었습니다.");
    navigation.navigate(
      NavigationActions.navigate({
        routeName: "TabNavigation",
        action: NavigationActions.navigate({
          routeName: "Tab1",
          action: NavigationActions.navigate({
            routeName: "HomeDiv",
            action: NavigationActions.navigate({
              routeName: "HomeGoal",
            }),
          }),
        }),
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: styles.Wine,
              fontWeight: "700",
            }}
          >
            완료된 목표는 완료된 목표카드 리스트에서
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: styles.Wine,
              fontWeight: "700",
            }}
          >
            관리가 가능합니다.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: styles.Wine,
              fontWeight: "700",
            }}
          >
            하지만 History, Information 업데이트가 불가능하며
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: styles.Wine,
              fontWeight: "700",
            }}
          >
            언제든 완료취소하여 목표를 이어나가실 수 있습니다.
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 17 }}>
            『{navValue}』
          </Text>
        </View>
        <View style={{ marginTop: 30, marginBottom: 30 }}>
          <Text style={{ fontSize: 17, textAlign: "center" }}>
            완료처리 하시겠습니까?
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: contents.width,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 100,
          }}
        >
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => navigation.navigate("GoalEdit")}
          >
            <View
              style={{
                width: 90,
                height: 40,
                backgroundColor: styles.MainColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginRight: 20,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>아니오</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => completeGoalHandle()}
          >
            <View
              style={{
                width: 90,
                height: 40,
                backgroundColor: styles.MainColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={{ color: "white", fontWeight: "700" }}>예</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoalComplete;
