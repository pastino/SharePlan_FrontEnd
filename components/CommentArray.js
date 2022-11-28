import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import styles from "../styles";
import moment from "moment";
import contents from "../contents";
import Modal from "react-native-modal";
import Textarea from "react-native-textarea";
import ModalButton from "./ModalButton";
import { useMutation } from "react-apollo-hooks";
import {
  UPDATE_COMMENT,
  SEE_COMMENT,
  DELETE_COMMENT,
  CREATE_REPPLY,
  DELETE_GOAL_COMMENT,
  SEE_GOAL_COMMENT,
  EDIT_GOAL_COMMENT,
  CREATE_GOAL_REPPLY,
  SEE_GOAL_COMMENT_REPPLY_COUNT,
} from "../screens/home/HomeQueries";
import Loader from "./Loader";
import ExpoIcon from "./ExpoIcon";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import CommentRepplyView from "./CommentRepplyView";
import LoadingModal from "./LoadingModal";

const CommentArray = ({
  user,
  text,
  createdAt,
  id,
  postId,
  myId,
  myAvatar,
  commentList,
  repply,
  navigation,
  me,
  commentId,
  goalId,
  division,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repplyLoading, setRepplyLoading] = useState(false);
  const [commentEditVisible, setCommentEditVisible] = useState(false);
  const [commentDeleteVisible, setCommentDeleteVisible] = useState(false);
  const [repplyVisible, setRepplyVisible] = useState(false);
  const [repplyValue, setRepplyValue] = useState("");
  const [repplyDisabled, setRepplyDisabled] = useState(true);
  const [loadingText, setLoadingText] = useState(null);

  const repplyOnChange = (text) => {
    setRepplyValue(text);
    if (text === "") {
      setRepplyDisabled(true);
    } else {
      setRepplyDisabled(false);
    }
  };

  const [value, setValue] = useState(text);
  const onChange = (text) => {
    setValue(text);
  };

  const a = moment();
  const b = moment(createdAt);

  const minuteCreated = a.diff(b, "minutes"); // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  

  const myCommentVerify = String(user && user.id) === String(myId);

  /////////////////////////

  const [updateCommentMutation] = useMutation(UPDATE_COMMENT, {
    variables: {
      commentId: id,
      text: value,
    },
    refetchQueries: () => [{ query: SEE_COMMENT, variables: { postId } }],
    awaitRefetchQueries: true,
  });

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    variables: {
      commentId: id,
    },
    refetchQueries: () => [{ query: SEE_COMMENT, variables: { postId } }],
    awaitRefetchQueries: true,
  });

  const [createRepplyMutation] = useMutation(CREATE_REPPLY, {
    variables: {
      text: repplyValue,
      commentId: id,
      postId,
    },
    refetchQueries: () => [{ query: SEE_COMMENT, variables: { postId } }],
    awaitRefetchQueries: true,
  });

  ///////////////////////////////////

  const [deleteGoalComment] = useMutation(DELETE_GOAL_COMMENT, {
    variables: {
      commentId,
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
      { query: SEE_GOAL_COMMENT_REPPLY_COUNT, variables: { goalId } },
    ],
    awaitRefetchQueries: true,
  });

  const [editGoalComment] = useMutation(EDIT_GOAL_COMMENT, {
    variables: {
      commentId,
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

  const [createGoalRepply] = useMutation(CREATE_GOAL_REPPLY, {
    variables: {
      text: repplyValue,
      commentId,
      goalId,
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
      { query: SEE_GOAL_COMMENT_REPPLY_COUNT, variables: { goalId } },
    ],
    awaitRefetchQueries: true,
  });

  ///////////////////////////////////////

  const commentSellect =
    commentList && commentList.filter((comment) => comment.id === id)[0];

  const createRepplyHandle = async () => {
    if (!repplyValue) {
      ToastAndroid.show("댓글을 적어주세요.", ToastAndroid.SHORT);
    } else {
      setRepplyLoading(true);
      if (division === "goalCard") {
        await createGoalRepply();
      } else {
        await createRepplyMutation();
      }
      setRepplyLoading(false);
      setRepplyValue("");
    }
  };

  const updateComment = async () => {
    setLoadingText("댓글 수정중 입니다.");
    setCommentEditVisible(!commentEditVisible);
    setIsLoading(true);
    if (division === "goalCard") {
      await editGoalComment();
    } else {
      await updateCommentMutation();
    }
    setIsLoading(false);
  };

  const deleteComment = async () => {
    setLoadingText("댓글 삭제중 입니다.");
    setCommentDeleteVisible(!commentDeleteVisible);
    setIsLoading(true);
    if (division === "goalCard") {
      await deleteGoalComment();
    } else {
      await deleteCommentMutation();
    }
    setIsLoading(false);
  };

  const repplyCommentVisible = () => {
    setRepplyVisible(!repplyVisible);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: styles.lightGreyColor,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
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
            marginTop: 15,
          }}
          source={
            user && user.avatar
              ? { uri: user && user.avatar }
              : require("../assets/noAvatar.png")
          }
        />
      </TouchableWithoutFeedback>
      <View style={{ width: contents.width / 1.37, marginRight: 10 }}>
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
          <Text style={{ marginLeft: 20 }}>{text}</Text>
        )}
      </View>
      {myCommentVerify ? (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => setCommentDeleteVisible(!commentDeleteVisible)}
          >
            <View style={{ width: 30, height: 20, alignItems: "center" }}>
              <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                삭제
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={{ marginLeft: 10 }}
            onPress={() => setCommentEditVisible(!commentEditVisible)}
          >
            <View style={{ width: 30, height: 20, alignItems: "center" }}>
              <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
                수정
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Modal
        isVisible={commentEditVisible}
        onBackdropPress={() =>
          isLoading ? null : setCommentEditVisible(!commentEditVisible)
        }
        onRequestClose={() =>
          isLoading ? null : setCommentEditVisible(!commentEditVisible)
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
                height: contents.height / 5,
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
                onPress={() => setCommentEditVisible(!commentEditVisible)}
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
              <TouchableOpacity onPress={() => updateComment()}>
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
        isVisible={commentDeleteVisible}
        onBackdropPress={() =>
          isLoading ? null : setCommentDeleteVisible(!commentDeleteVisible)
        }
        onRequestClose={() =>
          isLoading ? null : setCommentDeleteVisible(!commentDeleteVisible)
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
                onPress={() => setCommentDeleteVisible(!commentDeleteVisible)}
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
                onPress={() => deleteComment()}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <ActivityIndicator /> : <Text>예</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ position: "absolute", right: 20, bottom: 10 }}>
        <TouchableOpacity onPress={() => repplyCommentVisible()}>
          {repply && repply.length > 0 ? (
            <Text
              style={{
                fontWeight: "700",
                color: styles.MainColor,
                borderBottomWidth: 1,
                borderBottomColor: styles.MainColor,
                fontSize: 13,
              }}
            >
              댓글 {repply && repply.length}개
            </Text>
          ) : (
            <ExpoIcon
              name={"message-reply"}
              size={25}
              color={styles.darkGreyColor}
            />
          )}
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={repplyVisible}
        onBackdropPress={() =>
          repplyLoading ? null : setRepplyVisible(!repplyVisible)
        }
        onRequestClose={() =>
          repplyLoading ? null : setRepplyVisible(!repplyVisible)
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
                  setRepplyVisible(!repplyVisible);
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
                      : require("../assets/noAvatar.png")
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
                  {text}
                </Text>
              </View>
            </View>
            <ScrollView>
              <View>
                {commentSellect &&
                  commentSellect.repply &&
                  commentSellect.repply.map((repply) => (
                    <CommentRepplyView
                      key={repply.id}
                      {...repply}
                      myId={myId}
                      postId={postId}
                      repplyLoading={repplyLoading}
                      me={me}
                      user={user}
                      navigation={navigation}
                      visible={repplyVisible}
                      setVisible={setRepplyVisible}
                      goalId={goalId}
                      division={division}
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
              <>
                <Image
                  source={
                    myAvatar
                      ? { uri: myAvatar }
                      : require("../assets/noAvatar.png")
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
                  value={repplyValue}
                  onChangeText={repplyOnChange}
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
                  disabled={repplyDisabled}
                  onPress={() => createRepplyHandle()}
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
                        backgroundColor: repplyDisabled
                          ? styles.darkGreyColor
                          : styles.MainColor,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>답글</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal isLoading={isLoading} loadingText={loadingText} />
      <LoadingModal
        isLoading={repplyLoading}
        loadingText={"댓글 작성중 입니다."}
      />
    </View>
  );
};

export default CommentArray;
