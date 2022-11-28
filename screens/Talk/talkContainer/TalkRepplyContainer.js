import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import styles from "../../../styles";
import ExpoIcon from "../../../components/ExpoIcon";
import Modal from "react-native-modal";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import moment from "moment";
import contents from "../../../contents";
import { useMutation } from "react-apollo-hooks";
import { TALK_REPPLY_CREATE } from "../talkQueries";
import { SEE_TALK } from "../talkQueries";
import CommentRepplyView from "../../../components/CommentRepplyView";

const TalkRepplyContainer = ({
  commentModalVisible,
  setCommentModalVisible,
  user,
  createdAt,
  text,
  seeMe,
  id,
  talkId,
  talkRepplies,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [repplyDisabled, setRepplyDisabled] = useState(true);
  const [repplyModalVisible, setRepplyModalVisible] = useState(false);

  const talkRepplyLength = talkRepplies && talkRepplies.length;

  const repplyVisibleHandle = () => {
    setRepplyModalVisible(!repplyModalVisible);
  };

  const myAvatar = seeMe && seeMe.me && seeMe.me.avatar;
  const myId = seeMe && seeMe.me && seeMe.me.id;

  const onChange = (text) => {
    setValue(text);
    if (text) {
      setRepplyDisabled(false);
    } else {
      setRepplyDisabled(true);
    }
  };

  const a = moment();
  const b = moment(createdAt);

  const minuteCreated = a.diff(b, "minutes"); // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  const [createRepplyMutation] = useMutation(TALK_REPPLY_CREATE, {
    variables: {
      text: value,
      talkCommentId: id,
      talkId: talkId,
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

  const createRepplyHandle = async () => {
    if (!value) {
      ToastAndroid.show("댓글을 적어주세요.", ToastAndroid.SHORT);
    } else {
      setIsLoading(true);
      await createRepplyMutation();
      setIsLoading(false);
      setValue("");
    }
  };

  const me = seeMe && seeMe.me;

  return (
    <>
      <View style={{ position: "absolute", right: 20, bottom: -5 }}>
        <TouchableOpacity onPress={() => repplyVisibleHandle()}>
          {talkRepplyLength === 0 ? (
            <ExpoIcon
              name={"message-reply"}
              size={25}
              color={styles.darkGreyColor}
            />
          ) : (
            <Text
              style={{
                color: styles.MainColor,
                fontWeight: "700",
                borderBottomWidth: 1,
                borderBottomColor: styles.MainColor,
                marginBottom: 3,
              }}
            >
              댓글 {talkRepplyLength}개
            </Text>
          )}
        </TouchableOpacity>
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
                  {text}
                </Text>
              </View>
            </View>
            <ScrollView>
              <View>
                {talkRepplies &&
                  talkRepplies.map((repply) => (
                    <CommentRepplyView
                      key={repply.id}
                      {...repply}
                      myId={myId}
                      talkId={talkId}
                      division={"talk"}
                      navigation={navigation}
                      me={me}
                      setVisible={setCommentModalVisible}
                      visible={commentModalVisible}
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
                <>
                  <Image
                    source={
                      myAvatar
                        ? { uri: myAvatar }
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
                  <TouchableOpacity
                    disabled={isLoading}
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
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TalkRepplyContainer;
