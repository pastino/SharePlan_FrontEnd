import React, { useState, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  UPLOAD_HISTORY_POST,
  SEE_DAYTODO,
  EDIT_POST,
  SEE_TODO_POSTS,
} from "../../home/HomeQueries";
import {
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
} from "react-native-gesture-handler";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import ExpoIcon from "../../../components/ExpoIcon";
import styles from "../../../styles";
import contents from "../../../contents";
import moment from "moment";
import LoadingModal from "../../../components/LoadingModal";
import axios from "axios";
import options from "../../../apollo";
import { NavigationActions } from "react-navigation";
import { SEE_HISTORY_ID } from "../../newQueries";

const UploadHistory = ({ navigation: { goBack }, navigation }) => {
  const item = navigation.getParam("item");
  const id = navigation.getParam("id");
  const goalId = navigation.getParam("goalId");
  const division = navigation.getParam("division");
  const postId = navigation.getParam("postId");
  const navTitle = navigation.getParam("title");
  const navCaption = navigation.getParam("caption");
  const navFiles = navigation.getParam("files");
  const navPostPrivate = navigation.getParam("postPrivate");

  const toDoList = item.toDoList;

  let [image, setImage] = useState(
    navFiles !== null && navFiles !== undefined ? navFiles : []
  );

  const cancleImageSelHandle = ({ image: cancleImageUri }) => {
    setImage(image.filter((image) => image.url !== cancleImageUri));
  };

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(
    navTitle !== null && navTitle !== undefined ? navTitle : ""
  );

  const onChageTitle = (text) => {
    setTitle(text);
  };

  const [bodyValue, setBodyValue] = useState(
    navCaption !== null && navCaption !== undefined ? navCaption : ""
  );

  const onChangeBodyValue = (text) => {
    setBodyValue(text);
  };

  const [isSwitch, setIsSwitch] = useState(true);

  const toggleSwitch = () => {
    setIsSwitch(!isSwitch);
  };

  const { data, loading } = useQuery(SEE_HISTORY_ID, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const historyId = data && data.seeHistoryid;

  const [historyUploadMutation] = useMutation(UPLOAD_HISTORY_POST, {
    refetchQueries: () => [
      {
        query: SEE_TODO_POSTS,
        variables: {
          toDoId: id,
        },
      },
    ],
    awaitRefetchQueries: true,
    update: (proxy, { data: { historyUpload } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      const newToDo = data && data.dayToDoes;
      newToDo.splice(
        newToDo.findIndex((obj) => obj.id === item.id),
        1,
        historyUpload
      );
      proxy.writeQuery({ query: SEE_DAYTODO, data });
    },
    optimisticResponse: {
      historyUpload: {
        __typename: "DayToDo",
        id: item.id,
        toDoList: item.toDoList,
        color: item.color,
        complete: item.complete,
        startDate: item.startDate,
        startTime: item.startTime,
        endDate: item.endDate,
        endTime: item.endTime,
        alrams: item.alrams,
        memo: item.memo,
        goal: item.goal,
        index: item.index,
        originToDoId: item.originToDoId,
        user: item.user,
        posts: item.posts.concat({
          __typename: "Posts",
          id: Math.random().toString(),
          title: title,
        }),
      },
    },
  });

  const historyUpload = async () => {
    if (historyId !== undefined && historyId !== null) {
      try {
        if (image.length > 0) {
          setIsLoading(true);
          const formData = new FormData();
          const imageCompArray = [];
          for (let i = 0; i < image.length; i++) {
            const resizedPhoto = await ImageManipulator.manipulateAsync(
              image[i].url,
              [{ resize: { width: 1200 } }],
              { compress: 0.7, format: "jpeg" }
            );
            imageCompArray.push(resizedPhoto.uri);
          }

          for (let i = 0; i < image.length; i++) {
            formData.append("file", {
              name: imageCompArray[i],
              type: "image/jpeg",
              uri: imageCompArray[i],
            });
          }

          const {
            data: { location },
          } = await axios.post(
            options.httpLink.toString() + "/api/upload",
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );

          await historyUploadMutation({
            variables: {
              caption: bodyValue,
              files: location,
              postRatio: image.map((image) => image.postRatio),
              title: title,
              assortment: "history",
              goalHistoryId: historyId,
              postPrivate: isSwitch,
              goalId: item.goal.id,
              toDoId: id,
            },
          });
          setIsLoading(false);
          if (division === "home") {
            goBack();
          } else {
            navigation.navigate("CalendarCreateToDo", { division: "complete" });
          }
        } else {
          setIsLoading(true);
          await historyUploadMutation({
            variables: {
              caption: bodyValue,
              title: title,
              assortment: "history",
              goalHistoryId: historyId,
              postPrivate: isSwitch,
              goalId: item.goal.id,
              toDoId: id,
            },
          });
          setIsLoading(false);
          if (division === "home") {
            goBack();
          } else {
            navigation.navigate("CalendarCreateToDo", { division: "complete" });
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setImage([]);
        setTitle("");
        setBodyValue("");
      }
    } else {
      ToastAndroid.show(
        "죄송합니다. 다시 클릭 부탁드립니다.",
        ToastAndroid.SHORT
      );
    }
  };

  const [editPostMutation] = useMutation(EDIT_POST, {
    refetchQueries: () => [
      {
        query: SEE_TODO_POSTS,
        variables: {
          toDoId: id,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const editHandle = async () => {
    if (
      title === navTitle &&
      bodyValue === navCaption &&
      image === navFiles &&
      isSwitch === navPostPrivate
    ) {
      ToastAndroid.show("변동사항이 없습니다", ToastAndroid.SHORT);
    } else {
      if (!title) {
        ToastAndroid.show("제목을 입력해주세요", ToastAndroid.SHORT);
      } else {
        setIsLoading(true);
        if (image !== navFiles && image.length > 0) {
          const formData = new FormData();
          const imageCompArray = [];
          for (let i = 0; i < image.length; i++) {
            const resizedPhoto = await ImageManipulator.manipulateAsync(
              image[i].url,
              [{ resize: { width: 1200 } }],
              { compress: 0.7, format: "jpeg" }
            );
            imageCompArray.push(resizedPhoto.uri);
          }
          for (let i = 0; i < image.length; i++) {
            formData.append("file", {
              name: imageCompArray[i],
              type: "image/jpeg",
              uri: imageCompArray[i],
            });
          }

          const {
            data: { location },
          } = await axios.post(
            options.httpLink.toString() + "/api/upload",
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
          console.log(location);
          const {
            data: { editPost },
          } = await editPostMutation({
            variables: {
              id: postId,
              caption: bodyValue,
              title: title,
              postPrivate: isSwitch,
              files: location,
              postRatio: image.map((image) => image.postRatio),
              goalId,
              toDoId: id,
            },
          });
        } else if (image !== navFiles && image.length === 0) {
          const {
            data: { editPost },
          } = await editPostMutation({
            variables: {
              id: postId,
              caption: bodyValue,
              title: title,
              postPrivate: isSwitch,
              files: [],
              goalId,
              toDoId: id,
            },
          });
        } else if (image === navFiles) {
          const {
            data: { editPost },
          } = await editPostMutation({
            variables: {
              id: postId,
              caption: bodyValue,
              title: title,
              postPrivate: isSwitch,
              files: null,
              goalId,
              toDoId: id,
            },
          });
        }
        setIsLoading(false);
      }
      goBack();
    }
  };

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 60,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          flexDirection: "row",
        }}
      >
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ExpoIcon name={"chevron-left"} />
            <Text style={{ fontWeight: "700" }}>히스토리 작성</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 30,
            }}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#999999" }}
              thumbColor={isSwitch ? "#58CC95" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isSwitch}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              {isSwitch ? "공개" : "비공개"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              division === "edit" ? editHandle() : historyUpload()
            }
          >
            <View
              style={{
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ExpoIcon name={"check"} size={30} />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: styles.darkGreyColor,
                }}
              >
                완료
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              width: contents.width,
              padding: 10,
              flexDirection: "row",
              minHeight: 50,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
            }}
          >
            <View
              style={{
                width: contents.width / 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ExpoIcon
                name={"target"}
                color={styles.darkGreyColor}
                size={20}
              />
              <Text
                style={{
                  fontSize: 9,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                목표
              </Text>
            </View>

            <View
              style={{
                width: contents.width / 1.3,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {item && item.goal && item.goal.goalText}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: contents.width,
              padding: 10,
              flexDirection: "row",
              minHeight: 50,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
            }}
          >
            <View
              style={{
                width: contents.width / 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ExpoIcon
                name={"format-list-bulleted"}
                color={styles.darkGreyColor}
                size={20}
              />
              <Text
                style={{
                  fontSize: 9,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                해야할 일
              </Text>
            </View>

            <View
              style={{
                width: contents.width / 1.3,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {toDoList}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: contents.width,
              padding: 10,
              flexDirection: "row",
              minHeight: 50,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
            }}
          >
            <TextInput
              style={{
                width: contents.width,
                height: 50,
                paddingLeft: 10,
                paddingRight: 30,
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20,
                fontWeight: "700",
              }}
              placeholder={"제목"}
              value={title}
              onChangeText={onChageTitle}
            />
          </View>
          <View
            style={{
              width: contents.width,
              padding: 10,
              flexDirection: "row",
              minHeight: 50,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
            }}
          >
            <TextInput
              style={{
                width: contents.width,
                height: 300,
                paddingLeft: 10,
                paddingRight: 20,
                fontSize: 15,
                justifyContent: "flex-start",
                textAlignVertical: "top",
              }}
              multiline={true}
              numberOfLines={4}
              placeholder={"해당 일정에 대한 히스토리를 남겨 간직해보세요."}
              value={bodyValue}
              onChangeText={onChangeBodyValue}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: styles.moreLightGrey }}>
            <TouchableOpacity
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  quality: 1,
                });
                if (!result.cancelled) {
                  setImage(
                    image.concat({
                      url: result.uri,
                      postRatio: parseFloat(
                        Math.floor((result.width / result.height) * 100) / 100
                      ),
                    })
                  );
                }
              }}
              style={{
                alignItems: "flex-end",
                paddingRight: 20,
                paddingTop: 10,
              }}
            >
              <ExpoIcon name={"image-plus"} color={styles.darkGreyColor} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", padding: 10, marginTop: 20 }}>
              <ScrollView horizontal>
                {image.map((image) => (
                  <View
                    style={{ marginRight: 10, width: 180, height: 130 }}
                    key={Math.random().toString()}
                  >
                    <Image
                      source={{ uri: image.url }}
                      style={{
                        width: 180,
                        height: 130,
                        borderRadius: 7,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => cancleImageSelHandle({ image: image.url })}
                      style={{
                        position: "absolute",
                        right: 3,
                        top: 0,
                      }}
                    >
                      <View style={{}}>
                        <ExpoIcon
                          name={"close"}
                          color={styles.darkGreyColor}
                          size={25}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <LoadingModal
        isLoading={isLoading}
        loadingText={"히스토리를 업로드 중입니다."}
      />
    </>
  );
};

export default UploadHistory;

// <View
// style={{
//   flex: 1,
//   flexDirection: "column",
// }}
// >
// <View
//   style={{
//     backgroundColor: "white",
//     borderRadius: 10,
//     width: contents.width,
//     height: "auto",
//   }}
// >
//   <View
//     style={{
//       width: 320,
//       height: 70,
//       borderRadius: 10,
//       paddingLeft: 20,
//       paddingRight: 20,
//       marginTop: 20,
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 10,
//         marginTop: 2,
//         marginLeft: 5,
//       }}
//     >
//       목표
//     </Text>
//     <View
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 5,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 15,
//           fontWeight: "700",
//           textAlign: "center",
//         }}
//       >
//         {item && item.goal && item.goal.goalText}
//       </Text>
//     </View>
//   </View>
//   <View
//     style={{
//       width: 320,
//       height: 70,
//       borderTopColor: styles.lightGreyColor,
//       borderTopWidth: 1,
//       borderBottomColor: styles.lightGreyColor,
//       borderBottomWidth: 1,
//       paddingLeft: 20,
//       paddingRight: 20,
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 10,
//         marginTop: 10,
//         marginLeft: 5,
//       }}
//     >
//       완료한 일
//     </Text>
//     <View
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 5,
//       }}
//     >
//       <Text
//         ellipsizeMode="tail"
//         numberOfLines={2}
//         style={{
//           fontSize: 12,
//           fontWeight: "700",
//           paddingLeft: 7,
//           paddingRight: 7,
//         }}
//       >
//         {value}
//       </Text>
//     </View>
//   </View>
//   <View
//     style={{
//       width: 320,
//       paddingLeft: 20,
//       paddingRight: 20,
//       borderBottomColor: styles.lightGreyColor,
//       borderBottomWidth: 1,
//     }}
//   >
//     <View
//       style={{
//         width: 320,
//         height: 70,
//         marginTop: 10,
//         marginRight: 10,
//         flexDirection: "column",
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 10,
//           position: "absolute",
//           zIndex: 1,
//           top: 3,
//           left: 5,
//         }}
//       >
//         공개설정
//       </Text>
//       <View
//         style={{
//           flexDirection: "column",
//           height: 70,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//             height: 70,
//             marginTop: 7,
//           }}
//         >
//           <SlideToggle
//             isSwitch={isSwitch}
//             onPressHandle={onSwitchHandle}
//             // disabled={isLoading}
//           />

//           <View
//             style={{
//               marginLeft: 10,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 12,
//               }}
//             >
//               {isSwitch ? "공개" : "비공개"}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   </View>
//   <>
//     <View
//       style={{
//         width: 320,
//         marginTop: 10,
//         paddingLeft: 20,
//         paddingRight: 20,
//         borderBottomColor: styles.lightGreyColor,
//         borderBottomWidth: 1,
//         paddingBottom: 10,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 10,
//           marginLeft: 5,
//         }}
//       >
//         내용
//       </Text>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 5,
//         }}
//       >
//         <TextInput
//           value={completeValue}
//           onChangeText={completeOnChange}
//           editable={isLoading ? false : true}
//           placeholder={"자유롭게 글을 남겨주세요."}
//           multiline={true}
//           numberOfLines={4}
//           style={{
//             width: 280,
//             height: 100,
//             padding: 10,
//             justifyContent: "flex-start",
//             textAlignVertical: "top",
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.8,
//             shadowRadius: 1,
//             elevation: 1,
//             borderRadius: 1,
//             borderWidth: 1,
//             borderColor: "#ddd",
//             borderBottomWidth: 0,
//           }}
//         />
//       </View>
//     </View>

//     <View
//       style={{
//         width: 320,
//         minHeight: 70,
//         marginTop: 10,
//         paddingBottom: 10,
//         flexDirection: "column",
//         paddingLeft: 20,
//         paddingRight: 20,
//         borderBottomColor: styles.lightGreyColor,
//         borderBottomWidth: 1,
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 10,
//             marginTop: 2,
//             marginLeft: 5,
//           }}
//         >
//           사진
//         </Text>
//         <TouchableOpacity
//           style={{ marginRight: 20 }}
//           //   disabled={isLoading}
//           onPress={async () => {
//             let result = await ImagePicker.launchImageLibraryAsync({
//               mediaTypes: ImagePicker.MediaTypeOptions.Images,
//               allowsEditing: true,
//               aspect: [5.5, 4],
//               quality: 1,
//             });
//             if (!result.cancelled) {
//               setImage(image.concat(result.uri));
//             }
//           }}
//         >
//           <ExpoIcon name={"image-plus"} size={27} />
//         </TouchableOpacity>
//       </View>
//       <View style={{ flexDirection: "row" }}>
//         <ScrollView horizontal>
//           {image.map((uri) => (
//             <View key={Math.random().toString()}>
//               <Image
//                 source={{ uri }}
//                 style={{
//                   width: 57,
//                   height: 57,
//                   borderRadius: 10,
//                   marginRight: 7,
//                 }}
//               />
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//       <TouchableOpacity
//         style={{ position: "absolute", top: -5, right: 5 }}
//         onPress={() => {
//           setAddInfoImage(false);
//           setImage([]);
//         }}
//       >
//         <ExpoIcon name={"close"} size={20} />
//       </TouchableOpacity>
//     </View>
//   </>
//   {addInfoWrite && addInfoImage ? null : (
//   <View
//     style={{
//       flexDirection: "row",
//       marginTop: 7,
//       marginBottom: 7,
//       paddingLeft: 20,
//       paddingRight: 20,
//     }}
//   >
//     {addInfoWrite ? null : (
//       <TouchableOpacity
//         onPress={() => setAddInfoWrite(!addInfoWrite)}
//       >
//         <View>
//           <View style={{ width: 40 }}>
//             <ExpoIcon name={"label"} size={40} />
//             <View
//               style={{
//                 position: "absolute",
//                 width: 35,
//                 height: 42,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <ExpoIcon
//                 name={"fountain-pen-tip"}
//                 size={15}
//                 color={"white"}
//               />
//             </View>
//           </View>
//           <View
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ fontSize: 10 }}>내용</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     )}
//     {addInfoImage ? null : (
//       <TouchableOpacity
//         onPress={() => setAddInfoImage(!addInfoImage)}
//       >
//         <View style={{ marginLeft: 10 }}>
//           <View style={{ width: 40 }}>
//             <ExpoIcon name={"label"} size={40} />
//             <View
//               style={{
//                 position: "absolute",
//                 width: 35,
//                 height: 42,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <ExpoIcon name={"image"} size={15} color={"white"} />
//             </View>
//           </View>
//           <View
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ fontSize: 10 }}>사진</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     )}
//   </View>
// )}
// </View>
// </View>
