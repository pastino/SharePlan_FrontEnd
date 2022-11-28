import React, { useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExpoIcon from "../../../../../components/ExpoIcon";
import styles from "../../../../../styles";
import { FAVORITE_TOGGLE } from "./goalCommuQuery";
import { SEE_MAIN_FEED, SEE_FEED } from "../../../HomeQueries";
import { useMutation } from "react-apollo-hooks";
import { SEE_USER } from "../../../../SoulingProfile/ProfileQuery";

const Favorite = ({
  favorites,
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
  const [favorite, setFavorite] = useState(false);
  const avatar = me && me.avatar;
  const nickname = me && me.nickname;
  const id = me && me.id;

  const favoritesLength = favorites && favorites.length;

  const filterConfirm =
    favorites &&
    favorites.map((user) => user.id) &&
    favorites.map((user) => user.id).includes(id);

  const [favoriteMutation] = useMutation(FAVORITE_TOGGLE, {
    variables: {
      goalId,
      filter: filterConfirm ? true : false,
    },
    update: (proxy, { data: { favoriteToggle } }) => {
      if (communityDivision === "seeFeed") {
        const data = proxy.readQuery({
          query: SEE_FEED,
        });
        const favorite =
          data &&
          data.seeFeed &&
          data.seeFeed.filter((goal) => goal.id === goalId) &&
          data.seeFeed.filter((goal) => goal.id === goalId)[0] &&
          data.seeFeed.filter((goal) => goal.id === goalId)[0].favorites;
        if (filterConfirm === false) {
          favorite && favorite.push(favoriteToggle);
        } else {
          favorite &&
            favorite.splice(
              favorite && favorite.findIndex((user) => user.id === id),
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
        const favorite =
          data &&
          data.seeUser &&
          data.seeUser.goals &&
          data.seeUser.goals.filter((goal) => goal.id === goalId) &&
          data.seeUser.goals.filter((goal) => goal.id === goalId)[0] &&
          data.seeUser.goals.filter((goal) => goal.id === goalId)[0].favorites;

        if (filterConfirm === false) {
          favorite && favorite.push(favoriteToggle);
        } else {
          favorite &&
            favorite.splice(
              favorite && favorite.findIndex((user) => user.id === id),
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
        const favorite =
          data &&
          data.seeMainFeed &&
          data.seeMainFeed.filter((goal) => goal.id === goalId) &&
          data.seeMainFeed.filter((goal) => goal.id === goalId)[0] &&
          data.seeMainFeed.filter((goal) => goal.id === goalId)[0].favorites;

        if (filterConfirm === false) {
          favorite && favorite.push(favoriteToggle);
        } else {
          favorite &&
            favorite.splice(
              favorite && favorite.findIndex((user) => user.id === id),
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
      favoriteToggle: {
        __typename: "User",
        avatar,
        id,
        nickname,
      },
    },
  });

  const favoriteHandle = async () => {
    if (loading) {
      ToastAndroid.show("로딩중 입니다.", ToastAndroid.SHORT);
    } else {
      if (filterConfirm) {
        ToastAndroid.show("즐겨찾기를 취소하였습니다.", ToastAndroid.SHORT);
        setFavorite(!favorite);
        await favoriteMutation();
      } else {
        ToastAndroid.show("즐겨찾기 하였습니다.", ToastAndroid.SHORT);
        setFavorite(!favorite);
        await favoriteMutation();
      }
    }
  };

  return (
    <View style={{ flexDirection: "row", marginRight: 7 }}>
      {division === "me" ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyGoalFavorite", { me, goalId, goalText })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon name={"star"} color={"#ffc600"} size={small ? 20 : 27} />
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
                      ? "#ffc600"
                      : filterConfirm
                      ? "#ffc600"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {favoritesLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : filterConfirm ? (
        <TouchableOpacity onPress={() => favoriteHandle()}>
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon name={"star"} color={"#ffc600"} size={small ? 20 : 27} />
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
                      ? "#ffc600"
                      : filterConfirm
                      ? "#ffc600"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {favoritesLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => favoriteHandle()}>
          <View style={{ flexDirection: "row" }}>
            <ExpoIcon
              name={"star"}
              color={styles.lightGreyColor}
              size={small ? 20 : 27}
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
                      ? "#ffc600"
                      : filterConfirm
                      ? "#ffc600"
                      : styles.lightGreyColor,
                  fontSize: small ? 8 : 12,
                  fontWeight: "700",
                }}
              >
                {favoritesLength}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Favorite;
