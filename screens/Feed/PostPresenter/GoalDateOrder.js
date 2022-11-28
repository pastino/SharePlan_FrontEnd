import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import Post from "../Post";
import { ScrollView } from "react-native-gesture-handler";
import { SEE_MAIN_FEED } from "../../home/HomeQueries";
import {
  RefreshControl,
  View,
  Text,
  ActivityIndicator,
  FlatList
} from "react-native";
import styles from "../../../styles";
import Loader from "../../../components/Loader";
import { SEARCH_CARD } from "../FeedQueries";

const GoalDateOrder = ({
  navigation,
  seeMe,
  setValue,
  value,
  shouldFetch,
  setShouldFetch
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [noMoreFetch, setNoMoreFetch] = useState(false);
  const [searchNoFetch, setsearchNoFetch] = useState(false);
  const filtering = "목표일";

  const { loading, data, refetch, fetchMore } = useQuery(SEE_MAIN_FEED, {
    fetchPolicy: "network-only",
    variables: {
      pageNumber: 0,
      items: 10,
      filtering
    },
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    setNoMoreFetch(false);
    setsearchNoFetch(false);
  }, [shouldFetch]);

  const {
    loading: searchLoading,
    data: searchData,
    refetch: searchRefetch,
    fetchMore: searchFetchMore
  } = useQuery(SEARCH_CARD, {
    variables: {
      tab: "목표일",
      pageNumber: 0,
      term: value,
      items: 10
    },
    notifyOnNetworkStatusChange: true,
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });

  const searchOnRefresh = async () => {
    try {
      setRefreshing(true);
      setsearchNoFetch(false);
      await searchRefetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  const orderedGoals = data && data.seeMainFeed;
  const publicGoals = data && data.seeMainFeed;

  const me = seeMe && seeMe.me;

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setNoMoreFetch(false);
      await refetch({
        variables: { publicGoals }
      });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  useState(() => {
    setShouldFetch(false);
    setValue("");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {shouldFetch === false ? (
        orderedGoals && orderedGoals.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor
                }}
              >
                아직 생성된 목표카드가 없습니다.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={orderedGoals}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={1.5}
            renderItem={({ item }) => (
              <Post
                {...item}
                navigation={navigation}
                me={me}
                filtering={filtering}
                loading={loading}
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
                        data && data.seeMainFeed && data.seeMainFeed.length,
                      items: 10,
                      filtering: "목표일"
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult.seeMainFeed.length === 0) {
                        setNoMoreFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        seeMainFeed: [
                          ...prev.seeMainFeed,
                          ...fetchMoreResult.seeMainFeed
                        ]
                      });
                    }
                  });
            }}
            ListFooterComponent={() =>
              noMoreFetch ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor
                    }}
                  >
                    더이상 목표카드가 없습니다.
                  </Text>
                </View>
              ) : loading ? (
                <View
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                  }}
                >
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        )
      ) : (
        <>
          <View
            style={{
              paddingTop: 7,
              paddingBottom: 7,
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: "700",
                color: styles.darkGreyColor
              }}
            >
              {searchLoading ? "검색중..." : "전체 목표카드 검색결과 입니다."}
            </Text>
          </View>
          <FlatList
            data={searchData && searchData.searchCard}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <Post
                {...item}
                navigation={navigation}
                me={me}
                filtering={filtering}
                loading={loading}
              />
            )}
            refreshing={refreshing}
            onRefresh={() => searchOnRefresh()}
            onEndReached={() => {
              searchNoFetch === true
                ? null
                : searchLoading
                ? null
                : searchFetchMore({
                    variables: {
                      pageNumber:
                        searchData &&
                        searchData.searchCard &&
                        searchData.searchCard.length,
                      items: 10,
                      tab: "목표일",
                      term: value
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult.searchCard.length === 0) {
                        setsearchNoFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        searchCard: [
                          ...prev.searchCard,
                          ...fetchMoreResult.searchCard
                        ]
                      });
                    }
                  });
            }}
            ListFooterComponent={() =>
              searchNoFetch ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor
                    }}
                  >
                    더이상 목표카드가 없습니다.
                  </Text>
                </View>
              ) : searchLoading ? (
                <View
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                  }}
                >
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        </>
      )}
    </View>
  );
};

export default GoalDateOrder;
