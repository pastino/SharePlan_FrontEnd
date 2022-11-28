import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import contents from "../../../contents";
import styles from "../../../styles";
import ExpoIcon from "../../../components/ExpoIcon";
import PostDateView from "../../../components/PostDateView";
import { useQuery } from "react-apollo-hooks";
import { SEE_GOAL } from "../HomeQueries";

const HomeGoalStack = ({ navigation }) => {
  const goalId = navigation.getParam("id");
  const division = navigation.getParam("division");
  const goalText = navigation.getParam("goalText");
  const complete = navigation.getParam("complete");
  const me = navigation.getParam("me");

  // const goalHistoriesTest = navigation.getParam("goalHistories");

  const myId = me && me.id;
  const myAvatar = me && me.avatar;

  const { loading: informationLoading, data: informationData } = useQuery(
    SEE_GOAL,
    {
      variables: {
        goalId,
      },
      fetchPolicy: "network-only",
    }
  );

  const goalInformations =
    division === "me"
      ? informationData &&
      informationData.seeGoal &&
      informationData.seeGoal.goalInformations
      : navigation.getParam("goalInformations");

  const post = goalInformations && goalInformations.information;

  return division === "me" && informationLoading ? (
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
  ) : post && post.length === 0 ? (
    <View style={{ flex: 1, backgroundColor: styles.lightGreyColor }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            width: contents.width,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
            아직 업로드 된 게시물이 없습니다.
          </Text>
        </View>
        {complete ? null : division === "me" ? (
          <TouchableOpacity
            style={{ position: "absolute", right: 10, bottom: 10 }}
            onPress={() =>
              navigation.navigate("InformationCreate", {
                goalInformations,
                assortment: "information",
                route: "stack",
                goalId,
                historyInfoDivision: "information",
              })
            }
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                backgroundColor: styles.MainColor,
                borderRadius: 10,
              }}
            >
              <ExpoIcon name={"plus"} color={"white"} />
            </View>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  ) : (
        <View style={{ flex: 1, backgroundColor: styles.lightGreyColor }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 5,
              }}
            >
              {division === "feed"
                ? post &&
                post
                  .slice(0)
                  .reverse()
                  .filter((post) => post.postPrivate === true) &&
                post
                  .slice(0)
                  .reverse()
                  .filter((post) => post.postPrivate === true)
                  .map((item) => (
                    <View
                      key={item.id}
                      style={{
                        width: contents.width / 2.05,
                        marginLeft: 3,
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
                            historyInfoDivision: "information",
                            goalInformations,
                            postPrivate: item.postPrivate,
                            user: item.user,
                            me,

                          });
                        }}
                      >
                        <Image
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
                            borderTopLeftRadius: item.files.length !== 0 ? 20 : 7,
                            width: contents.width / 2.05,
                            height: contents.width / 2.05 / 1.25,
                          }}
                        />

                        <View
                          style={{
                            backgroundColor: "white",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            marginBottom: 5,
                            width: contents.width / 2.05,
                          }}
                        >
                          <View
                            style={{
                              minHeight: 50,
                              borderBottomWidth: 0.3,
                              borderBottomColor: styles.darkGreyColor,
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={2}
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
                          <View style={{ margin: 10, minHeight: 30 }}>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={2}
                              style={{ fontSize: 10 }}
                            >
                              {item.caption}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 10,
                              marginBottom: 10,
                              marginTop: 5,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
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
                            <View style={{ marginRight: 10 }}>
                              <PostDateView item={item} />
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ))
                : post &&
                post
                  .slice(0)
                  .reverse()
                  .map((item) => (
                    <View
                      key={item.id}
                      style={{
                        width: contents.width / 2.05,
                        marginLeft: 3,
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
                            historyInfoDivision: "information",
                            goalInformations,
                            postPrivate: item.postPrivate,
                            goalFullData: informationData,
                          });
                        }}
                      >
                        <Image
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
                            borderTopLeftRadius: item.files.length !== 0 ? 20 : 7,
                            width: contents.width / 2.05,
                            height: contents.width / 2.05 / 1.25,
                          }}
                        />
                        <View style={{ position: "absolute", top: 7, left: 10 }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: styles.lightGreyColor,
                            }}
                          >
                            {item.postPrivate === true ? "공개" : "비공개"}
                          </Text>
                        </View>
                        {item.files.length === 0 ? <View
                          style={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            width: contents.width / 2.05,
                            height: contents.width / 2.05 / 1.25,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 7,
                              color: "white",
                            }}
                          >
                            업로드 이미지 없을 시
                        </Text>
                          <Text
                            style={{
                              fontSize: 7,
                              color: "white",
                            }}
                          >
                            기본이미지 사용.
                        </Text>
                        </View> : null}
                        <View
                          style={{
                            backgroundColor: "white",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            marginBottom: 5,
                            width: contents.width / 2.05,
                          }}
                        >
                          <View
                            style={{
                              minHeight: 50,
                              borderBottomWidth: 0.3,
                              borderBottomColor: styles.darkGreyColor,
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={2}
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
                          <View style={{ margin: 10, minHeight: 30 }}>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={2}
                              style={{ fontSize: 10 }}
                            >
                              {item.caption}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 10,
                              marginBottom: 10,
                              marginTop: 5,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
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
                            <View style={{ marginRight: 10 }}>
                              <PostDateView item={item} />
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
            </View>
          </ScrollView>
          {complete ? null : division === "me" ? (
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
                bottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("InformationCreate", {
                    goalInformations,
                    assortment: "information",
                    route: "stack",
                    goalId,
                    historyInfoDivision: "information",
                  })
                }
              >
                <ExpoIcon name={"plus"} color={"white"} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      );
};

export default HomeGoalStack;
