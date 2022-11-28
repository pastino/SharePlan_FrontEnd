import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import contents from "../../../../../contents";
import styles from "../../../../../styles";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  CREATE_GOAL_COMMENT,
  SEE_GOAL_COMMENT,
  SEE_GOAL_COMMENT_REPPLY_COUNT,
} from "../../../HomeQueries";
import CommentArray from "../../../../../components/CommentArray";

const CardComments = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMoreFetch, setNoMoreFetch] = useState(false);

  const [value, setValue] = useState("");
  const cardColor = navigation.getParam("cardColor");
  const goalId = navigation.getParam("id");
  const me = navigation.getParam("me");

  const myId = me && me.id;
  const myAvatar = me && me.avatar;

  const onChange = (text) => {
    setValue(text);
  };

  const [createGoalCommentMutation] = useMutation(CREATE_GOAL_COMMENT, {
    variables: {
      text: value,
      goalId,
    },
    refetchQueries: () => [
      {
        query: SEE_GOAL_COMMENT_REPPLY_COUNT,
        variables: {
          goalId,
        },
      },
      {
        query: SEE_GOAL_COMMENT,
        variables: {
          goalId,
          pageNumber: 0,
          items: 10,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const { data, loading, refetch, fetchMore } = useQuery(SEE_GOAL_COMMENT, {
    variables: {
      goalId,
      pageNumber: 0,
      items: 10,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { data: counts, loading: countsLoading } = useQuery(
    SEE_GOAL_COMMENT_REPPLY_COUNT,
    {
      variables: {
        pageNumber: 0,
        items: 10,
        goalId,
      },
      fetchPolicy: "network-only",
    }
  );

  const commentList = data && data.seeGoalComment;

  const commentLength =
    counts &&
    counts.goalCommentCount &&
    counts.goalCommentCount.goalCommentsCount;
  const repplyLength =
    counts &&
    counts.goalCommentCount &&
    counts.goalCommentCount.goalReppliesCount;

  const createGoalComment = async () => {
    setIsLoading(true);
    await createGoalCommentMutation();
    setValue("");
    setIsLoading(false);
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setNoMoreFetch(false);
      await refetch({
        variables: { data },
      });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: styles.lightGreyColor,
          width: contents.width,
          minHeight: 50,
          backgroundColor: "white",
          borderBottomColor: styles.darkGreyColor,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: contents.width,
          }}
        >
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <Text style={{ fontSize: 15, fontWeight: "700" }}>댓글 &nbsp;</Text>
            {countsLoading ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={10} />
              </View>
            ) : (
              <Text style={{ fontSize: 15, fontWeight: "700" }}>
                {repplyLength + commentLength}개
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: styles.lightGreyColor,
            width: contents.width,
            height: "auto",
            backgroundColor: "white",
            minHeight: 70,
          }}
        >
          {commentLength === 0 ? (
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
                onEndReachedThreshold={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <CommentArray
                    key={item.id}
                    {...item}
                    goalId={goalId}
                    myId={myId}
                    myAvatar={myAvatar}
                    commentList={commentList}
                    me={me}
                    navigation={navigation}
                    division={"goalCard"}
                    commentId={item && item.id}
                  />
                )}
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
                onEndReached={() => {
                  noMoreFetch === true
                    ? null
                    : loading
                    ? null
                    : fetchMore({
                        variables: {
                          pageNumber:
                            data &&
                            data.seeGoalComment &&
                            data.seeGoalComment.length,
                          items: 10,
                          goalId,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (
                            fetchMoreResult &&
                            fetchMoreResult.seeGoalComment &&
                            fetchMoreResult.seeGoalComment.length === 0
                          ) {
                            setNoMoreFetch(true);
                          }
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            seeGoalComment: [
                              ...prev.seeGoalComment,
                              ...fetchMoreResult.seeGoalComment,
                            ],
                          });
                        },
                      });
                }}
                ListFooterComponent={() =>
                  loading ? (
                    <View
                      style={{
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                      }}
                    >
                      <ActivityIndicator />
                    </View>
                  ) : noMoreFetch ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 50,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "700",
                          color: styles.darkGreyColor,
                        }}
                      >
                        더이상 댓글이 없습니다.
                      </Text>
                    </View>
                  ) : null
                }
              />
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          editable={!isLoading}
          value={value}
          onChangeText={onChange}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            width: contents.width - 70,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "black",
            backgroundColor:
              cardColor === styles.Wine
                ? "#d6b2b8"
                : cardColor === styles.Sky
                ? "#c2e1fd"
                : cardColor === styles.Yellow
                ? "#e4e7c4"
                : cardColor === styles.Green
                ? "#85aa9b"
                : cardColor === styles.Blue
                ? "#8bb8e4"
                : cardColor === styles.Indigo
                ? "#dbaf80"
                : null,
          }}
        />
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => createGoalComment()}
        >
          <View
            style={{
              width: 70,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: styles.MainColor,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={{ color: "white", fontWeight: "700" }}>댓글</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CardComments;
