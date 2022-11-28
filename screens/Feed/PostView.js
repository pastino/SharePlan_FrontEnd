import React, { useState } from "react";
import Souling from "./PostPresenter/Souling";
import Complete from "./PostPresenter/Complete";
import ScrollableTabView from "react-native-scrollable-tab-view";
import styles from "../../styles";
import PostContainer from "./PostContainer";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ORDERING_BASIC_SETTING, FEED_ORDERING } from "../home/HomeQueries";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import SearchBar from "../../components/SearchBar";
import contents from "../../contents";
import ExpoIcon from "../../components/ExpoIcon";
import Modal from "react-native-modal";
import ModalButton from "../../components/ModalButton";
import FavoriteView from "./PostPresenter/FavoriteView";
import { SEE_ME_BASIC_DATA } from "../newQueries";

const PostView = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderingModal, setOrderingModal] = useState(false);
  const [isBasicSetting, setIsBasicSetting] = useState(false);

  const onChange = (text) => {
    setValue(text);
    if (!text) {
      setShouldFetch(false);
    }
  };
  const onSumitHandle = () => {
    setShouldFetch(true);
  };

  const { data, loading } = useQuery(SEE_ME_BASIC_DATA, {
    fetchPolicy: "cache-and-network",
  });

  const me = data && data.seeMeBasicData;

  const { data: feedOrdering } = useQuery(FEED_ORDERING, {
    fetchPolicy: "cache-only",
  });

  const basicOrdering =
    feedOrdering &&
    feedOrdering.seeFeedOrdering &&
    feedOrdering.seeFeedOrdering.feedOrdering !== undefined
      ? feedOrdering &&
        feedOrdering.seeFeedOrdering &&
        feedOrdering.seeFeedOrdering.feedOrdering
      : "업로드";

  const [ordering, setOrdering] = useState(basicOrdering);

  const [orderingBasicSettingMutation] = useMutation(ORDERING_BASIC_SETTING, {
    refetchQueries: () => [{ query: FEED_ORDERING }],
  });

  const orderingHandle = async ({ ordering }) => {
    if (isBasicSetting === true) {
      setOrdering(ordering);
      setIsLoading(true);
      await orderingBasicSettingMutation({
        variables: {
          ordering,
        },
      });
      setIsLoading(false);
      setOrderingModal(!orderingModal);
      setIsBasicSetting(false);
    } else {
      setOrdering(ordering);
      setOrderingModal(!orderingModal);
      setIsBasicSetting(false);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          width: contents.width,
          justifyContent: "space-around",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <SearchBar
            value={value}
            setValue={setValue}
            onChange={onChange}
            onSubmit={() => onSumitHandle()}
            setShouldFetch={setShouldFetch}
          />
        </View>
        <TouchableOpacity onPress={() => setOrderingModal(!orderingModal)}>
          <View
            style={{
              marginTop: 7,
              width: contents.width / 5,
              height: 40,
              backgroundColor: styles.MainColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ExpoIcon name={"view-sequential"} color={"white"} size={17} />
              <Text style={{ color: "white" }}> | </Text>
              <Text style={{ color: "white", fontSize: 10, fontWeight: "700" }}>
                {ordering}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={orderingModal}
          onBackdropPress={() => {
            isLoading ? null : setOrderingModal(!orderingModal);
            setIsBasicSetting(false);
          }}
          onRequestClose={() => {
            isLoading ? null : setOrderingModal(!orderingModal);
            setIsBasicSetting(false);
          }}
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
                alignItems: "center",
                width: 300,
                height: 250,
              }}
            >
              <View style={{}}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    보기 순서를 변경하여 목표카드를 구경하세요.
                  </Text>
                </View>
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
                  <>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <View style={{ marginRight: 20 }}>
                        <ModalButton
                          text="업로드 순"
                          onPress={() => orderingHandle({ ordering: "업로드" })}
                          backColor={
                            ordering === "업로드"
                              ? styles.darkGreyColor
                              : styles.MainColor
                          }
                          textColor={"white"}
                          width={100}
                          height={50}
                          disabled={ordering === "업로드" ? true : false}
                        />
                      </View>
                      <ModalButton
                        text="추천 순"
                        onPress={() => orderingHandle({ ordering: "추천" })}
                        backColor={
                          ordering === "추천"
                            ? styles.darkGreyColor
                            : styles.MainColor
                        }
                        textColor={"white"}
                        width={100}
                        height={50}
                        disabled={ordering === "추천" ? true : false}
                      />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <View style={{ marginRight: 20 }}>
                        <ModalButton
                          text="클로버 순"
                          onPress={() => orderingHandle({ ordering: "클로버" })}
                          backColor={
                            ordering === "클로버"
                              ? styles.darkGreyColor
                              : styles.MainColor
                          }
                          textColor={"white"}
                          width={100}
                          height={50}
                          disabled={ordering === "클로버" ? true : false}
                        />
                      </View>
                      <ModalButton
                        text="즐겨찾기 순"
                        onPress={() => orderingHandle({ ordering: "즐겨찾기" })}
                        backColor={
                          ordering === "즐겨찾기"
                            ? styles.darkGreyColor
                            : styles.MainColor
                        }
                        textColor={"white"}
                        width={100}
                        height={50}
                        disabled={ordering === "즐겨찾기" ? true : false}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ marginRight: 10 }}>
                        {isBasicSetting === false ? (
                          <TouchableOpacity
                            onPress={() => setIsBasicSetting(true)}
                          >
                            <ExpoIcon name={"checkbox-blank-outline"} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setIsBasicSetting(false)}
                          >
                            <ExpoIcon name={"checkbox-marked"} />
                          </TouchableOpacity>
                        )}
                      </View>
                      <Text style={{ fontSize: 13 }}>기본으로 설정하기</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollableTabView
        initialPage={0}
        onChangeTab={() => {
          setShouldFetch(false);
          setValue("");
        }}
        style={{ backgroundColor: "white" }}
        tabBarActiveTextColor={styles.MainColor}
        tabBarUnderlineStyle={{
          backgroundColor: styles.MainColor,
          height: 3,
        }}
      >
        <PostContainer
          navigation={navigation}
          me={me}
          tabLabel="전체"
          value={value}
          setValue={setValue}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          ordering={ordering}
        />

        <Souling
          navigation={navigation}
          me={me}
          tabLabel="롤모델"
          value={value}
          setValue={setValue}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          ordering={ordering}
        />
        <FavoriteView
          navigation={navigation}
          me={me}
          tabLabel="즐겨찾기"
          value={value}
          setValue={setValue}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          ordering={ordering}
        />
        <Complete
          navigation={navigation}
          me={me}
          tabLabel="완료된 목표"
          value={value}
          setValue={setValue}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          ordering={ordering}
        />
        {/* <GoalDateOrder
          navigation={navigation}
          seeMe={seeMe}
          tabLabel="목표일순"
          value={value}
          setValue={setValue}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          ordering={ordering}
        /> */}
      </ScrollableTabView>
    </>
  );
};

export default PostView;
