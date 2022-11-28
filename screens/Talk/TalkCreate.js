import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../styles";
import contents from "../../contents";
import Textarea from "react-native-textarea";
import Modal from "react-native-modal";
import ModalButton from "../../components/ModalButton";
import { useMutation } from "react-apollo-hooks";
import { TALK_CREATE, SEE_TALK } from "./talkQueries";

const TalkCreate = ({ talkCreateVisible, setTalkCreateVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const onChange = (text) => {
    setValue(text);
  };

  const [talkCreateMutation] = useMutation(TALK_CREATE, {
    variables: {
      talkText: value,
      division: "good",
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

  const talkCreateHandle = async ({ create }) => {
    if (create) {
      setIsLoading(true);
      await talkCreateMutation();
      setIsLoading(false);
      setTalkCreateVisible(!talkCreateVisible);
      setValue("");
    }
  };

  const talkCreateCancle = () => {
    setTalkCreateVisible(!talkCreateVisible);
    setValue("");
  };
  return (
    <Modal
      isVisible={talkCreateVisible}
      onBackdropPress={() => (isLoading ? null : talkCreateCancle())}
      onRequestClose={() => (isLoading ? null : talkCreateCancle())}
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
                  onPress={() => talkCreateCancle()}
                  backColor={"white"}
                  textColor={"black"}
                  disabled={isLoading}
                />
              </View>
              <ModalButton
                text={"완료"}
                onPress={() => talkCreateHandle({ create: true })}
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
  );
};

export default TalkCreate;
