import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import contents from "../../../contents";
import styles from "../../../styles";
import { SEE_ME, SEE_FEED, SEE_GOAL } from "../HomeQueries";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import "moment/locale/ko";
import moment from "moment";
import {
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ExpoIcon from "../../../components/ExpoIcon";
import PostDateView from "../../../components/PostDateView";

const HomeGoalStackTwo = ({ navigation }) => {
  const goalId = navigation.getParam("id");
  const division = navigation.getParam("division");
  const goalText = navigation.getParam("goalText");
  const createdHistoryDateNum = navigation.getParam("createdHistoryDateNum");

  moment.locale("ko");

  const me = navigation.getParam("me");

  const myId = me && me.id;
  const myAvatar = me && me.avatar;

  const { loading: historyLoading, data: historyData } = useQuery(SEE_GOAL, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const goalHistories =
    division === "me"
      ? historyData && historyData.seeGoal && historyData.seeGoal.goalHistories
      : navigation.getParam("goalHistories");

  const post = goalHistories && goalHistories.history;

  const privatePost = post && post.filter((post) => post.postPrivate === true);

  const createdDate =
    division === "feed"
      ? privatePost && privatePost.map((post) => post.createdAt.substr(0, 10))
      : post && post.map((post) => post.createdAt.substr(0, 10));

  const single2 =
    createdDate &&
    createdDate.filter((item, idx, array) => {
      return array.indexOf(item) === idx;
    });

  const historyViewData = [];
  for (let i = 0; i < createdHistoryDateNum; i++) {
    if (division === "feed") {
      if (
        privatePost &&
        privatePost.filter(
          (post) => post.createdAt.substr(0, 10) === single2[i]
        ) &&
        privatePost.filter(
          (post) => post.createdAt.substr(0, 10) === single2[i]
        ).length !== 0
      ) {
        historyViewData.push(
          privatePost.filter(
            (post) => post.createdAt.substr(0, 10) === single2[i]
          )
        );
      }
    } else {
      if (
        post &&
        post.filter((post) => post.createdAt.substr(0, 10) === single2[i]) &&
        post.filter((post) => post.createdAt.substr(0, 10) === single2[i])
          .length !== 0
      ) {
        historyViewData.push(
          post &&
            post.filter((post) => post.createdAt.substr(0, 10) === single2[i])
        );
      }
    }
  }

  return division === "me" && historyLoading ? (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          height: contents.height - 70 - 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={"black"} />
      </View>
    </ScrollView>
  ) : historyViewData && historyViewData.length === 0 ? (
    <ScrollView>
      <View
        style={{
          width: contents.width,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
          아직 업로드 된 게시물이 없습니다.
        </Text>
      </View>
    </ScrollView>
  ) : (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {historyViewData &&
          historyViewData
            .slice(0)
            .reverse()
            .map((post) => (
              <View
                key={Math.random().toString()}
                style={{ marginBottom: 10, marginTop: 10 }}
              >
                <View
                  style={{
                    width: contents.width,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 7,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: styles.darkGreyColor,
                      width: contents.width / 3.2,
                      marginRight: 20,
                    }}
                  />
                  <Text style={{ color: styles.darkGreyColor, fontSize: 10 }}>
                    {moment(post && post[0] && post[0].createdAt).format(
                      "YYYY년 M월 D일"
                    )}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: styles.darkGreyColor,
                      width: contents.width / 3.2,
                      marginLeft: 20,
                    }}
                  />
                </View>
                <FlatList
                  data={post}
                  keyExtractor={(item) => item.id}
                  numColumns={1}
                  inverted={true}
                  renderItem={({ item }) => (
                    <View
                      key={item.id}
                      style={{
                        width: contents.width,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        // marginLeft: 2.5,
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => {
                          navigation.navigate("HomeGoalDetail", {
                            id: item.id,
                            division,
                            data: post,
                            goalText,
                            uri: item,
                            myId,
                            myAvatar,
                            goalId,
                            historyInfoDivision: "history",
                            postPrivate: item.postPrivate,
                            user: item.user,
                            me,
                            goalFullData: historyData,
                          });
                        }}
                      >
                        {/* <Image
                          source={
                            item.files.length !== 0
                              ? { uri: item.files[0].url }
                              : require("../../../assets/basicPicture.jpg")
                          }
                          resizeMode={
                            item.files.length !== 0 ? "contain" : "cover"
                          }
                          style={{
                            borderTopRightRadius:
                              item.files.length !== 0 ? 20 : 7,
                            borderTopLeftRadius:
                              item.files.length !== 0 ? 20 : 7,
                            width: contents.width / 2.04,
                            height: contents.width / 2.04 / 1.25,
                          }}
                        /> */}

                        <View
                          style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            // borderBottomLeftRadius: 10,
                            // borderBottomRightRadius: 10,
                            marginBottom: 7,
                            width: contents.width / 1.03,
                          }}
                        >
                          <View
                            style={{
                              minHeight: !item.caption ? null : 30,
                              paddingTop: !item.caption ? 7 : 10,
                              paddingLeft: 10,
                              paddingRight: 10,
                              paddingBottom: !item.caption ? null : 7,
                              borderBottomWidth: !item.caption ? null : 0.3,
                              borderBottomColor: !item.caption
                                ? null
                                : styles.darkGreyColor,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={1}
                              style={{
                                fontSize: 12,
                                marginLeft: 10,
                                marginRight: 10,
                                textAlign: "center",
                                fontWeight: "700",
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          {!item.caption ? null : (
                            <View
                              style={{
                                paddingTop: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingBottom: 3,
                              }}
                            >
                              <Text
                                ellipsizeMode="tail"
                                numberOfLines={2}
                                style={{ fontSize: 10 }}
                              >
                                {item.caption}
                              </Text>
                            </View>
                          )}
                          <View
                            style={{
                              flexDirection: "row",
                              marginBottom: 5,
                              marginTop: 5,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <PostDateView item={item} division={"history"} />
                              {division === "feed" ? null : (
                                <View
                                  style={{
                                    marginLeft: 7,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 7,
                                      color: styles.darkGreyColor,
                                    }}
                                  >
                                    {item.postPrivate === true
                                      ? "공개"
                                      : "비공개"}
                                  </Text>
                                </View>
                              )}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginRight: 15,
                                }}
                              >
                                <ExpoIcon
                                  name={"message-processing"}
                                  size={15}
                                  color={styles.darkGreyColor}
                                />
                                <Text
                                  style={{
                                    marginLeft: 3,
                                    color: styles.darkGreyColor,
                                    fontSize: 10,
                                  }}
                                >
                                  {item.commentCounts + item.repplyCounts}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                />
              </View>
            ))}
      </ScrollView>
    </>
  );
};

export default HomeGoalStackTwo;
