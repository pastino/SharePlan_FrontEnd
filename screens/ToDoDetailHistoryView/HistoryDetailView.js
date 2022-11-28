import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

import contents from "../../contents";
import ExpoIcon from "../../components/ExpoIcon";
import styles from "../../styles";

import PostEditDel from "./PostEditDel";

const HistoryDetailView = ({ navigation }) => {
  const toDoId = navigation.getParam("toDoId");
  const id = navigation.getParam("id");
  const title = navigation.getParam("title");
  const caption = navigation.getParam("caption");
  const postPrivate = navigation.getParam("postPrivate");
  const user = navigation.getParam("user");
  const files = navigation.getParam("files");
  const likes = navigation.getParam("likes");
  const goal = navigation.getParam("goal");
  const dayTodo = navigation.getParam("dayTodo");

  const likeCount = navigation.getParam("likeCount");
  const assortment = navigation.getParam("assortment");
  const goalInformation = navigation.getParam("goalInformation");
  const goalHistory = navigation.getParam("goalHistory");
  const comments = navigation.getParam("comments");
  const commentCounts = navigation.getParam("commentCounts");
  const repplyCounts = navigation.getParam("repplyCounts");
  const createdAt = navigation.getParam("createdAt");
  const updatedAt = navigation.getParam("updatedAt");
  const item = navigation.getParam("item");
  const division = navigation.getParam("division");
  const myData = navigation.getParam("myData");

  const a = moment();
  const b = moment(createdAt);

  const minuteCreated = a.diff(b, "minutes"); // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            width: contents.width,
            backgroundColor: "white",
            marginBottom: 10,
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SoulerProfile", {
                  userId: user && user.id,
                  me: myData,
                })
              }
            >
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Image
                  source={
                    user && user.avatar
                      ? { uri: user.avatar }
                      : require("../../assets/noAvatar.png")
                  }
                  style={{ width: 40, height: 40, borderRadius: 30 }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {user && user.nickname}
                  </Text>

                  <Text style={{ color: styles.darkGreyColor, fontSize: 10 }}>
                    {minuteCreated < 60
                      ? `${minuteCreated}분 전`
                      : hourCreated < 24
                      ? `${hourCreated}시간 전`
                      : dayCreated < 7
                      ? `${dayCreated}일 전`
                      : weekCreated < 5
                      ? `${weekCreated}주 전`
                      : monthCreated < 12
                      ? `${monthCreated}개월 전`
                      : `${yearCreated}년 전`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {division === "me" ? (
              <PostEditDel
                navigation={navigation}
                toDoId={toDoId}
                goal={goal}
                postId={id}
                item={item}
                title={title}
                caption={caption}
                files={files}
                postPrivate={postPrivate}
              />
            ) : null}
          </View>
          <View>
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 17,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {title}
              </Text>
              <View
                style={{
                  marginTop: 10,
                  paddingLeft: 10,
                  paddingRight: 20,
                  width: contents.width,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  {caption}
                </Text>
              </View>
            </View>
            {files && files.length > 0
              ? files.map((file) => (
                  <View key={file.id} style={{ marginTop: 10 }}>
                    <Image
                      source={{ uri: file.url }}
                      style={{
                        width: contents.width,
                        height: contents.width / file.postRatio,
                      }}
                    />
                  </View>
                ))
              : null}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HistoryExcellent", { likes })}
            >
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: "row",
                  padding: 17,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpoIcon
                  name={"thumb-up"}
                  size={23}
                  color={styles.darkGreyColor}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    marginLeft: 10,
                    fontSize: 13,
                    color: styles.darkGreyColor,
                  }}
                >
                  {likes && likes.length}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("HistoryConment", {
                  id,
                  commentCounts,
                  repplyCounts,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 17,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpoIcon
                  name={"comment-processing-outline"}
                  size={23}
                  color={styles.darkGreyColor}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 13,
                    color: styles.darkGreyColor,
                    marginLeft: 10,
                  }}
                >
                  {commentCounts + repplyCounts}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: "white",
              borderTopColor: styles.lightGreyColor,
              borderTopWidth: 1,
            }}
          >
            {/* <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          {String(user && user.id) === String(me && me.id) ? (
            <TalkModifyView talkId={id} talkText={talkText} />
          ) : null}
        </View> */}
            <View
              style={{
                width: contents.width / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <TouchableOpacity
              style={{
                width: contents.width / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("HistoryConment", {
                  id,
                  commentCounts,
                  repplyCounts,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ExpoIcon
                    name={"comment-processing-outline"}
                    size={23}
                    color={styles.darkGreyColor}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor,
                    }}
                  >
                    댓글쓰기
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryDetailView;
