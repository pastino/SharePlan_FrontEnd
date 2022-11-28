import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { useQuery, useMutation } from "react-apollo-hooks";
import contents from "../contents";
import { ADD_COMMENT, SEE_COMMENT } from "../screens/home/HomeQueries";
import styles from "../styles";
import CommentArray from "./CommentArray";
import LoadingModal from "./LoadingModal";

const Comments = ({
  id,
  seeCommentData,
  seeCommentLoading,
  myId,
  myAvatar,
  me,
  fetchMoreLoading,
  navigation,
  isLoading,
  setIsLoading,
}) => {
  const [commentDisabled, setCommentDisabled] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (text) => {
    setValue(text);
    if (text === "") {
      setCommentDisabled(true);
    } else {
      setCommentDisabled(false);
    }
  };

  const commentList =
    seeCommentData &&
    seeCommentData.seeComments &&
    seeCommentData.seeComments.slice(0).reverse();

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      text: value,
      postId: id,
    },
    refetchQueries: () => [{ query: SEE_COMMENT, variables: { postId: id } }],
    awaitRefetchQueries: true,
  });

  const commentCreateHandle = async () => {
    setIsLoading(true);
    await addCommentMutation();
    setValue("");
    setIsLoading(false);
  };
  const commentLength =
    seeCommentData &&
    seeCommentData.seeComments &&
    seeCommentData.seeComments.length;

  const repplyLengthArray =
    seeCommentData &&
    seeCommentData.seeComments &&
    seeCommentData.seeComments.map((comment) => comment.repply.length);

  return (
    <>
      <View
        style={{
          flex: 1,
          borderTopWidth: 1,
          borderTopColor: styles.lightGreyColor,
          width: contents.width,
          height: "auto",
          backgroundColor: "white",
          minHeight: 70,
        }}
      >
        {seeCommentLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator />
          </View>
        ) : commentLength === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 70,
            }}
          >
            <Text> 아직 댓글이 없습니다.</Text>
          </View>
        ) : (
          <View style={{ max: 300 }}>
            <FlatList
              data={commentList}
              keyExtractor={({ id }) => id}
              // refreshing={commentList.networkStatus === 4}
              onEndReached={() => {
                // console.log(1);
                // setFetchMoreLoading(true);
                // fetchMore({
                //   variables: {
                //     offset: offset + 1
                //   },
                //   updateQuery: (prev, { fetchMoreResult }) => {
                //     if (!fetchMoreResult) return prev;
                //     return Object.assign({}, prev, {
                //       seeCommentData: [
                //         { ...prev.seeCommentData },
                //         { ...fetchMoreResult.seeCommentData }
                //       ]
                //     });
                //   }
                // });
                // setFetchMoreLoading(false);
              }}
              ListFooterComponent={() =>
                fetchMoreLoading ? <ActivityIndicator /> : null
              }
              onEndReachedThreshold={0.1}
              renderItem={({ item }) => (
                <CommentArray
                  key={item.id}
                  {...item}
                  postId={id}
                  myId={myId}
                  myAvatar={myAvatar}
                  commentList={commentList}
                  me={me}
                  navigation={navigation}
                />
              )}
            />
          </View>
        )}
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: styles.lightGreyColor,
          width: contents.width,
          backgroundColor: "white",
          paddingBottom: 20,
        }}
      >
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Image
              source={
                myAvatar ? { uri: myAvatar } : require("../assets/noAvatar.png")
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
                marginLeft: 20,
                width: contents.width / 1.7,
                height: 40,
                borderBottomWidth: 1,
                borderBottomColor: styles.darkGreyColor,
              }}
            />
            <TouchableOpacity
              disabled={commentDisabled}
              onPress={() => commentCreateHandle()}
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
          </View>
        </>
        <LoadingModal
          isLoading={isLoading}
          loadingText={"댓글 업로드 중입니다."}
        />
      </View>
    </>
  );
};

export default Comments;
