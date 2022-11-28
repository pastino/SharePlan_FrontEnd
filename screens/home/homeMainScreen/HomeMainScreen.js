import React, { useState } from "react";
import { View, Text } from "react-native";
import ToDoList from "./ToDoList";
import styles from "../../../styles";
import contents from "../../../contents";
import InputModal from "../calendal/data/InputModal";
import { CreateDayToDoMutation } from "../calendal/data/Mutation";
import { useQuery } from "react-apollo-hooks";
import { SEE_GOAL_FULL_STAGE_PLAN } from "../homeGoalScreen/GoalPlan/GoalPlanQuery";
import GoalStagePlanView from "./GoalStagePlanView";
import ExpoIcon from "../../../components/ExpoIcon";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import moment from "moment";
import { SEE_ME_BASIC_DATA } from "../../newQueries";

const HomeMainScreen = ({
  navigation,
  data,
  goalData,
  startDayView,
  inquiryperiodView,
  inquiryperiodNumberView,
  onRefresh,
}) => {
  const [stageView, setStageView] = useState(false);

  const { data: meData, loading: meLoading } = useQuery(SEE_ME_BASIC_DATA, {
    fetchPolicy: "cache-and-network",
  });

  const { data: stagePlanView, loading: stagePlanViewLoading } = useQuery(
    SEE_GOAL_FULL_STAGE_PLAN,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "column",
          width: contents.width,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CalendarView", {
              startDayView,
              inquiryperiodView,
              inquiryperiodNumberView,
              data,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: contents.width,
              height: 50,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                {moment(startDayView).format("M월 D일 dddd")}
              </Text>
              <Text style={{ fontSize: 20, color: styles.darkGreyColor }}>
                {" "}
                ·{" "}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                근일 {inquiryperiodView}
              </Text>
            </View>

            {meData &&
            meData.seeMeBasicData &&
            meData.seeMeBasicData.userId === "joon5006@naver.com" ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("GoalSchConfirmView", {
                    meData,
                  })
                }
              >
                <View
                  style={{
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: styles.lightGreyColor,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: styles.darkGreyColor,
                      fontWeight: "700",
                    }}
                  >
                    검토
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            {/* <TouchableWithoutFeedback
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setStageView(!stageView)}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                textAlign: "center",
                color: styles.darkGreyColor,
              }}
            >
              진행중인 목표현황
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {!stageView ? (
                <ExpoIcon name={"chevron-down"} color={styles.darkGreyColor} />
              ) : (
                <ExpoIcon name={"chevron-up"} color={styles.darkGreyColor} />
              )}
            </View>
          </TouchableWithoutFeedback> */}
          </View>
        </TouchableOpacity>
        {stageView ? (
          <View style={{ padding: 10 }}>
            <GoalStagePlanView
              data={stagePlanView}
              toDoData={data}
              loading={stagePlanViewLoading}
            />
          </View>
        ) : null}
      </View>
      <ToDoList
        data={data}
        goalData={goalData}
        navigation={navigation}
        startDayView={startDayView}
        inquiryperiodNumberView={inquiryperiodNumberView}
        onRefresh={onRefresh}
        meData={meData}
      />
    </View>
  );
};

export default HomeMainScreen;
