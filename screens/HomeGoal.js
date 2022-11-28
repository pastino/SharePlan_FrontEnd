import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import Loader from "../components/Loader";
import styles from "../styles";
import contents from "../contents";
import HomeGoalScreen from "./home/homeGoalScreen/HomeGoalScreen";
import AddGoal from "./home/homeGoalScreen/AddGoal/AddGoal";
import ExpoIcon from "../components/ExpoIcon";
import { ScrollView } from "react-native-gesture-handler";
import BookHelper from "./Helper/BookHelper";
import moment from "moment";
import { useQuery } from "react-apollo-hooks";
import { SEE_HOME_GOAL } from "./newQueries";

const HomeGoal = ({ navigation, loading, data, refetch, seeDayToDo }) => {
  const [toDoSelect, setToDoSelect] = useState(1);
  // Hooks an Const
  const [refreshing, setRefreshing] = useState(false);

  //Query
  const goalLength =
    data &&
    data.seeHomeGoal &&
    data.seeHomeGoal.filter((goal) => goal.complete === null) &&
    data.seeHomeGoal.filter((goal) => goal.complete === null).length;

  const completeGoals =
    data &&
    data.seeHomeGoal &&
    data.seeHomeGoal.filter((goal) => goal.complete === true);

  const notCompleteGoals =
    data &&
    data.seeHomeGoal &&
    data.seeHomeGoal.filter(
      (goal) => goal.complete === null || goal.complete === false
    );

  const me =
    data && data.seeHomeGoal && data.seeHomeGoal[0] && data.seeHomeGoal[0].user;

  //Event

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const addGoalHandle = () => {
    if (goalLength >= 5) {
      ToastAndroid.show(
        "목표카드는 5개를 초과할 수 없습니다.",
        ToastAndroid.SHORT
      );
    } else {
      navigation.navigate("GoalStack");
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View tabLabel="나의 목표" style={{}}>
          <View>
            <TouchableOpacity
              disabled={
                notCompleteGoals !== undefined &&
                notCompleteGoals &&
                notCompleteGoals.length === 0
              }
              onPress={() =>
                notCompleteGoals !== undefined &&
                notCompleteGoals &&
                notCompleteGoals.length === 0
                  ? null
                  : addGoalHandle()
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: contents.width,
                  padding: 10,
                  height: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: styles.darkGreyColor,
                  }}
                >
                  {moment(new Date()).format("M월 D일 dddd")}
                </Text>
                {!loading &&
                notCompleteGoals !== undefined &&
                notCompleteGoals &&
                notCompleteGoals.length === 0 ? null : (
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
                        color: styles.MainColor,
                      }}
                    >
                      목표 추가
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10,
                      }}
                    >
                      <ExpoIcon
                        name={"plus-circle-outline"}
                        color={styles.MainColor}
                        size={20}
                      />
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                width: contents.width,
                justifyContent: "space-between",
                borderTopWidth: 1,
                borderTopColor: styles.lightGreyColor,
                borderBottomWidth: 1,
                borderBottomColor: styles.lightGreyColor,
                height: 47,
              }}
            >
              <TouchableOpacity
                onPress={() => setToDoSelect(1)}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <View
                  style={{
                    width: contents.width / 2,
                    height: 47,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: styles.lightGreyColor,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: toDoSelect === 1 ? styles.MainColor : null,
                      fontWeight: toDoSelect === 1 ? "700" : null,
                      borderBottomWidth: toDoSelect === 1 ? 1 : null,
                      borderBottomColor: styles.MainColor,
                    }}
                  >
                    진행중 목표 (
                    {notCompleteGoals !== undefined &&
                      notCompleteGoals &&
                      notCompleteGoals.length}
                    )
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setToDoSelect(2)}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <View
                  style={{
                    width: contents.width / 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: toDoSelect === 2 ? styles.MainColor : null,
                      fontWeight: toDoSelect === 2 ? "700" : null,
                      borderBottomWidth: toDoSelect === 2 ? 1 : null,
                      borderBottomColor: styles.MainColor,
                    }}
                  >
                    완료한 목표 (
                    {completeGoals !== undefined &&
                      completeGoals &&
                      completeGoals.length}
                    )
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {loading ? (
              <Loader />
            ) : (
              <View
                style={{
                  backgroundColor: "white",
                }}
              >
                {(toDoSelect === 1 &&
                  notCompleteGoals &&
                  notCompleteGoals.length === 0) ||
                (toDoSelect === 2 &&
                  completeGoals &&
                  completeGoals.length === 0 &&
                  notCompleteGoals &&
                  notCompleteGoals.length === 0) ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: contents.width,
                      marginBottom: 10,
                      marginTop: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        marginBottom: 7,
                        color: styles.Wine,
                        marginTop: 10,
                      }}
                    >
                      아래 목표카드를 클릭하여 목표를 설정해주세요.
                    </Text>
                    <AddGoal navigation={navigation} goalLength={goalLength} />
                  </View>
                ) : (
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <HomeGoalScreen
                      me={me}
                      navigation={navigation}
                      seeDayToDo={seeDayToDo}
                      goals={
                        toDoSelect === 1 ? notCompleteGoals : completeGoals
                      }
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeGoal;
