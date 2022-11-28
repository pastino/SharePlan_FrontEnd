import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../../../styles";
import Modal from "react-native-modal";
import { useMutation } from "react-apollo-hooks";
import { TALK_DELETE, SEE_TALK, TALK_MODIFY } from "../talkQueries";
import contents from "../../../contents";
import Textarea from "react-native-textarea";
import ModalButton from "../../../components/ModalButton";

const TalkModifyView = ({ talkId, talkText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(talkText);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const onChange = (text) => {
    setValue(text);
  };

  const [talkDeleteMutation] = useMutation(TALK_DELETE, {
    variables: {
      talkId,
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

  const [talkModifyMutation] = useMutation(TALK_MODIFY, {
    variables: {
      talkId,
      talkText: value,
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

  const talkDeleteHandle = async () => {
    setIsLoading(true);
    await talkDeleteMutation();
    setIsLoading(false);
    setDeleteModal(!deleteModal);
  };

  const talkModifyHandle = async () => {
    setIsLoading(true);
    await talkModifyMutation();
    setIsLoading(false);
    setModifyModal(!modifyModal);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => setDeleteModal(!deleteModal)}>
          <Text
            style={{
              color: styles.darkGreyColor,
              fontWeight: "700",
              fontSize: 12,
            }}
          >
            삭제
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModifyModal(!modifyModal);
          setValue(talkText);
        }}
      >
        <Text
          style={{
            color: styles.darkGreyColor,
            fontWeight: "700",
            fontSize: 12,
          }}
        >
          수정
        </Text>
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
              <Text>정말로 삭제하겠습니까?</Text>
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
                onPress={() => setDeleteModal(!deleteModal)}
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
                onPress={() => talkDeleteHandle()}
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
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator />
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
      <Modal
        isVisible={modifyModal}
        onBackdropPress={() =>
          isLoading ? null : setModifyModal(!modifyModal)
        }
        onRequestClose={() => (isLoading ? null : setModifyModal(!modifyModal))}
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
              backgroundColor: styles.BlueSky,
              alignItems: "center",
              justifyContent: "center",
              width: contents.width / 1.1,
              height: 400,
            }}
          >
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                욕설 및 상대를 비방하는 글을 올릴 시
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                대화방 사용이 불가할 수 있습니다.
              </Text>
            </View>
            <>
              <Textarea
                editable={!isLoading}
                defaultValue={value}
                onChangeText={onChange}
                containerStyle={{
                  height: 250,
                  width: contents.width / 1.2,
                  borderRadius: 10,
                  backgroundColor: styles.moreLightGrey,
                }}
                style={{
                  textAlignVertical: "top", // hack android
                  width: contents.width / 1.2,
                  height: 250,
                  fontSize: 12,
                  color: "#333",
                  padding: 10,
                }}
                placeholder={"남을 위한 행동을 할 때 나에게 행운이 찾아옵니다."}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ marginRight: 30 }}>
                  <ModalButton
                    text={"취소"}
                    onPress={() => {
                      setModifyModal(!modifyModal);
                    }}
                    backColor={"white"}
                    textColor={"black"}
                    disabled={isLoading}
                  />
                </View>
                <ModalButton
                  text={"완료"}
                  onPress={() => talkModifyHandle()}
                  backColor={"white"}
                  textColor={"black"}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </View>
            </>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TalkModifyView;
