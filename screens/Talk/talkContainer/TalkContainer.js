import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import contents from "../../../contents";
import ExpoIcon from "../../../components/ExpoIcon";
import styles from "../../../styles";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useMutation } from "react-apollo-hooks";
import { TALK_COMMENT_CREATE, SEE_TALK } from "../talkQueries";
import TalkCommentContainer from "./TalkCommentContainer";
import TalkModifyView from "./TalkModifyView";

const TalkContainer = ({
  createdAt,
  talkText,
  user,
  id,
  talkComments,
  seeMe,
  talkCommentCounts,
  talkRepplyCounts,
  navigation,
}) => {
  const [value, setValue] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentDisabled, setCommentDisabled] = useState(true);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const a = moment();
  const b = moment(createdAt);

  const minuteCreated = a.diff(b, "minutes"); // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  const onChange = (text) => {
    setValue(text);
    if (text === "") {
      setCommentDisabled(true);
    } else {
      setCommentDisabled(false);
    }
  };

  const [talkCommentCreateMutation] = useMutation(TALK_COMMENT_CREATE, {
    variables: {
      text: value,
      talkId: id,
    },
    refetchQueries: () => [
      {
        query: SEE_TALK,
        variables: {
          pageNumber: 0,
          items: 10,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const createTalkComment = async () => {
    setCommentLoading(true);
    await talkCommentCreateMutation();
    setCommentLoading(false);
    setValue("");
  };

  const wakeUpClock =
    user &&
    user.clocks &&
    user.clocks.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    ) &&
    user.clocks.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    )[0] &&
    user.clocks.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    )[0].wakeUpTime;

  const isLikeHandle = () => {
    setIsLike(!isLike);
  };

  const commentButtonHandle = () => {
    setCommentModalVisible(!commentModalVisible);
  };

  const me = seeMe && seeMe.me;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: contents.width,
          minHeight: contents.height / 7,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: styles.lightGreyColor,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("SoulerProfile", {
              userId: user && user.id,
              me: seeMe && seeMe.me,
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <Image
                source={
                  user && user.avatar
                    ? { uri: user.avatar }
                    : require("../../../assets/noAvatar.png")
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
                <Text style={{ fontSize: 13, textAlign: "center" }}>
                  {user && user.nickname}
                </Text>
                <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                  {wakeUpClock !== undefined ? `${wakeUpClock}시 기상` : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 15,
              }}
            >
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
        </TouchableWithoutFeedback>
        <View
          style={{
            marginTop: 20,
            marginBottom: 30,
            justifyContent: "center",
            alignItems: "center",
            width: contents.width,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              width: contents.width / 1.3,
              fontSize: 13,
            }}
          >
            {talkText}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            {String(user && user.id) === String(me && me.id) ? (
              <TalkModifyView talkId={id} talkText={talkText} />
            ) : null}
          </View>
          <TouchableOpacity onPress={() => commentButtonHandle()}>
            <View
              style={{
                width: 70,
                height: 30,
                alignItems: "center",
                paddingLeft: 3,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: styles.darkGreyColor,
                marginLeft: 10,
                flexDirection: "row",
              }}
            >
              <ExpoIcon
                name={"message-processing"}
                size={23}
                color={styles.darkGreyColor}
              />

              <View
                style={{
                  marginLeft: 5,
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: styles.darkGreyColor }}>
                  {talkCommentCounts + talkRepplyCounts}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
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
                      : require("../../../assets/noAvatar.png")
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
                  {talkText}
                </Text>
              </View>
            </View>

            <ScrollView>
              <View>
                {talkComments &&
                  talkComments.map((comment) => (
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
                        : require("../../../assets/noAvatar.png")
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
                  <TouchableOpacity onPress={() => createTalkComment()}>
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
      </Modal>
    </View>
  );
};

export default TalkContainer;
