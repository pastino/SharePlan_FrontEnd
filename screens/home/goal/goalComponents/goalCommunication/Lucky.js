import React, { useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExpoIcon from "../../../../../components/ExpoIcon";
import styles from "../../../../../styles";
import { LUCKY_TOGGLE } from "./goalCommuQuery";
import { SEE_MAIN_FEED, SEE_FEED } from "../../../HomeQueries";
import { useMutation } from "react-apollo-hooks";
import { SEE_USER } from "../../../../SoulingProfile/ProfileQuery";

const Lucky = ({
  luckies,
  goalId,
  filtering,
  me,
  loading,
  small,
  ordering,
  division,
  navigation,
  communityDivision,
  user,
  goalText,
}) => {
  const [lucky, setLucky] = useState(false);
  const avatar = me && me.avatar;
  const nickname = me && me.nickname;
  const id = me && me.id;

  const luckiesLength = luckies && luckies.length;

  const filterConfirm =
    luckies &&
    luckies.map((user) => user.id) &&
    luckies.map((user) => user.id).includes(id);

  const [luckyMutation] = useMutation(LUCKY_TOGGLE, {
    variables: {
      goalId,
      filter: filterConfirm ? true : false,
    },
    update: (proxy, { data: { luckyToggle } }) => {
      if (communityDivision === "seeFeed") {
        const data = proxy.readQuery({
          query: SEE_FEED,
        });
        const lucky =
          data &&
          data.seeFeed &&
          data.seeFeed.filter((goal) => goal.id === goalId) &&
          data.seeFeed.filter((goal) => goal.id === goalId)[0] &&
          data.seeFeed.filter((goal) => goal.id === goalId)[0].luckies;
        if (filterConfirm === false) {
          lucky && lucky.push(luckyToggle);
        } else {
          lucky &&
            lucky.splice(lucky && lucky.findIndex((user) => user.id === id), 1);
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
        const lucky =
          data &&
          data.seeUser &&
          data.seeUser.goals &&
          data.seeUser.goals.filter((goal) => goal.id === goalId) &&
          data.seeUser.goals.filter((goal) => goal.id === goalId)[0] &&
          data.seeUser.goals.filter((goal) => goal.id === goalId)[0].luckies;

        if (filterConfirm === false) {
          lucky && lucky.push(luckyToggle);
        } else {
          lucky &&
            lucky.splice(lucky && lucky.findIndex((user) => user.id === id), 1);
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
        const lucky =
          data &&
          data.seeMainFeed &&
          data.seeMainFeed.filter((goal) => goal.id === goalId) &&
          data.seeMainFeed.filter((goal) => goal.id === goalId)[0] &&
          data.seeMainFeed.filter((goal) => goal.id === goalId)[0].luckies;

        if (filterConfirm === false) {
          lucky && lucky.push(luckyToggle);
        } else {
          lucky &&
            lucky.splice(lucky && lucky.findIndex((user) => user.id === id), 1);
        }
        proxy.writeQuery({
          query: SEE_MAIN_FEED,
          data,
        });
      }
    },
    optimisticResponse: {
      luckyToggle: {
        __typename: "User",
        avatar,
        id,
        nickname,
      },
    },
  });

  const luckyHandle = async () => {
    if (loading) {
      ToastAndroid.show("로딩중 입니다.", ToastAndroid.SHORT);
    } else {
      if (filterConfirm) {
        ToastAndroid.show("행운을 취소하였습니다.", ToastAndroid.SHORT);
        setLucky(!lucky);
        await luckyMutation();
      } else {
        ToastAndroid.show("행운을 빌어주셨습니다.", ToastAndroid.SHORT);
        setLucky(!lucky);
        await luckyMutation();
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
            navigation.navigate("MyGoalLucky", { me, goalId, goalText })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon
              name={"clover"}
              color={"#008000"}
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
                      ? "#008000"
                      : filterConfirm
                      ? "#008000"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {luckiesLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : filterConfirm ? (
        <TouchableOpacity onPress={() => luckyHandle()}>
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon
              name={"clover"}
              color={"#008000"}
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
                      ? "#008000"
                      : filterConfirm
                      ? "#008000"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {luckiesLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => luckyHandle()}>
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon
              name={"clover"}
              color={styles.lightGreyColor}
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
                      ? "#008000"
                      : filterConfirm
                      ? "#008000"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {luckiesLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Lucky;
