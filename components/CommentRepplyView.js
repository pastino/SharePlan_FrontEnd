import React, { useState } from "react";
import styles from "../styles";
import contents from "../contents";
import moment from "moment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import ModalButton from "./ModalButton";
import Textarea from "react-native-textarea";
import { useMutation } from "react-apollo-hooks";
import {
  SEE_COMMENT,
  EDIT_REPPLY,
  DELETE_REPPLY,
  DELETE_GOAL_REPPLY,
  SEE_GOAL_COMMENT,
  SEE_GOAL_COMMENT_REPPLY_COUNT,
  EDIT_GOAL_REPPLY,
} from "../screens/home/HomeQueries";
import {
  TALK_REPPLY_EDIT,
  SEE_TALK,
  TALK_REPPLY_DELETE,
} from "../screens/Talk/talkQueries";
import LoadingModal from "./LoadingModal";

const CommentRepplyView = ({
  id,
  user,
  createdAt,
  text,
  myId,
  me,
  postId,
  repplyLoading,
  division,
  visible,
  setVisible,
  navigation,
  goalId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repplyModalVisible, setRepplyModalVisible] = useState(false);
  const [repplyDeleteVisible, setRepplyDeleteVisible] = useState(false);
  const [value, setValue] = useState(text);

  const [loadingText, setLoadingText] = useState(null);

  const onChange = (text) => {
    setValue(text);
  };
  const myRipplyVerify = String(user && user.id) === String(myId);

  const c = moment();
  const d = moment(createdAt);

  const repplyMinuteCreated = c.diff(d, "minutes"); // 44700
  const repplyHourCreated = c.diff(d, "hours"); // 745
  const repplyDayCreated = c.diff(d, "days"); // 31
  const repplyWeekCreated = c.diff(d, "weeks"); // 4
  const repplyMonthCreated = c.diff(d, "months");
  const repplyYearCreated = c.diff(d, "years");

  ////////////////////////////

  const [editRepplyMutation] = useMutation(EDIT_REPPLY, {
    variables: {
      repplyId: id,
      text: value,
    },
    refetchQueries: () => [{ query: SEE_COMMENT, variables: { postId } }],
    awaitRefetchQueries: true,
  });

  const [deleteRepplyMutation] = useMutation(DELETE_REPPLY, {
    variables: {
      repplyId: id,
    },
    refetchQueries: () => [{ query: SEE_COMMENT, variables: { postId } }],
    awaitRefetchQueries: true,
  });

  ////////////////////////////

  const [editTalkRepplyMutation] = useMutation(TALK_REPPLY_EDIT, {
    variables: {
      talkRepplyId: id,
      text: value,
    },
    refetchQueries: () => [{ query: SEE_TALK }],
    awaitRefetchQueries: true,
  });

  const [deleteTalkRepplyMutation] = useMutation(TALK_REPPLY_DELETE, {
    variables: {
      talkRepplyId: id,
    },
    refetchQueries: () => [{ query: SEE_TALK }],
    awaitRefetchQueries: true,
  });

  ////////////////////////////////

  const [deleteGoalRepply] = useMutation(DELETE_GOAL_REPPLY, {
    variables: { repplyId: id },
    refetchQueries: () => [
      {
        query: SEE_GOAL_COMMENT,
        variables: {
          pageNumber: 0,
          items: 10,
          goalId,
        },
      },
      { query: SEE_GOAL_COMMENT_REPPLY_COUNT, variables: { goalId } },
    ],
    awaitRefetchQueries: true,
  });

  const [editGoalRepply] = useMutation(EDIT_GOAL_REPPLY, {
    variables: {
      repplyId: id,
      text: value,
    },
    refetchQueries: () => [
      {
        query: SEE_GOAL_COMMENT,
        variables: {
          pageNumber: 0,
          items: 10,
          goalId,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  ////////////////////////

  const repplyEditHandle = async () => {
    setLoadingText("댓글 수정중 입니다");
    setRepplyModalVisible(!repplyModalVisible);
    if (value) {
      setIsLoading(true);
      if (division === "talk") {
        await editTalkRepplyMutation();
      } else if (division === "goalCard") {
        await editGoalRepply();
      } else {
        await editRepplyMutation();
      }
      setIsLoading(false);
    } else {
      ToastAndroid.show("내용을 입력해주세요", ToastAndroid.SHORT);
    }
  };

  const repplyDeleteHandle = async () => {
    setRepplyDeleteVisible(!repplyDeleteVisible);
    setLoadingText("댓글 삭제중 입니다");
    setIsLoading(true);
    if (division === "talk") {
      await deleteTalkRepplyMutation();
    } else if (division === "goalCard") {
      await deleteGoalRepply();
    } else {
      await deleteRepplyMutation();
    }
    setIsLoading(false);
  };

  return (
    <View
      key={id}
      style={{
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: styles.lightGreyColor,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(!visible);
            navigation.navigate("SoulerProfile", {
              userId: user && user.id,
              me: me,
            });
          }}
        >
          <Image
            source={
              user && user.avatar
                ? { uri: user.avatar }
                : require("../assets/noAvatar.png")
            }
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "column", width: contents.width / 1.3 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
                {repplyMinuteCreated < 60
                  ? `${repplyMinuteCreated}분 전`
                  : repplyHourCreated < 24
                  ? `${repplyHourCreated}시간 전`
                  : repplyDayCreated < 7
                  ? `${repplyDayCreated}일 전`
                  : repplyWeekCreated < 5
                  ? `${repplyWeekCreated}주 전`
                  : repplyMonthCreated < 12
                  ? `${repplyMonthCreated}개월 전`
                  : `${repplyYearCreated}년 전`}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              {myRipplyVerify ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    disabled={isLoading || repplyLoading}
                    onPress={() => setRepplyDeleteVisible(!repplyDeleteVisible)}
                  >
                    <View
                      style={{ width: 30, height: 20, alignItems: "center" }}
                    >
                      <Text
                        style={{ fontSize: 10, color: styles.darkGreyColor }}
                      >
                        삭제
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isLoading || repplyLoading}
                    style={{ marginLeft: 10 }}
                    onPress={() => setRepplyModalVisible(!repplyModalVisible)}
                  >
                    <View
                      style={{ width: 30, height: 20, alignItems: "center" }}
                    >
                      <Text
                        style={{ fontSize: 10, color: styles.darkGreyColor }}
                      >
                        수정
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <Text
            style={{
              marginLeft: 20,
              width: contents.width / 1.5,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
      <Modal
        isVisible={repplyModalVisible}
        onBackdropPress={() =>
          isLoading ? null : setRepplyModalVisible(!repplyModalVisible)
        }
        onRequestClose={() =>
          isLoading ? null : setRepplyModalVisible(!repplyModalVisible)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text style={{ fontWeight: "700" }}>댓글 수정</Text>
            </View>
            <Textarea
              autoFocus={true}
              defaultValue={value}
              onChangeText={onChange}
              containerStyle={{
                height: 180,
                width: 270,
                padding: 5,
                backgroundColor: styles.moreLightGrey,
                borderRadius: 10,
              }}
              style={{
                textAlignVertical: "top", // hack android
                height: contents.height / 2.3,
                fontSize: 14,
                color: "#333",
                padding: 10,
              }}
              placeholderTextColor={"#c7c7c7"}
              underlineColorAndroid={"transparent"}
              editable={!isLoading}
            />
            <View
              style={{
                flexDirection: "row",
                width: 300,
                height: 57,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                borderTopColor: styles.lightGreyColor,
                borderTopWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => setRepplyModalVisible(!repplyModalVisible)}
              >
                <View
                  style={{
                    width: 300 / 2,
                    height: 57,
                    borderRightWidth: 1,
                    borderRightColor: styles.lightGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => repplyEditHandle()}>
                <View
                  style={{
                    width: 300 / 2,
                    height: 57,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>완료</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={repplyDeleteVisible}
        onBackdropPress={() =>
          isLoading ? null : setRepplyDeleteVisible(!repplyDeleteVisible)
        }
        onRequestClose={() =>
          isLoading ? null : setRepplyDeleteVisible(!repplyDeleteVisible)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>댓글을 삭제하겠습니까?</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setRepplyDeleteVisible(!repplyDeleteVisible)}
                disabled={isLoading}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>아니오</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => repplyDeleteHandle()}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? (
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
                    <Text>예</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal isLoading={isLoading} loadingText={loadingText} />
    </View>
  );
};

export default CommentRepplyView;
