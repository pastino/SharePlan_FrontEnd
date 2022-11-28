import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import contents from "../../contents";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEE_USER, SOULING, UN_SOULING } from "./ProfileQuery";
import styles from "../../styles";
import moment from "moment";
import ProfileInfo from "./ProfileInfo";
import Loader from "../../components/Loader";
import { SEE_ME } from "../home/HomeQueries";
import ExpoIcon from "../../components/ExpoIcon";

const SoulerProfile = ({ navigation }) => {
  const userId = navigation.getParam("userId");
  const me = navigation.getParam("me");

  const [selectTap, setSelectTap] = useState(1);

  console.log(me);

  const { data, loading } = useQuery(SEE_USER, {
    variables: {
      id: userId,
    },
  });

  const user = data && data.seeUser;
  const avatar = user && user.avatar;
  const nickname = user && user.nickname;
  const gender = user && user.gender;
  const followers = user && user.followers;
  const following = user && user.following;
  const createdAt = user && user.createdAt;

  const meAvatar = me && me.avatar;
  const meDateOfBirth = me && me.dateOfBirth;
  const meGender = me && me.gender;
  const meId = me && me.id;
  const meNickname = me && me.nickname;
  const mePostCounts = me && me.postCounts;
  const meGoalCounts = me && me.goalCounts;

  // age Calcluate
  const dateOfBirth = user && user.dateOfBirth;
  const stringBirth = String(dateOfBirth).substring(0, 4);
  const intBirth = parseInt(stringBirth);
  const date = new Date();
  const todayYear = moment(date).format("YYYY");
  //

  const age = todayYear - intBirth + 1;

  const [soulingMutation] = useMutation(SOULING, {
    variables: {
      id: userId,
    },
    update: (proxy, { data: { follow } }) => {
      const data = proxy.readQuery({
        query: SEE_USER,
        variables: { id: userId },
      });
      data &&
        data.seeUser &&
        data.seeUser.followers &&
        data.seeUser.followers.push(follow);
      proxy.writeQuery({ query: SEE_USER, data });
    },
    optimisticResponse: {
      follow: {
        __typename: "User",
        avatar: meAvatar,
        dateOfBirth: meDateOfBirth,
        gender: meGender,
        id: meId,
        nickname: meNickname,
        postCounts: mePostCounts,
        goalCounts: meGoalCounts,
      },
    },
  });

  const [unSoulingMutation] = useMutation(UN_SOULING, {
    variables: {
      id: userId,
    },
    update: (proxy, { data: { unfollow } }) => {
      const data = proxy.readQuery({
        query: SEE_USER,
        variables: { id: userId },
      });
      data &&
        data.seeUser &&
        data.seeUser.followers &&
        data.seeUser.followers.splice(
          data &&
            data.seeUser &&
            data.seeUser.followers &&
            data.seeUser.followers.findIndex((user) => user.id === me && me.id),
          1
        );
      proxy.writeQuery({ query: SEE_USER, data });
    },
    optimisticResponse: {
      unfollow: {
        __typename: "User",
        id: meId,
      },
    },
  });

  const soulingToggle = async () => {
    if (
      data &&
      data.seeUser &&
      data.seeUser.followers.map((user) => user.id).includes(me && me.id)
    ) {
      ToastAndroid.show(
        `${nickname}님 롤모델을 취소하였습니다.`,
        ToastAndroid.SHORT
      );
      await unSoulingMutation();
    } else {
      ToastAndroid.show(
        `${nickname}님을 롤모델로 삼았습니다.`,
        ToastAndroid.SHORT
      );
      await soulingMutation();
    }
  };

  const GetFontSize = (width, length, max) => {
    var fontSize = width / length;
    var maxSize = width / max;
    fontSize = Math.min(fontSize, maxSize);
    return fontSize;
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Image
          source={require("../../assets/basicPicture.jpg")}
          style={{ width: contents.width, height: 100, opacity: 0.5 }}
        />

        <View
          style={{
            position: "absolute",
            width: 74,
            height: 74,
            left: contents.width / 2 - 35,
            bottom: -20,
            backgroundColor: "white",
            borderRadius: 37,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            disabled={avatar === null}
            onPress={() =>
              navigation.navigate("ProfileImageView", {
                file: avatar ? avatar : null,
              })
            }
          >
            <Image
              resizeMode={"cover"}
              source={
                avatar ? { uri: avatar } : require("../../assets/noAvatar.png")
              }
              style={{ width: 70, height: 70, borderRadius: 35 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 80,
          marginTop: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        ></View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: GetFontSize(130, nickname && nickname.length, 7),
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {nickname}
          </Text>
          <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
            {gender} / {age}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => soulingToggle()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ExpoIcon
              name={"human-male-male"}
              size={37}
              color={
                data &&
                data.seeUser &&
                data.seeUser.followers
                  .map((user) => user.id)
                  .includes(me && me.id)
                  ? styles.MainColor
                  : styles.darkGreyColor
              }
            />
            <Text
              style={{
                fontWeight: "700",
                fontSize: 10,
                color:
                  data &&
                  data.seeUser &&
                  data.seeUser.followers
                    .map((user) => user.id)
                    .includes(me && me.id)
                    ? styles.MainColor
                    : styles.darkGreyColor,
              }}
            >
              롤모델
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ProfileInfo
        user={user}
        me={me}
        selectTap={selectTap}
        setSelectTap={setSelectTap}
        followers={followers}
        following={following}
        navigation={navigation}
        createdAt={createdAt}
      />
    </View>
  );
};

export default SoulerProfile;
