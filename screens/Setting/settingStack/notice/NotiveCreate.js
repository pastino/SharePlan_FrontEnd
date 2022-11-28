import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Textarea from "react-native-textarea";
import contents from "../../../../contents";
import styles from "../../../../styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "react-apollo-hooks";
import { CREATE_NOTICE, SEE_NOTICE } from "../../SettingQueries";

const NoticeCreate = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const userId = navigation.getParam("userId");

  const bodyOnChange = text => {
    setBodyValue(text);
  };

  const titleOnChange = text => {
    setTitleValue(text);
  };

  const [createNoticeMutation] = useMutation(CREATE_NOTICE, {
    variables: {
      title: titleValue,
      text: bodyValue,
      userId
    },
    refetchQueries: () => [{ query: SEE_NOTICE }],
    awaitRefetchQueries: true
  });

  const createNoticeHandle = async () => {
    setIsLoading(true);
    await createNoticeMutation();
    setIsLoading(false);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "white",
          width: contents.width / 1.03,
          height: 100,
          marginTop: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            position: "absolute",
            left: 5,
            top: 5,
            fontSize: 10
          }}
        >
          제목
        </Text>
        <TextInput
          value={titleValue}
          onChangeText={titleOnChange}
          style={{
            width: contents.width / 1.1,
            height: 40,
            backgroundColor: styles.lightGreyColor,
            borderRadius: 10
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          width: contents.width / 1.03,
          height: contents.height / 2,
          marginTop: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            position: "absolute",
            left: 5,
            top: 5,
            fontSize: 10
          }}
        >
          내용
        </Text>
        <Textarea
          defaultValue={bodyValue}
          onChangeText={bodyOnChange}
          containerStyle={{
            height: contents.height / 2.25,
            width: contents.width / 1.1,
            padding: 5,
            backgroundColor: styles.moreLightGrey,
            borderRadius: 10
          }}
          style={{
            textAlignVertical: "top", // hack android
            height: contents.height / 2.3,
            fontSize: 14,
            color: "#333",
            padding: 10
          }}
          maxLength={3000}
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
        />
      </View>
      <TouchableOpacity onPress={() => createNoticeHandle()}>
        <View
          style={{
            width: 150,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: styles.MainColor,
            borderRadius: 10,
            marginTop: 30
          }}
        >
          {isLoading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={{ color: "white", fontWeight: "700" }}>
              공지사항 올리기
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NoticeCreate;
