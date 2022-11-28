import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import contents from "../../../../../contents";
import styles from "../../../../../styles";
import { TextInput } from "react-native-gesture-handler";
import Textarea from "react-native-textarea";
import axios from "axios";
import options from "../../../../../apollo";
import { useMutation } from "react-apollo-hooks";
import { UPLOAD_POST, EDIT_POST, DELETE_POST } from "../../../HomeQueries";
import Loader from "../../../../../components/Loader";
import { SEE_GOAL } from "../../../HomeQueries";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import SlideToggle from "../../../../../components/SlideToggle";
import moment from "moment";

const InformationCreate = ({ navigation }) => {
  const goalInformations = navigation.getParam("goalInformations");
  const assortment = navigation.getParam("assortment");
  const title = navigation.getParam("title");
  const caption = navigation.getParam("caption");
  const route = navigation.getParam("route");
  const post = navigation.getParam("post");
  const uri = navigation.getParam("uri");
  const goalId = navigation.getParam("goalId");
  const id = navigation.getParam("id");
  const historyInfoDivision = navigation.getParam("historyInfoDivision");
  const postPrivate = navigation.getParam("postPrivate");
  const postsData = navigation.getParam("data");

  const goalFullData = navigation.getParam("goalFullData");

  const [popupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleValue, setTitleValue] = useState();
  const [bodyValue, setBodyValue] = useState("");
  const [isSwitch, setIsSwitch] = useState(
    postPrivate !== undefined ? postPrivate : true
  );

  const [switchDisabled, setSwitchDisabled] = useState(false);

  const onPressHandle = () => {
    setIsSwitch(!isSwitch);
  };

  const [image, setImage] = useState([]);

  useEffect(() => {
    setIsSwitch(postPrivate !== undefined ? postPrivate : true);
  }, []);

  useEffect(() => {
    if (historyInfoDivision !== "history") {
      if (!bodyValue && image.length === 0) {
        setSwitchDisabled(true);
        setIsSwitch(false);
      } else if (bodyValue || image.length > 0) {
        setSwitchDisabled(false);
      }
      if ((route !== "detail" && bodyValue) || image.length > 0) {
        setSwitchDisabled(false);
        setIsSwitch(true);
      }
    }
  }, [bodyValue, image]);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("죄송합니다. 사진을 업로드 하기 위해 권한을 허용해주세요.");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const [uploadPostMutation] = useMutation(UPLOAD_POST, {
    refetchQueries: () => [{ query: SEE_GOAL, variables: { goalId } }],
    awaitRefetchQueries: true,
  });

  const [editPostMutation] = useMutation(EDIT_POST, {
    refetchQueries: () => [{ query: SEE_GOAL, variables: { goalId } }],
    awaitRefetchQueries: true,
  });

  const [deletePostMutation] = useMutation(DELETE_POST, {
    refetchQueries: () => [{ query: SEE_GOAL, variables: { goalId } }],
    awaitRefetchQueries: true,
  });

  const titleChangeValue = (text) => {
    setTitleValue(text);
  };

  const bodyChangeValue = (text) => {
    setBodyValue(text);
  };

  const verifyRoute = () => {
    if (route === "detail") {
      setTitleValue(title);
      setBodyValue(caption);
    }
  };

  useEffect(() => {
    verifyRoute();
  }, []);

  const uploadHandle = async () => {
    if (!titleValue) {
      ToastAndroid.show("제목을 입력해주세요", ToastAndroid.SHORT);
    } else if (!bodyValue) {
      ToastAndroid.show("내용을 입력해주세요", ToastAndroid.SHORT);
    } else if (image.length !== 0) {
      setIsLoading(true);
      const formData = new FormData([]);
      for (let i = 0; i < image.length; i++) {
        formData.append("file", {
          name: image[i],
          type: "image/jpeg",
          uri: image[i],
        });
      }
      try {
        const {
          data: { location },
        } = await axios.post(options.uri.toString() + "/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        const {
          data: { upload },
        } = await uploadPostMutation({
          variables: {
            caption: bodyValue,
            title: titleValue,
            assortment,
            goalInformationId: goalInformations && goalInformations.id,
            files: location,
            postPrivate: isSwitch,
            goalId,
          },
        });
        if (historyInfoDivision === "history") {
          navigation.navigate("HomeGoalStackTwo");
        } else {
          navigation.navigate("HomeGoalStack");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else if (image.length === 0) {
      setIsLoading(true);
      await uploadPostMutation({
        variables: {
          caption: bodyValue,
          title: titleValue,
          assortment,
          goalInformationId: goalInformations && goalInformations.id,
          files: null,
          postPrivate: isSwitch,
          goalId,
        },
      });
      setIsLoading(false);
      if (historyInfoDivision === "history") {
        navigation.navigate("HomeGoalStackTwo");
      } else {
        navigation.navigate("HomeGoalStack");
      }
    }
  };

  const goalFullPosts =
    goalFullData && goalFullData.seeGoal && goalFullData.seeGoal.posts;

  const publicPost =
    goalFullPosts &&
    goalFullPosts.filter(
      (postObj) => postObj.postPrivate === true && postObj.id !== post.id
    );

  const postDate = publicPost && publicPost.map((post) => post.createdAt);

  const latestCreatedAt =
    publicPost && publicPost.length === 0
      ? new Date(0)
      : postDate &&
        postDate.reduce(function (previous, current) {
          return previous > current ? previous : current;
        });

  const whenPublic =
    parseInt(moment(post && post.createdAt).format("YYYYMDHHMMSS")) >
    parseInt(moment(latestCreatedAt).format("YYYYMDHHMMSS"))
      ? true
      : false;

  const editHandle = async () => {
    if (
      title === titleValue &&
      caption === bodyValue &&
      postPrivate === isSwitch
    ) {
      ToastAndroid.show("변동사항이 없습니다", ToastAndroid.SHORT);
    } else {
      if (!titleValue) {
        ToastAndroid.show("제목을 입력해주세요", ToastAndroid.SHORT);
      } else {
        setIsLoading(true);
        if (isSwitch) {
          if (whenPublic === true) {
            const {
              data: { editPost },
            } = await editPostMutation({
              variables: {
                id: post.id,
                caption: bodyValue,
                title: titleValue,
                postPrivate: isSwitch,
                goalId,
                latestCreatedAt: post && post.createdAt,
              },
            });
          } else {
            const {
              data: { editPost },
            } = await editPostMutation({
              variables: {
                id: post.id,
                caption: bodyValue,
                title: titleValue,
                postPrivate: isSwitch,
              },
            });
          }
        } else {
          const {
            data: { editPost },
          } = await editPostMutation({
            variables: {
              id: post.id,
              caption: bodyValue,
              title: titleValue,
              postPrivate: isSwitch,
              goalId,
              latestCreatedAt,
            },
          });
        }
        setIsLoading(false);
        navigation.navigate("HomeGoalDetail", {
          title: titleValue,
          caption: bodyValue,
          postPrivate: isSwitch,
          uploadVerify: true,
        });
      }
    }
  };

  const deleteHandle = async () => {
    setPopupVisible(false);
    setIsLoading(true);
    await deletePostMutation({
      variables: {
        id: post.id,
        goalId,
        latestCreatedAt,
      },
    });
    setIsLoading(false);
    if (historyInfoDivision === "history") {
      navigation.navigate("HomeGoalStackTwo");
    } else {
      navigation.navigate("HomeGoalStack");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* <View
        style={{
          width: contents.width,
          height: 60,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            {historyInfoDivision === "information"
              ? route === "detail"
                ? "Information 수정"
                : "Information 생성"
              : "history 수정"}
          </Text>
        </View>
      </View> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <>
              <View
                style={{
                  flexDirection: "row",
                  width: contents.width / 1.03,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: contents.width / 2,
                    height: 60,
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "black",
                      position: "absolute",
                      zIndex: 1,
                      top: 3,
                      left: 3,
                    }}
                  >
                    공개설정
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: switchDisabled ? 10 : 70,
                      marginTop: switchDisabled ? 17 : null,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {switchDisabled ? (
                      <View>
                        <Text style={{ fontSize: 10 }}>
                          내용/사진이 없을 시 공개설정이 불가합니다.
                        </Text>
                      </View>
                    ) : null}
                    <SlideToggle
                      disabled={switchDisabled}
                      isSwitch={isSwitch}
                      onPressHandle={onPressHandle}
                    />
                    {switchDisabled ? null : (
                      <View
                        style={{
                          marginLeft: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            color: "black",
                          }}
                        >
                          {isSwitch ? "공개" : "비공개"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  {route === "detail" ? (
                    <TouchableOpacity onPress={() => setPopupVisible(true)}>
                      <Modal
                        isVisible={popupVisible}
                        onBackdropPress={() => setPopupVisible(false)}
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
                              borderRadius: 10,
                              width: 270,
                              height: 130,
                            }}
                          >
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 80,
                                borderBottomWidth: 1,
                                borderBottomColor: styles.lightGreyColor,
                              }}
                            >
                              <Text style={{ textAlign: "center" }}>
                                정말로 삭제하시겠습니까?
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity
                                onPress={() => setPopupVisible(false)}
                              >
                                <View
                                  style={{
                                    width: 135,
                                    height: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRightWidth: 1,
                                    borderRightColor: styles.lightGreyColor,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: styles.BlueSky,
                                      fontWeight: "700",
                                    }}
                                  >
                                    아니오
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => deleteHandle()}>
                                <View
                                  style={{
                                    width: 135,
                                    height: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: styles.BlueSky,
                                      fontWeight: "700",
                                    }}
                                  >
                                    예
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                      <View
                        style={{
                          width: contents.width / 5,
                          height: contents.height / 20,
                          backgroundColor: styles.MainColor,
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 5,
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: "700" }}>
                          삭제
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    onPress={() =>
                      route === "detail" ? editHandle() : uploadHandle()
                    }
                  >
                    <View
                      style={{
                        width: contents.width / 5,
                        height: contents.height / 20,
                        backgroundColor: styles.MainColor,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "700" }}>
                        {route === "detail" ? "수정" : "저장"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  width: contents.width / 1.03,
                  height: contents.height / 12,
                  marginTop: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ position: "absolute", top: 5, left: 5 }}>
                  <Text style={{ fontSize: 10 }}>제목</Text>
                </View>

                <TextInput
                  value={titleValue}
                  onChangeText={titleChangeValue}
                  style={{
                    width: contents.width / 1.2,
                    height: contents.height / 20,
                    backgroundColor: "white",
                    borderBottomWidth: 1,
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
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 5,
                    fontSize: 10,
                  }}
                >
                  내용
                </Text>
                <Textarea
                  defaultValue={bodyValue}
                  onChangeText={bodyChangeValue}
                  containerStyle={{
                    height: contents.height / 2.25,
                    width: contents.width / 1.1,
                    padding: 5,
                    backgroundColor: styles.moreLightGrey,
                    borderRadius: 10,
                  }}
                  style={{
                    textAlignVertical: "top", // hack android
                    height: contents.height / 2.3,
                    fontSize: 14,
                    color: "#333",
                    padding: 10,
                  }}
                  maxLength={3000}
                  placeholder={
                    "희망을 담은 목표를 위한 어떤 글이든 적어보세요."
                  }
                  placeholderTextColor={"#c7c7c7"}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  width: contents.width / 1.03,
                  height: contents.height / 5,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 5,
                    fontSize: 10,
                  }}
                >
                  사진
                </Text>
                <View
                  style={{
                    margin: 10,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  {route === "detail" ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>
                        Image는 수정이 불가합니다
                      </Text>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    disabled={route === "detail" ? true : false}
                    onPress={async () => {
                      if (image.length > 4) {
                        ToastAndroid.show(
                          "이미지는 5장 이상 업로드가 불가합니다.",
                          ToastAndroid.SHORT
                        );
                      } else {
                        let result = await ImagePicker.launchImageLibraryAsync({
                          mediaTypes: ImagePicker.MediaTypeOptions.Images,
                          allowsEditing: true,
                          aspect: [5.5, 4],
                          quality: 1,
                        });
                        if (!result.cancelled) {
                          setImage(image.concat(result.uri));
                        }
                      }
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: contents.width / 7,
                        height: contents.height / 30,
                        backgroundColor:
                          route === "detail"
                            ? styles.darkGreyColor
                            : styles.MainColor,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 13,
                          fontWeight: "700",
                        }}
                      >
                        Photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <ScrollView horizontal>
                    {route === "detail"
                      ? uri && uri.files && uri.files.length !== 0
                        ? uri.files.map((file) => (
                            <Image
                              key={Math.random().toString()}
                              source={{ uri: file.url }}
                              style={{
                                width: contents.width / 4,
                                height: contents.height / 10,
                                marginTop: 10,
                                borderRadius: 10,
                                marginLeft: 3,
                              }}
                            />
                          ))
                        : null
                      : image
                      ? image.map((image) => (
                          <Image
                            key={Math.random().toString()}
                            source={{ uri: image }}
                            style={{
                              width: contents.width / 4,
                              height: contents.height / 10,
                              marginTop: 10,
                              borderRadius: 10,
                              marginLeft: 3,
                            }}
                          />
                        ))
                      : null}
                  </ScrollView>
                </View>
              </View>
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationCreate;
