import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styles from "../../../../styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import contents from "../../../../contents";
import GoalStagePlan from "./GoalStagePlan";
import { SEE_GOAL_STAGE_PLAN } from "./GoalPlanQuery";
import Loader from "../../../../components/Loader";
import ToDoPlan from "./ToDoCalenar/ToDoPlan";

const GoalPlan = ({
  navigation,
  division,
  selectedLastDay,
  secondSelectedLastDay,
  thirdSelectedLastDay,
  forthSelectedLastDay,
  fivethSelectedLastDay,
  isLoading,
  setIsLoading,
  setLoadingModalText,
}) => {
  const today = new Date();

  const startDate = navigation.getParam("startDate");
  const originDDay = navigation.getParam("originDDay");
  const goalText = navigation.getParam("goalText");
  const id = navigation.getParam("id");

  // const selectedLastDay = navigation.getParam("selectedLastDay");
  // const secondSelectedLastDay = navigation.getParam("secondSelectedLastDay");
  // const thirdSelectedLastDay = navigation.getParam("thirdSelectedLastDay");
  // const forthSelectedLastDay = navigation.getParam("forthSelectedLastDay");
  // const fivethSelectedLastDay = navigation.getParam("fivethSelectedLastDay");

  const { data, loading } = useQuery(SEE_GOAL_STAGE_PLAN, {
    variables: {
      goalId: id,
    },
    fetchPolicy: "cache-and-network",
  });
  const createdPlanData = data && data.seePlan && data.seePlan.detailPlans;
  const createdPlanLength = createdPlanData && createdPlanData.length;

  return (
    <View
      style={{
        backgroundColor: "white",
        width: contents.width / 1.03,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      {createdPlanLength !== 0 ? (
        <View>
          <View
            style={{
              width: contents.width / 1.03,
              marginTop: 10,
              marginBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700" }}>단계 별 할일 정하기</Text>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() =>
                navigation.navigate("EditGoalStagePlan", {
                  data,
                  startDate,
                  originDDay,
                  goalText,
                  id,
                })
              }
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  textDecorationLine: "underline",
                  color: styles.darkGreyColor,
                }}
              >
                단계 별 목표수정
              </Text>
            </TouchableOpacity>
          </View>
          <ToDoPlan
            createdPlanData={createdPlanData}
            navigation={navigation}
            id={id}
          />
        </View>
      ) : (
        <GoalStagePlan
          startDate={startDate}
          originDDay={originDDay}
          goalText={goalText}
          navigation={navigation}
          selectedLastDay={selectedLastDay}
          secondSelectedLastDay={secondSelectedLastDay}
          thirdSelectedLastDay={thirdSelectedLastDay}
          forthSelectedLastDay={forthSelectedLastDay}
          fivethSelectedLastDay={fivethSelectedLastDay}
          id={id}
          data={data}
          division={division}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setLoadingModalText={setLoadingModalText}
        />
      )}
    </View>
  );
};

export default GoalPlan;
