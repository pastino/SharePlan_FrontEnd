import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_COMMENT } from "../../home/HomeQueries";
import { ScrollView } from "react-native-gesture-handler";
import contents from "../../../contents";
import styles from "../../../styles";
import Comments from "../../../components/Comments";
import { SEE_ME_BASIC_DATA } from "../../newQueries";

const HistoryConment = ({ navigation }) => {
  const id = navigation.getParam("id");
  const commentCounts = navigation.getParam("commentCounts");
  const repplyCounts = navigation.getParam("repplyCounts");
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, refetch } = useQuery(SEE_COMMENT, {
    variables: {
      postId: id,
    },
    fetchPolicy: "network-only",
  });

  const { data: meData, loading: meLoading } = useQuery(SEE_ME_BASIC_DATA, {
    fetchPolicy: "network-only",
  });

  const myId =
    meData &&
    meData.seeMeBasicData &&
    meData.seeMeBasicData &&
    meData.seeMeBasicData.id;
  const myAvatar =
    meData &&
    meData.seeMeBasicData &&
    meData.seeMeBasicData &&
    meData.seeMeBasicData.avatar;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: contents.width,
          height: 60,
          borderBottomWidth: 1,
          borderBottomColor: styles.lightGreyColor,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 14,
            color: styles.darkGreyColor,
          }}
        >
          댓글
        </Text>
        <Text
          style={{
            marginLeft: 10,
            color: styles.darkGreyColor,
            fontWeight: "700",
          }}
        >
          {commentCounts + repplyCounts}개
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Comments
          id={id}
          seeCommentData={data}
          seeCommentLoading={loading}
          myId={myId}
          myAvatar={myAvatar}
          me={meData}
          fetchMoreLoading={fetchMoreLoading}
          navigation={navigation}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </View>
    </View>
  );
};

export default HistoryConment;
