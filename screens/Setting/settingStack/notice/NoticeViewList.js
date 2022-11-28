import React, { useState } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import contents from "../../../../contents";
import ExpoIcon from "../../../../components/ExpoIcon";
import {
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
import styles from "../../../../styles";
import { useMutation } from "react-apollo-hooks";
import { DELETE_NOTICE, SEE_NOTICE } from "../../SettingQueries";
import Loader from "../../../../components/Loader";

const NoticeViewList = ({ title, createdAt, text, userId, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const [deleteNoticeMutation] = useMutation(DELETE_NOTICE, {
    variables: {
      noticeId: id
    },
    refetchQueries: () => [{ query: SEE_NOTICE }],
    awaitRefetchQueries: true
  });

  const deleteNotice = async () => {
    setIsLoading(true);
    await deleteNoticeMutation();
    setIsLoading(false);
  };

  return (
    <View
      style={{
        marginTop: 10,
        width: contents.width / 1.03,
        height: "auto",
        minHeight: 80,
        backgroundColor: "white",
        borderRadius: 10
      }}
    >
      <View
        style={{
          margin: 15,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>{title}</Text>
          <Text
            style={{ color: styles.darkGreyColor, fontSize: 12, marginTop: 5 }}
          >
            {moment(createdAt).format("YYYY년 M월 D일")}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {collapse ? (
            <TouchableWithoutFeedback onPress={() => setCollapse(false)}>
              <ExpoIcon name={"chevron-down"} />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => setCollapse(true)}>
              <ExpoIcon name={"chevron-up"} />
            </TouchableWithoutFeedback>
          )}
          {userId === "joon5006@naver.com" ? (
            isLoading ? (
              <Loader />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: 60,
                  justifyContent: "space-between",
                  marginTop: 10
                }}
              >
                <View>
                  <TouchableOpacity onPress={() => deleteNotice()}>
                    <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
                      삭제
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ fontSize: 12, color: styles.darkGreyColor }}>
                    수정
                  </Text>
                </View>
              </View>
            )
          ) : null}
        </View>
      </View>
      {!collapse ? (
        <View style={{ margin: 15 }}>
          <Text>{text}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default NoticeViewList;
