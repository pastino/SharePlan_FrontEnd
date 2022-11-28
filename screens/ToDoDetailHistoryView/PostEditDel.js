import React, { useState } from "react";
import styles from "../../styles";

import ExpoIcon from "../../components/ExpoIcon";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { DELETE_POST, SEE_TODO_POSTS, SEE_DAYTODO } from "../home/HomeQueries";
import { useMutation } from "react-apollo-hooks";
import LoadingModal from "../../components/LoadingModal";

const PostEditDel = ({
  navigation,
  item,
  goal,
  toDoId,
  postId,
  title,
  caption,
  files,
  postPrivate,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deletePostMutation] = useMutation(DELETE_POST, {
    update: (proxy, { data: { deletePost } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      const posts =
        data &&
        data.dayToDoes &&
        data.dayToDoes.map((toDo) => toDo.id) &&
        data.dayToDoes.filter((toDo) => toDo.id === toDoId)[0] &&
        data.dayToDoes.filter((toDo) => toDo.id === toDoId)[0].posts;

      posts &&
        posts.splice(
          posts.findIndex((obj) => obj.id === postId),
          1
        );

      proxy.writeQuery({
        query: SEE_DAYTODO,
        data,
      });
    },
    optimisticResponse: {
      deletePost: {
        __typename: "DayToDo",
        id: item.id,
        toDoList: item.toDoList,
        color: item.color,
        complete: item.complete,
        startDate: item.startDate,
        startTime: item.startTime,
        endDate: item.endDate,
        endTime: item.endTime,
        alrams: item.alrams,
        memo: item.memo,
        goal: item.goal,
        index: item.index,
        originToDoId: item.originToDoId,
        user: item.user,
        posts: {
          __typename: "Posts",
          id: postId,
        },
      },
    },
    refetchQueries: () => [{ query: SEE_TODO_POSTS, variables: { toDoId } }],
    awaitRefetchQueries: true,
  });

  const deleteHandle = async () => {
    setDeleteModal(!deleteModal);
    setIsLoading(true);
    await deletePostMutation({
      variables: {
        id: postId,
        goalId: goal && goal.id,
        toDoId,
      },
    });
    setIsLoading(false);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        paddingRight: 20,
      }}
    >
      <TouchableOpacity style={{}} onPress={() => setDeleteModal(!deleteModal)}>
        <ExpoIcon name={"delete"} size={20} color={styles.darkGreyColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() =>
          navigation.navigate("UploadHistory", {
            item,
            id: toDoId,
            postId,
            goalId: goal && goal.id,
            division: "edit",
            title,
            caption,
            files,
            postPrivate,
          })
        }
      >
        <ExpoIcon name={"pencil"} size={20} color={styles.darkGreyColor} />
      </TouchableOpacity>

      <Modal
        isVisible={deleteModal}
        onBackdropPress={() => setDeleteModal(!deleteModal)}
        onRequestClose={() => setDeleteModal(!deleteModal)}
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
              <Text style={{}}>정말로 삭제하겠습니까?</Text>
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
              <TouchableOpacity onPress={() => setDeleteModal(!deleteModal)}>
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
              <TouchableOpacity onPress={() => deleteHandle()}>
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>예</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal
        isLoading={isLoading}
        loadingText={"히스토리 삭제중 입니다."}
      />
    </View>
  );
};

export default PostEditDel;
