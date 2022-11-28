import React, { useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExpoIcon from "../../../../../components/ExpoIcon";
import styles from "../../../../../styles";
import { EXCELLENT_TOGGLE } from "./goalCommuQuery";
import { SEE_MAIN_FEED, SEE_FEED } from "../../../HomeQueries";
import { useMutation } from "react-apollo-hooks";
import { SEE_USER } from "../../../../SoulingProfile/ProfileQuery";

const Excellent = ({
  goalId,
  filtering,
  me,
  excellents,
  loading,
  small,
  ordering,
  division,
  navigation,
  communityDivision,
  user,
  goalText,
}) => {
  const [excellent, setExcellent] = useState(false);
  const avatar = me && me.avatar;
  const nickname = me && me.nickname;
  const id = me && me.id;

  const excellentsLength = excellents && excellents.length;

  const filterConfirm =
    excellents &&
    excellents.map((user) => user.id) &&
    excellents.map((user) => user.id).includes(id);

  const [excellentMutation] = useMutation(EXCELLENT_TOGGLE, {
    variables: {
      goalId,
      filter: filterConfirm ? true : false,
    },
    update: (proxy, { data: { execellentToggle } }) => {
      if (communityDivision === "seeFeed") {
        const data = proxy.readQuery({
          query: SEE_FEED,
        });
        const excellent =
          data &&
          data.seeFeed &&
          data.seeFeed.filter((goal) => goal.id === goalId) &&
          data.seeFeed.filter((goal) => goal.id === goalId)[0] &&
          data.seeFeed.filter((goal) => goal.id === goalId)[0].excellents;
        if (filterConfirm === false) {
          excellent && excellent.push(execellentToggle);
        } else {
          excellent &&
            excellent.splice(
              excellent && excellent.findIndex((user) => user.id === id),
              1
            );
        }
        proxy.writeQuery({
          query: SEE_FEED,
          data,
        });
      } else if (communityDivision === "seeUser") {
        const data = proxy.readQuery({
          query: SEE_USER,
          variables: { id: user && user.id },
        });
        const excellent =
          data &&
          data.seeUser &&
          data.seeUser.goals &&
          data.seeUser.goals.filter((goal) => goal.id === goalId) &&
          data.seeUser.goals.filter((goal) => goal.id === goalId)[0] &&
          data.seeUser.goals.filter((goal) => goal.id === goalId)[0].excellents;

        if (filterConfirm === false) {
          excellent && excellent.push(execellentToggle);
        } else {
          excellent &&
            excellent.splice(
              excellent && excellent.findIndex((user) => user.id === id),
              1
            );
        }
        proxy.writeQuery({
          query: SEE_USER,
          data,
        });
      } else {
        const data = proxy.readQuery({
          query: SEE_MAIN_FEED,
          variables: { pageNumber: 0, items: 10, filtering, ordering },
        });
        const excellent =
          data &&
          data.seeMainFeed &&
          data.seeMainFeed.filter((goal) => goal.id === goalId) &&
          data.seeMainFeed.filter((goal) => goal.id === goalId)[0] &&
          data.seeMainFeed.filter((goal) => goal.id === goalId)[0].excellents;

        if (filterConfirm === false) {
          excellent && excellent.push(execellentToggle);
        } else {
          excellent &&
            excellent.splice(
              excellent && excellent.findIndex((user) => user.id === id),
              1
            );
        }
        proxy.writeQuery({
          query: SEE_MAIN_FEED,
          data,
        });
      }
    },
    optimisticResponse: {
      execellentToggle: {
        __typename: "User",
        avatar,
        id,
        nickname,
      },
    },
  });

  const excellentHandle = async () => {
    if (loading) {
      ToastAndroid.show("로딩중 입니다.", ToastAndroid.SHORT);
    } else {
      if (filterConfirm) {
        ToastAndroid.show("추천을 취소하였습니다.", ToastAndroid.SHORT);
        setExcellent(!excellent);
        await excellentMutation();
      } else {
        ToastAndroid.show("추천하였습니다.", ToastAndroid.SHORT);
        setExcellent(!excellent);
        await excellentMutation();
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {division === "me" ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyGoalExcellent", { me, goalId, goalText })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon
              name={"thumb-up"}
              color={"#065FD4"}
              size={small ? 17 : 20}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 7,
              }}
            >
              <Text
                style={{
                  color:
                    division === "me"
                      ? "#065FD4"
                      : filterConfirm
                      ? "#065FD4"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {excellentsLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : filterConfirm ? (
        <TouchableOpacity onPress={() => excellentHandle()}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <ExpoIcon
                name={"thumb-up"}
                color={"#065FD4"}
                size={small ? 17 : 20}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 7,
              }}
            >
              <Text
                style={{
                  color:
                    division === "me"
                      ? "#065FD4"
                      : filterConfirm
                      ? "#065FD4"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {excellentsLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => excellentHandle()}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <ExpoIcon
                name={"thumb-up"}
                color={styles.lightGreyColor}
                size={small ? 17 : 20}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 7,
              }}
            >
              <Text
                style={{
                  color:
                    division === "me"
                      ? "#065FD4"
                      : filterConfirm
                      ? "#065FD4"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {excellentsLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Excellent;
