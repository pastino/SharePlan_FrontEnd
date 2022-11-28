import React, { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ExpoIcon from "../components/ExpoIcon";
import styles from "../styles";
import moment from "moment";
import contents from "../contents";
import {
  DELETE_TODO,
  SEE_DAYTODO,
  COMPLETE_TODO,
  SEE_TODO_POSTS,
} from "./home/HomeQueries";
import { useMutation, useQuery } from "react-apollo-hooks";
import Modal from "react-native-modal";
import { NavigationActions } from "react-navigation";
import ToDoDetailHistoryView from "./ToDoDetailHistoryView/ToDoDetailHistoryView";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ToDoDetailDivScroll from "./ToDoDetailHistoryView/ToDoDetailDivScroll";

const ToDoDetail = ({ navigation: { goBack }, navigation }) => {
  const item = navigation.getParam("item");
  const division = navigation.getParam("division");
  const meData = navigation.getParam("meData");
  const startDate = item.startDate;

  const endDate = item.endDate;

  const toDoList = item.toDoList;
  const alrams = item.alrams;
  const memo = item.memo;
  const complete = item.complete;
  const color = item.color;
  const goal = item.goal;
  const originToDoId = item.originToDoId;

  const id = item.id;
  const startTime = item.startTime;
  const endTime = item.endTime;
  const goalText = goal !== null ? goal.goalText : null;
  const goalId = goal !== null ? goal.id : null;
  const sale = goal !== null ? item.goal.sale : null;
  const index = item.index;

  const [deleteReConfirmModal, setDeleteReConfirmModal] = useState(false);

  const deleteToDoConfirmVisible = () => {
    setDeleteReConfirmModal(!deleteReConfirmModal);
  };

  const [deleteToDoMutation] = useMutation(DELETE_TODO, {
    variables: {
      id: item.id,
    },
    update: (proxy, { data: { deleteToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      data &&
        data.dayToDoes &&
        data.dayToDoes.splice(
          data &&
            data.dayToDoes &&
            data.dayToDoes.findIndex((obj) => obj.id === item.id),
          1
        );
      proxy.writeQuery({
        query: SEE_DAYTODO,
        data,
      });
    },
    optimisticResponse: {
      deleteToDo: {
        __typename: "DayToDo",
        id: item.id,
      },
    },
  });

  const toDoDelete = async () => {
    setDeleteReConfirmModal(!deleteReConfirmModal);
    if (division === "home") {
      navigation.navigate(
        NavigationActions.navigate({
          routeName: "TabNavigation",
          action: NavigationActions.navigate({
            routeName: "Tab1",
            action: NavigationActions.navigate({
              routeName: "HomeDiv",
              action: NavigationActions.navigate({
                routeName: "Home",
              }),
            }),
          }),
        })
      );
    } else {
      navigation.navigate("CalendarCreateToDo", { division: "delete" });
    }
    // goBack();
    await deleteToDoMutation();
  };

  const [toDoCompleteMutation] = useMutation(COMPLETE_TODO, {
    variables: { toDoId: item.id, complete: !item.complete },
    update: (proxy, { data: { completeToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      const newToDo = data && data.dayToDoes;
      newToDo.splice(
        newToDo.findIndex((obj) => obj.id === item.id),
        1,
        completeToDo
      );
      proxy.writeQuery({
        query: SEE_DAYTODO,
        data,
      });
    },
    optimisticResponse: {
      completeToDo: {
        __typename: "DayToDo",
        id: item.id,
        toDoList: item.toDoList,
        color: item.color,
        complete: !item.complete,
        startDate: item.startDate,
        startTime: item.startTime ? item.startTime : null,
        endDate: item.endDate,
        endTime: item.endTime ? item.endTime : null,
        alrams: !item.alrams ? null : item.alrams,
        memo: item.memo ? item.memo : null,
        goal: !item.goal ? null : item.goal,
        posts: item.posts,
        originToDoId: item.originToDoId,
        index: item.index,
        user: {
          __typename: "User",
          id: item.user.id,
        },
      },
    },
  });

  const [toDocompleteGesture, setToDocompleteGesture] = useState(false);

  const toDoComplete = async () => {
    if (division === "home") {
      navigation.navigate(
        NavigationActions.navigate({
          routeName: "TabNavigation",
          action: NavigationActions.navigate({
            routeName: "Tab1",
            action: NavigationActions.navigate({
              routeName: "HomeDiv",
              action: NavigationActions.navigate({
                routeName: "Home",
              }),
            }),
          }),
        })
      );
    } else {
      navigation.navigate("CalendarCreateToDo", { division: "complete" });
    }
    await toDoCompleteMutation();
  };

  const { data: seeToDoHistory, loading: seeToDoHistoryLoading } = useQuery(
    SEE_TODO_POSTS,
    {
      variables: {
        toDoId: id,
      },
      fetchPolicy: "network-only",
    }
  );

  const publicHistory =
    division === "home" || division === "me"
      ? seeToDoHistory && seeToDoHistory.seeToDoPost
      : seeToDoHistory &&
        seeToDoHistory.seeToDoPost &&
        seeToDoHistory.seeToDoPost.filter(
          (history) => history.postPrivate === true
        );

  return (
    <>
      <View
        style={{
          height: 50,
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate(
              NavigationActions.navigate({
                routeName: "TabNavigation",
                action: NavigationActions.navigate({
                  routeName: "Tab1",
                  action: NavigationActions.navigate({
                    routeName: "HomeDiv",
                    action: NavigationActions.navigate({
                      routeName: "Home",
                    }),
                  }),
                }),
              })
            )
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExpoIcon name={"chevron-left"} />
            <Text style={{ fontWeight: "700" }}>Home</Text>
          </View>
        </TouchableWithoutFeedback>
        {division === "home" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sale === null || sale === undefined ? (
              <>
                <TouchableOpacity onPress={() => deleteToDoConfirmVisible()}>
                  <View style={{ marginRight: 30, flexDirection: "column" }}>
                    <ExpoIcon name={"delete"} size={20} />
                    <Text
                      style={{
                        fontSize: 7,
                        marginTop: 5,
                        textAlign: "center",
                      }}
                    >
                      삭제
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditToDo", {
                      item,
                      division: division === "home" ? "home" : "calendar",
                    });

                    // setEditToDo(true);
                    // setValue(item.toDoList);
                    // setIsImportWhether(item.importEvent);
                  }}
                >
                  <View style={{ marginRight: 30, flexDirection: "column" }}>
                    <ExpoIcon name={"pencil"} size={20} />
                    <Text
                      style={{
                        fontSize: 7,
                        marginTop: 5,
                        textAlign: "center",
                      }}
                    >
                      수정
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : null}

            {goal !== null ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UploadHistory", {
                    item,
                    id,
                    division,
                    goalText,
                    goalId,
                  });
                  // setCompleteAddInfoVisible(!completeAddInfoVisible);
                }}
              >
                <View
                  style={{
                    marginRight: 30,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ExpoIcon name={"book-open"} size={20} />
                  <Text
                    style={{
                      fontSize: 5,
                      fontWeight: "700",
                      marginTop: 5,
                      textAlign: "center",
                    }}
                  >
                    히스토리 작성
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                toDoComplete();
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginRight: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {complete === false ? (
                  <ExpoIcon name={"check-decagram"} size={20} />
                ) : (
                  <View>
                    <ExpoIcon
                      name={"check-decagram"}
                      size={20}
                      color={styles.lightGreyColor}
                    />
                    <View style={{ position: "absolute" }}>
                      <ExpoIcon name={"close"} size={20} />
                    </View>
                  </View>
                )}
                {complete === false ? (
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 7,
                      textAlign: "center",
                    }}
                  >
                    완료
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 7,
                      textAlign: "center",
                    }}
                  >
                    완료취소
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <ScrollableTabView
        initialPage={0}
        style={{
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: styles.lightGreyColor,
          paddingTop: 7,
          height: 40,
        }}
        renderTabBar={() => <ToDoDetailDivScroll />}
      >
        <ScrollView
          tabLabel="ToDo"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ backgroundColor: "white" }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ paddingBottom: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View style={{ marginLeft: 10 }}>
                  <ExpoIcon
                    name={"calendar"}
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
                    날짜
                  </Text>
                </View>
                <View
                  style={{
                    width: contents.width / 1.1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {startDate === endDate ? (
                    <View>
                      <Text style={{ fontSize: 20 }}>
                        {moment(startDate).format("MM/DD(dd)")}
                      </Text>
                      {startTime ? (
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <Text style={{ color: styles.darkGreyColor }}>
                            {startTime}
                          </Text>
                          <Text style={{ color: styles.darkGreyColor }}>
                            {" "}
                            ~{" "}
                          </Text>
                          <Text style={{ color: styles.darkGreyColor }}>
                            {endTime}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>{moment(startDate).format("MM/DD (dd)")}</Text>
                        {startTime ? (
                          <Text style={{ color: styles.darkGreyColor }}>
                            {startTime}
                          </Text>
                        ) : null}
                      </View>
                      <Text>
                        {"    "} ~ {"    "}{" "}
                      </Text>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>{moment(endDate).format("MM/DD (dd)")}</Text>
                        {endTime ? (
                          <Text style={{ color: styles.darkGreyColor }}>
                            {endTime}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  )}
                </View>
              </View>
              {goal !== null ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    height: "auto",
                  }}
                >
                  <View style={{ marginLeft: 10, justifyContent: "center" }}>
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
                      width: contents.width / 1.1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>{goalText}</Text>
                  </View>
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  height: "auto",
                }}
              >
                <View style={{ marginLeft: 10, justifyContent: "center" }}>
                  <ExpoIcon
                    name={"flag-variant"}
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
                    할일
                  </Text>
                </View>
                <View
                  style={{
                    width: contents.width / 1.1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ textAlign: "center", fontWeight: "700" }}>
                    {toDoList}
                  </Text>
                </View>
              </View>
              {alrams.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    height: "auto",
                  }}
                >
                  <View style={{ marginLeft: 10, justifyContent: "center" }}>
                    <ExpoIcon
                      name={"alarm"}
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
                      알람
                    </Text>
                  </View>
                  <View
                    style={{
                      width: contents.width / 1.05,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                      flexDirection: "row",
                    }}
                  >
                    {alrams.length > 0
                      ? alrams.map((alarm) => (
                          <Fragment key={Math.random().toString()}>
                            <Text
                              style={{ marginRight: 10, textAlign: "center" }}
                            >
                              {alarm.time === 1 ||
                              alarm.time === 5 ||
                              alarm.time === 15 ||
                              alarm.time === 30
                                ? `${alarm.time}분전`
                                : alarm.time === 60
                                ? "1시간전"
                                : alarm.time === 60 * 24
                                ? "1일전"
                                : null}
                            </Text>
                          </Fragment>
                        ))
                      : null}
                  </View>
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  height: "auto",
                }}
              >
                <View style={{ marginLeft: 10, justifyContent: "center" }}>
                  <ExpoIcon
                    name={"marker"}
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
                    칼라
                  </Text>
                </View>
                <View
                  style={{
                    width: contents.width / 1.1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        color === "블랙(기본)"
                          ? "black"
                          : color === "레드 와인"
                          ? styles.TextWine
                          : color === "블루"
                          ? styles.BlueText
                          : color === "포레스트 그린"
                          ? styles.TextForestGreen
                          : color === "오렌지 옐로우"
                          ? styles.TextOrangeYellow
                          : color === "라벤더"
                          ? styles.TextLavendar
                          : color === "미디엄 퍼플"
                          ? styles.TextMidiumPupple
                          : color === "스카이 블루"
                          ? styles.TextSkyBlue
                          : color === "골드"
                          ? styles.TextGold
                          : null,
                      borderRadius: 5,
                      width: 10,
                      height: 30,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: 10,
                      color:
                        color === "블랙(기본)"
                          ? "black"
                          : color === "레드 와인"
                          ? styles.TextWine
                          : color === "블루"
                          ? styles.BlueText
                          : color === "포레스트 그린"
                          ? styles.TextForestGreen
                          : color === "오렌지 옐로우"
                          ? styles.TextOrangeYellow
                          : color === "라벤더"
                          ? styles.TextLavendar
                          : color === "미디엄 퍼플"
                          ? styles.TextMidiumPupple
                          : color === "스카이 블루"
                          ? styles.TextSkyBlue
                          : color === "골드"
                          ? styles.TextGold
                          : null,
                    }}
                  >
                    {color}
                  </Text>
                </View>
              </View>
              {memo ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    height: "auto",
                  }}
                >
                  <View style={{ marginLeft: 10, justifyContent: "center" }}>
                    <ExpoIcon
                      name={"note-outline"}
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
                      메모
                    </Text>
                  </View>
                  <View
                    style={{
                      width: contents.width / 1.1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                      flexDirection: "row",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {item.memo}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <ScrollView
          tabLabel="history"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{}}
        >
          <View
            style={{
              flex: 1,
              height: "auto",
              marginBottom: 10,
            }}
          >
            {/* <View style={{ marginLeft: 10, justifyContent: "center" }}>
              <ExpoIcon
                name={"book-open"}
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
                히스토리
              </Text>
            </View> */}
            {seeToDoHistoryLoading ? (
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
              <View style={{ marginTop: 10 }}>
                {publicHistory && publicHistory.length === 0 ? (
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
                ) : (
                  publicHistory &&
                  publicHistory.slice(0) &&
                  publicHistory.slice(0).reverse() &&
                  publicHistory
                    .slice(0)
                    .reverse()
                    .map((post) => (
                      <Fragment key={post.id}>
                        <ToDoDetailHistoryView
                          navigation={navigation}
                          item={item}
                          toDoId={id}
                          division={division}
                          myData={meData && meData.seeMeBasicData}
                          {...post}
                        />
                      </Fragment>
                    ))
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollableTabView>
      <Modal
        isVisible={deleteReConfirmModal}
        onBackdropPress={() => setDeleteReConfirmModal(!deleteReConfirmModal)}
        onRequestClose={() => setDeleteReConfirmModal(!deleteReConfirmModal)}
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
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>정말로 삭제하겠습니까?</Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: styles.Wine,
                    fontWeight: "700",
                  }}
                >
                  히스토리도 같이 삭제되오니,
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: styles.Wine,
                    fontWeight: "700",
                  }}
                >
                  주의 부탁드립니다.
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setDeleteReConfirmModal(!deleteReConfirmModal)}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>아니오</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toDoDelete()}>
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>예</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={toDocompleteGesture}
        onBackdropPress={() => {
          setToDocompleteGesture(!toDocompleteGesture);
        }}
        onRequestClose={() => {
          setToDocompleteGesture(!toDocompleteGesture);
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
              height: 150,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 25,
                marginTop: 10,
                height: 65,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "700",
                  marginTop: 30,
                }}
              >
                완료를 취소하시겠습니까?
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: "white",
                width: 300,
                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                borderTopColor: "black",
                borderTopWidth: 0.5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setToDocompleteGesture(!toDocompleteGesture);
                }}
                style={{
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRightWidth: 0.5,
                  borderRightColor: "black",
                  backgroundColor: "white",
                  borderBottomLeftRadius: 15,
                }}
              >
                <Text>아니오</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toDoComplete({ completeDivision: "dd" })}
                style={{
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderBottomRightRadius: 15,
                }}
              >
                <Text>예</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ToDoDetail;
