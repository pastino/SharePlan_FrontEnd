import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import contents from "../../../contents";
import styles from "../../../styles";
import ExpoIcon from "../../../components/ExpoIcon";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME, SEE_FEED } from "../HomeQueries";
import Loader from "../../../components/Loader";
import AutoHeightImage from "react-native-auto-height-image";

const Container = styled.View`
  margin-left: 4.5px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${props => props.theme.lightGreyColor};
  background-color: white;
  width: ${contents.width / 2 - 7};
  height: auto;
`;
const Touchable = styled.TouchableOpacity``;
const NickName = styled.Text`
  font-weight: 700;
`;
const LikeCount = styled.Text`
  font-family: "flower";
  color: ${props => props.theme.darkGreyColor};
`;

const HomeGoalStack = ({ navigation }) => {
  const goalId = navigation.getParam("id");
  const division = navigation.getParam("division");

  const { loading, data: seeMe, refetch } = useQuery(SEE_ME, {
    fetchPolicy: "network-only"
  });

  const { loading: feedLoading, data: seeFeed } = useQuery(SEE_FEED, {
    fetchPolicy: "network-only"
  });

  const user = seeMe && seeMe.me;

  const goalInformations =
    division === "me"
      ? seeMe &&
        seeMe.me &&
        seeMe.me.goals.filter(goal => goal.id === goalId) &&
        seeMe.me.goals.filter(goal => goal.id === goalId)[0].goalInformations
      : division === "feed"
      ? seeFeed &&
        seeFeed.seeFeed &&
        seeFeed.seeFeed.filter(goal => goal.id === goalId) &&
        seeFeed.seeFeed.filter(goal => goal.id === goalId)[0].goalInformations
      : null;

  const post = goalInformations && goalInformations.information;

  const [isLike, setIsLike] = useState(false);

  const isLikeHandle = () => {
    setIsLike(!isLike);
  };

  return feedLoading || loading ? (
    <Loader />
  ) : (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexDirection: "row" }}>
          {post &&
            post.map(post => (
              <Container key={post.id} style={{ height: "auto" }}>
                <View key={post.id} style={{}}>
                  {post && post.files && post.files.length > 0 ? (
                    <View
                      style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        overflow: "hidden"
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate("ImageView", { file: post.files })
                        }
                      >
                        <AutoHeightImage
                          source={{
                            uri:
                              post &&
                              post.files &&
                              post.files[0] &&
                              post.files[0].url
                          }}
                          resizeMode="contain"
                          width={contents.width / 2}
                        />
                        {post && post.files && post.files.length >= 2 ? (
                          <Text
                            style={{
                              position: "absolute",
                              right: 10,
                              bottom: 10,
                              fontSize: 10,
                              color: styles.MainColor,
                              fontWeight: "700"
                            }}
                          >
                            {post && post.files && post.files.length} pages
                          </Text>
                        ) : null}
                      </TouchableWithoutFeedback>
                    </View>
                  ) : null}
                </View>
                {division === "feed" ? (
                  <View style={{ flexDirection: "row", margin: 10 }}>
                    <Touchable>
                      <Image
                        source={
                          user && user.avatar
                            ? { uri: user.avatar }
                            : require("../../../assets/noAvatar.png")
                        }
                        resizeMode={"contain"}
                        style={{
                          width: contents.width / 11,
                          height: contents.height / 23,
                          borderRadius: 25
                        }}
                      />
                    </Touchable>
                    <View style={{ paddingLeft: 8 }}>
                      <NickName>{user.nickname}</NickName>
                    </View>
                  </View>
                ) : null}
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      padding: 10,
                      fontFamily: "flower"
                    }}
                  >
                    {post.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginBottom: 10,
                    marginTop: 5
                  }}
                >
                  {isLike ? (
                    <TouchableOpacity onPress={() => isLikeHandle()}>
                      <ExpoIcon
                        name={"heart"}
                        color={styles.redColor}
                        size={20}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => isLikeHandle()}>
                      <ExpoIcon name={"heart-outline"} size={20} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={{ marginLeft: 5 }}>
                    <ExpoIcon name={"message-processing"} size={20} />
                  </TouchableOpacity>
                </View>

                {division === "me" ? (
                  <View style={{ position: "absolute", bottom: 10, right: 10 }}>
                    <TouchableOpacity>
                      <ExpoIcon name={"square-edit-outline"} size={20} />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </Container>
            ))}
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: contents.width / 10,
          height: contents.height / 22,
          backgroundColor: styles.MainColor,
          borderRadius: 10,
          position: "absolute",
          right: 10,
          bottom: 10
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("InformationCreate", {
              goalInformations,
              assortment: "information"
            })
          }
        >
          <ExpoIcon name={"plus"} color={"white"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeGoalStack;
