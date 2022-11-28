import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import contents from "../../../../contents";
import styles from "../../../../styles";
import { useMutation } from "react-apollo-hooks";
import { DELETE_GOAL_CARD } from "../../HomeQueries";
import { SEE_GOAL_FULL_STAGE_PLAN } from "../GoalPlan/GoalPlanQuery";
import { NavigationActions } from "react-navigation";
import { Notifications } from "expo";
import { SEE_HOME_GOAL } from "../../../newQueries";

const GoalGiveUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const goalInformations = navigation.getParam("goalInformations");
  const goalHistories = navigation.getParam("goalHistories");
  const goalId = navigation.getParam("goalId");
  const navValue = navigation.getParam("navValue");
  const seeDayToDo = navigation.getParam("seeDayToDo");

  const passwordOnChange = (text) => {
    setPassword(text);
  };

  const [deleteGoalCardMutation] = useMutation(DELETE_GOAL_CARD, {
    variables: {
      goalId,
    },
    refetchQueries: () => [
      { query: SEE_HOME_GOAL },
      { query: SEE_GOAL_FULL_STAGE_PLAN },
    ],
    awaitRefetchQueries: true,
  });

  const goalToDoesAlarm = seeDayToDo.dayToDoes.filter(
    (toDo) =>
      toDo.goal !== null && toDo.goal.id === goalId && toDo.alrams.length !== 0
  );

  const deleteGoalHandle = async () => {
    setIsLoading(true);
    await deleteGoalCardMutation();
    setIsLoading(false);
    for (let i = 0; i < goalToDoesAlarm.length; i++) {
      for (
        let j = 0;
        j <
        parseInt(
          goalToDoesAlarm &&
            goalToDoesAlarm[i] &&
            goalToDoesAlarm[i].alrams &&
            goalToDoesAlarm[i].alrams.length
        );
        j++
      ) {
        Notifications.cancelScheduledNotificationAsync(
          goalToDoesAlarm[i].alrams[j].categoryId
        );
      }
    }
    Alert.alert("목표카드가 삭제되었습니다.");
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
          backgroundColor: "white",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              marginTop: 30,
              color: styles.Wine,
              fontWeight: "700",
            }}
          >
            목표삭제 시 카드 내 정보가
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",

              color: styles.Wine,
              fontWeight: "700",
            }}
          >
            모두 삭제됩니다.
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: styles.Wine,
              fontWeight: "700",
              marginBottom: 30,
            }}
          >
            (해야할 일, 히스토리 등)
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
            정말로 삭제하시겠습니까?
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
            onPress={() => deleteGoalHandle()}
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

export default GoalGiveUp;
