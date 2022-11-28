import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Home from "./Home";
import HomeGoal from "./HomeGoal";
import HomeDivScrollable from "./HomeDivScrollable";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME, SEE_DAYTODO } from "./home/HomeQueries";
import { SEE_HOME_GOAL } from "./newQueries";
import { useLogOut } from "../AuthContext";

const HomeDiv = ({ navigation }) => {
  const {
    data: seeDayToDo,
    loading: toDoLoading,
    refetch: toDoRefetch,
  } = useQuery(SEE_DAYTODO, {
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, refetch } = useQuery(SEE_HOME_GOAL, {
    fetchPolicy: "network-only",
  });

  const logOut = useLogOut();
  useEffect(() => {
    if (loading === false && data && data.seeHomeGoal === undefined) {
      logOut();
    }
  }, [data]);

  const me = data && data.seeHomeGoal && data.seeHomeGoal.user;

  return (
    <ScrollableTabView
      initialPage={0}
      style={{ backgroundColor: "white" }}
      renderTabBar={() => <HomeDivScrollable />}
    >
      <Home
        tabLabel="ToDo"
        navigation={navigation}
        loading={loading}
        data={data}
        refetch={refetch}
        seeDayToDo={seeDayToDo}
        toDoLoading={toDoLoading}
        toDoRefetch={toDoRefetch}
      />
      <HomeGoal
        tabLabel="Goal"
        navigation={navigation}
        loading={loading}
        data={data}
        refetch={refetch}
        seeDayToDo={seeDayToDo}
        toDoLoading={toDoLoading}
        toDoRefetch={toDoRefetch}
      />
    </ScrollableTabView>
  );
};

export default HomeDiv;
