import React, { useState, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useMutation } from "react-apollo-hooks";
import Swiper from "react-native-swiper";
import contents from "../../contents";
import ExpoIcon from "../../components/ExpoIcon";
import styles from "../../styles";
import PostView from "./PostView";
import ReadMore from "react-native-read-more-text";
import PostEditDel from "./PostEditDel";
import { TOGGLE_LIKES, SEE_HISTORY, TOGGLE_LIKES_DELETE } from "../newQueries";

const ToDoDetailHistoryView = ({
  toDoId,
  navigation,
  id,
  title,
  caption,
  postPrivate,
  user,
  files,
  likes,
  goal,
  dayTodo,
  likeCount,
  assortment,
  goalInformation,
  goalHistory,
  comments,
  commentCounts,
  repplyCounts,
  createdAt,
  updatedAt,
  item,
  division,
  myData,
}) => {
  const a = moment();
  const b = moment(createdAt);

  const minuteCreated = a.diff(b, "minutes"); // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  const [toggleLikesMutation] = useMutation(TOGGLE_LIKES, {
    update: (proxy, { data: { toggleLike } }) => {
      const data = proxy.readQuery({
        query: SEE_HISTORY,
        variables: {
          pageNumber: 0,
          items: 10,
        },
      });
      const likes =
        data &&
        data.seeHistory &&
        data.seeHistory.filter((post) => post.id === id) &&
        data.seeHistory.filter((post) => post.id === id)[0] &&
        data.seeHistory.filter((post) => post.id === id)[0].likes;

      const likesId = likes && likes.map((user) => user.id);

      if (likesId && likesId.includes(myData && myData.id)) {
        likes &&
          likes.splice(
            likes && likes.findIndex((obj) => obj.id === myData && myData.id),
            1
          );
      } else {
        likes && likes.push(toggleLike);
      }
      proxy.writeQuery({
        query: SEE_HISTORY,
        data,
      });
    },
    optimisticResponse: {
      toggleLike: {
        __typename: "User",
        id: myData && myData.id,
        avatar: myData && myData.avatar,
        nickname: myData && myData.nickname,
      },
    },
    variables: {
      postId: id,
    },
  });

  const toggoleLikesHandle = async () => {
    await toggleLikesMutation();
  };

  const myLikes =
    likes &&
    likes.map((user) => user.id) &&
    likes.map((user) => user.id).includes(myData && myData.id);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: contents.width,
          backgroundColor: "white",
          marginBottom: 10,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          {division === "home" || division === "me" ? (
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
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("HistoryDetailView", {
              toDoId,
              navigation,
              id,
              title,
              caption,
              postPrivate,
              user,
              files,
              likes,
              goal,
              dayTodo,
              likeCount,
              assortment,
              goalInformation,
              goalHistory,
              comments,
              commentCounts,
              repplyCounts,
              createdAt,
              updatedAt,
              item,
              division,
              myData,
            })
          }
        >
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
                <ReadMore
                  numberOfLines={8}
                  renderTruncatedFooter={(handlePress) => (
                    <View style={{ width: 60 }} onPress={() => handlePress()}>
                      <Text
                        style={{
                          textAlign: "center",

                          marginTop: 17,
                          fontWeight: "700",
                          color: styles.darkGreyColor,
                          textDecorationLine: "underline",
                        }}
                      >
                        더보기
                      </Text>
                    </View>
                  )}
                  renderRevealedFooter={(handlePress) => (
                    <View style={{ width: 60 }} onPress={() => handlePress()}>
                      <Text
                        style={{
                          textAlign: "center",

                          marginTop: 17,
                          fontWeight: "700",
                          color: styles.darkGreyColor,
                          textDecorationLine: "underline",
                        }}
                      >
                        줄이기
                      </Text>
                    </View>
                  )}
                >
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    style={{
                      fontSize: 13,
                    }}
                  >
                    {caption}
                  </Text>
                </ReadMore>
              </View>
            </View>
            {files && files.length > 0 ? <PostView files={files} /> : null}
          </View>
        </TouchableWithoutFeedback>
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
          {division === "home" || division === "me" ? (
            <View
              style={{
                width: contents.width / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          ) : (
            <TouchableOpacity
              style={{
                width: contents.width / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => toggoleLikesHandle()}
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
                    name={"thumb-up"}
                    size={23}
                    color={myLikes ? styles.BlueText : styles.darkGreyColor}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 10,
                      fontWeight: "700",
                      color: myLikes ? styles.BlueText : styles.darkGreyColor,
                    }}
                  >
                    훌륭해요
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

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
      {/* <Modal
        isVisible={commentModalVisible}
        onBackdropPress={() =>
          commentLoading ? null : setCommentModalVisible(!commentModalVisible)
        }
        onRequestClose={() =>
          commentLoading ? null : setCommentModalVisible(!commentModalVisible)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 300,
              height: 150,
              width: contents.width,
              height: "auto",
              maxHeight: 400,
            }}
          >
            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: styles.lightGreyColor,
                flexDirection: "row",
                minHeight: 80,
                marginTop: 10,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setCommentModalVisible(!commentModalVisible);
                  navigation.navigate("SoulerProfile", {
                    userId: user && user.id,
                    me: me,
                  });
                }}
              >
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginLeft: 10,
                    marginTop: 25,
                  }}
                  source={
                    user && user.avatar
                      ? { uri: user && user.avatar }
                      : require("../../assets/noAvatar.png")
                  }
                />
              </TouchableWithoutFeedback>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: styles.darkGreyColor,
                      fontWeight: "700",
                    }}
                  >
                    {user && user.nickname}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 10,
                      color: styles.darkGreyColor,
                      fontWeight: "700",
                    }}
                  >
                    /
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 10,
                      color: styles.darkGreyColor,
                      fontWeight: "700",
                    }}
                  >
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
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  style={{ marginLeft: 20, width: contents.width / 1.3 }}
                >
                  {caption}
                </Text>
              </View>
            </View>

            <ScrollView>
              <View>
                {comments &&
                  comments.map((comment) => (
                    <TalkCommentContainer
                      key={comment.id}
                      {...comment}
                      seeMe={seeMe}
                      commentModalVisible={commentModalVisible}
                      setCommentModalVisible={setCommentModalVisible}
                      talkId={id}
                      navigation={navigation}
                    />
                  ))}
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "flex-end",
                minHeight: 50,
              }}
            >
              {commentLoading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <ActivityIndicator color={"black"} />
                </View>
              ) : (
                <>
                  <Image
                    source={
                      seeMe && seeMe.me && seeMe.me.avatar
                        ? { uri: seeMe && seeMe.me && seeMe.me.avatar }
                        : require("../../assets/noAvatar.png")
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  />

                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    style={{
                      width: contents.width / 1.7,
                      marginLeft: 10,
                      paddingLeft: 10,
                      marginTop: 10,
                      height: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: styles.darkGreyColor,
                    }}
                  />
                  <TouchableOpacity
                    disabled={commentDisabled}
                    onPress={() => createTalkComment()}
                  >
                    <View
                      style={{
                        marginTop: 20,
                        marginRight: 10,
                        alignItems: "flex-end",
                        marginLeft: 20,
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 60,
                          height: 30,
                          backgroundColor: commentDisabled
                            ? styles.darkGreyColor
                            : styles.MainColor,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ color: "white" }}>댓글</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default ToDoDetailHistoryView;
