import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import contents from "../contents";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import { SEE_HISTORY, SEE_ME_BASIC_DATA } from "./newQueries";
import ToDoDetailHistoryView from "./ToDoDetailHistoryView/ToDoDetailHistoryView";
import ExpoIcon from "../components/ExpoIcon";

const HistoryTab = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [noMoreFetch, setNoMoreFetch] = useState(false);
  const [searchNoFetch, setsearchNoFetch] = useState(false);

  const { data, loading, refetch, fetchMore } = useQuery(SEE_HISTORY, {
    variables: {
      pageNumber: 0,
      items: 10,
    },
    fetchPolicy: "network-only",
  });
  const { data: myData } = useQuery(SEE_ME_BASIC_DATA);

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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
          height: 60,
          width: contents.width,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ExpoIcon name={"book-open"} size={27} />
          <Text style={{ fontWeight: "700", fontSize: 10 }}>히스토리</Text>
        </View>
        <View
          style={{
            marginLeft: 15,
            justifyContent: "center",
            alignItems: "center",
            width: contents.width / 1.3,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              color: styles.darkGreyColor,
            }}
          >
            히스토리는 "홈 > 해야할 일" 탭에서
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              color: styles.darkGreyColor,
            }}
          >
            해야할 일을 선택하여 작성 가능합니다.
          </Text>
        </View>
      </View>
      {data && data.seeHistory && data.seeHistory.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              marginTop: 7,
              color: styles.darkGreyColor,
              fontSize: 12,
            }}
          >
            업로드 된 히스토리가 없습니다.
          </Text>
        </ScrollView>
      ) : (
        <FlatList
          data={data && data.seeHistory}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1.5}
          renderItem={({ item }) => (
            <ToDoDetailHistoryView
              navigation={navigation}
              {...item}
              myData={myData && myData.seeMeBasicData}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log("!23");
            onRefresh();
          }}
          onEndReached={() => {
            noMoreFetch === true
              ? null
              : loading
              ? null
              : fetchMore({
                  variables: {
                    pageNumber:
                      data && data.seeHistory && data.seeHistory.length,
                    items: 10,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (fetchMoreResult.seeHistory.length === 0) {
                      setNoMoreFetch(true);
                    }
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      seeHistory: [
                        ...prev.seeHistory,
                        ...fetchMoreResult.seeHistory,
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
                  더이상 히스토리가 존재하지 않습니다.
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default HistoryTab;
