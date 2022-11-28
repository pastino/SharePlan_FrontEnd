import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, Text, Image, ActivityIndicator } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import contents from "../../../contents";
import ExpoIcon from "../../../components/ExpoIcon";
import styles from "../../../styles";
import Comments from "../../../components/Comments";
import { useQuery } from "react-apollo-hooks";
import { SEE_COMMENT } from "../HomeQueries";
import Modal from "react-native-modal";

const Container = styled.View`
  border-width: 1px;
  border-radius: 10px;
  border-color: ${(props) => props.theme.lightGreyColor};
  background-color: white;
  width: ${contents.width / 1.03};
  margin-top: 5px;
  margin-bottom: 5px;
`;

const HomeGoalDetail = ({ navigation }) => {
  // HomeGoalStack Params
  const id = navigation.getParam("id");
  const division = navigation.getParam("division");
  const data = navigation.getParam("data");
  const goalText = navigation.getParam("goalText");
  const uri = navigation.getParam("uri");
  const goalInformations = navigation.getParam("goalInformations");
  const postPrivate = navigation.getParam("postPrivate");
  // // InformationCreate Params
  const title = navigation.getParam("title");
  const caption = navigation.getParam("caption");
  const changePostPrivate = navigation.getParam("postPrivate");
  const myId = navigation.getParam("myId");
  const myAvatar = navigation.getParam("myAvatar");
  const goalId = navigation.getParam("goalId");
  const historyInfoDivision = navigation.getParam("historyInfoDivision");

  const goalFullData = navigation.getParam("goalFullData");

  const me = navigation.getParam("me");
  const user = navigation.getParam("user");

  const uploadVerify = navigation.getParam("uploadVerify");

  const [titleChangeValue, setTitleChangeValue] = useState();
  const [captionChangeValue, setCaptionChangeValue] = useState();
  const [changePostPrivateValue, setChangePostPrivateValue] = useState();
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const [isLoading, setIsLoading] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

  const post = data.filter((post) => post.id === id)[0];

  const {
    data: seeCommentData,
    loading: seeCommentLoading,
    fetchMore,
    refetch,
  } = useQuery(SEE_COMMENT, {
    variables: {
      postId: id,
      // limit,
      // offset
    },
    fetchPolicy: "network-only",
  });

  const commentSumLength = parseInt(
    seeCommentData &&
      seeCommentData.seeComments &&
      seeCommentData.seeComments.length
  );

  const RepplyLengthArray =
    seeCommentData &&
    seeCommentData.seeComments &&
    seeCommentData.seeComments.map((comment) => comment.repply.length);

  const repplySumLength = parseInt(
    RepplyLengthArray && RepplyLengthArray.length === 0
      ? 0
      : RepplyLengthArray && RepplyLengthArray.reduce((a, b) => a + b)
  );

  useEffect(() => {
    setTitleChangeValue(title),
      setCaptionChangeValue(caption),
      setChangePostPrivateValue(changePostPrivate);
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          {division === "feed" ? (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("SoulerProfile", {
                  userId: user && user.id,
                  me: me,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: styles.lightGreyColor,
                }}
              >
                <Image
                  source={
                    post.user.avatar
                      ? { uri: post.user.avatar }
                      : require("../../../assets/noAvatar.png")
                  }
                  resizeMode={"cover"}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 22.5,
                  }}
                />

                <View
                  style={{
                    paddingLeft: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "700" }}>
                    {post.user.nickname}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ) : null}
          {division === "me" ? (
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("InformationCreate", {
                    title: uploadVerify ? titleChangeValue : post && post.title,
                    caption: uploadVerify
                      ? captionChangeValue
                      : post && post.caption,
                    postPrivate: uploadVerify
                      ? changePostPrivateValue
                      : postPrivate,
                    url: post.files,
                    route: "detail",
                    uri,
                    post,
                    id,
                    goalId,
                    historyInfoDivision,
                    goalInformations,
                    data,
                    goalFullData,
                  })
                }
              >
                <View>
                  <ExpoIcon
                    name={"square-edit-outline"}
                    size={30}
                    color={styles.MainColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{
              margin: 10,
              marginTop: 30,
              paddingBottom: 20,
              minHeight: 150,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth:
                !post.caption && !captionChangeValue ? null : 1,
              borderBottomColor: styles.lightGreyColor,
            }}
          >
            <Text
              style={{
                color: styles.darkGreyColor,
                fontSize: 12,
                marginBottom: 17,
                textAlign: "center",
              }}
            >
              {goalText}
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {titleChangeValue ? titleChangeValue : post.title}
            </Text>
          </View>
          {!post.caption && !captionChangeValue ? null : captionChangeValue ? (
            <View
              style={{
                minHeight: 50,
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Text>{captionChangeValue}</Text>
            </View>
          ) : (
            <View
              style={{
                minHeight: 50,
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Text>{post.caption}</Text>
            </View>
          )}

          {post && post.files && post.files.length !== 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "black",
                marginBottom: 10,
              }}
            >
              <Swiper
                dotColor={styles.darkGreyColor}
                activeDotColor={styles.MainColor}
                paginationStyle={{ bottom: 10 }}
                height={"auto"}
              >
                {post &&
                  post.files &&
                  post.files.map((file) => (
                    <View
                      key={file.id}
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate("ImageView", {
                            file: post.files,
                          })
                        }
                      >
                        <Image
                          source={{
                            uri: file.url,
                          }}
                          resizeMode="contain"
                          style={{
                            width: contents.width / 1.03,
                            height: contents.width / 1.03 / 1.25,
                          }}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
              </Swiper>
            </View>
          ) : null}
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,

              alignItems: "flex-end",
              marginRight: 20,
            }}
          >
            <TouchableOpacity onPress={() => setCommentModal(!commentModal)}>
              <View
                style={{
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  paddingLeft: 3,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: styles.darkGreyColor,
                  marginLeft: 10,
                  flexDirection: "row",
                }}
              >
                <ExpoIcon
                  name={"message-processing"}
                  size={23}
                  color={styles.darkGreyColor}
                />

                <View
                  style={{
                    marginLeft: 5,
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {seeCommentLoading ? (
                    <ActivityIndicator size={10} />
                  ) : (
                    <Text style={{ color: styles.darkGreyColor }}>
                      {commentSumLength + repplySumLength}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Container>
      </View>
      <Modal
        isVisible={commentModal}
        onBackdropPress={() =>
          isLoading ? null : setCommentModal(!commentModal)
        }
        onRequestClose={() =>
          isLoading ? null : setCommentModal(!commentModal)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: contents.width,
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Comments
              id={post && post.id}
              seeCommentData={seeCommentData}
              seeCommentLoading={seeCommentLoading}
              fetchMoreLoading={fetchMoreLoading}
              myId={myId}
              myAvatar={myAvatar}
              fetchMore={fetchMore}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
              refetch={refetch}
              setFetchMoreLoading={setFetchMoreLoading}
              // likeCounts={likeCounts}
              me={me}
              navigation={navigation}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeGoalDetail;
