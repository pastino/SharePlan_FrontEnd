import React, { Fragment, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import contents from "../contents";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import { GOAL_SALE_CONFIRM, SEE_ME } from "./home/HomeQueries";

import ConfirmGoalListData from "./GoalSchConfirmView/ConfirmGoalListData";

const GoalSchConfirmView = ({ navigation }) => {
  const meData = navigation.getParam("meData");

  const userId =
    meData && meData.seeMeBasicData && meData.seeMeBasicData.userId;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const { data, loading, refetch } = useQuery(GOAL_SALE_CONFIRM, {
    variables: {
      userId,
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: styles.lightGreyColor,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "700" }}>목표/스케쥴 다운 검토</Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : confirmLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            {data &&
              data.seeGoalConfirm &&
              data.seeGoalConfirm.map((goal) => (
                <Fragment key={goal.id}>
                  <ConfirmGoalListData
                    {...goal}
                    navigation={navigation}
                    userId={userId}
                    me={meData && meData.me}
                    loading={loading}
                    setConfirmLoading={setConfirmLoading}
                  />
                </Fragment>
              ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default GoalSchConfirmView;
