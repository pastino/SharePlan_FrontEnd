import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../../../../styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import contents from "../../../../contents";
import moment from "moment";
import ExpoIcon from "../../../../components/ExpoIcon";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import Excellent from "./goalCommunication/Excellent";
import Favorite from "./goalCommunication/Favorite";
import Lucky from "./goalCommunication/Lucky";
import { useMutation } from "react-apollo-hooks";
import { GOAL_VIEW_COUNTS } from "../../HomeQueries";

const GoalCard = ({
  value,
  select,
  startSelectDate,
  selectDay,
  originDDay,
  dDay,
  cardColor,
  category,
  detailCategory,
  me,
  cardPrivate,
  goalInformations,
  goalHistories,
  sizeDivision,
  division,
  user,
  startDate,
  createdAt,
  navigation,
  id,
  settingsView,
  create,
  complete,
  completeDate,
  filtering,
  excellents,
  favorites,
  luckies,
  loading,
  ordering,
  communityDivision,
  goalCommentsCount,
  goalReppliesCount,
  viewCounts,
  keyWord,
  sale,
  salePrice,
  mainImage,
  introduceText,
  target,
  otherCosts,
  otherCostsDesc,
  dayToDoesCount,
  dayToDoComCount,
  historyCount,
  historyPubCount,
  downloadCount,
  seeDayToDo,
  purchase,
}) => {
  const [createdHistoryDateNum, setCreatedHistoryDateNum] = useState();
  const initialValue = "나의 목표카드";
  const small = sizeDivision === "small";

  const date = new Date(completeDate);

  const completeDay = moment(date).format("YYYY.M.D");

  const commentLength = goalCommentsCount;
  const repplyLength = goalReppliesCount;

  const color =
    cardColor === styles.Wine
      ? styles.subWine
      : cardColor === styles.Sky
      ? styles.subPink
      : cardColor === styles.Yellow
      ? styles.subYellow
      : cardColor === styles.Green
      ? styles.subGreen
      : cardColor === styles.Blue
      ? styles.Bluey
      : cardColor === styles.Indigo
      ? styles.subWine
      : null;

  const goalText = value;

  const historyDateNumGen = () => {
    const historyPost = goalHistories && goalHistories.history;
    const createdDate =
      historyPost &&
      historyPost.map(
        (post) => post && post.startDate && post.startDate.substr(0, 10)
      );
    const createdHistoryOverlapDel =
      createdDate &&
      createdDate.filter((item, idx, array) => {
        return array.indexOf(item) === idx;
      });
    setCreatedHistoryDateNum(createdHistoryOverlapDel.length);
  };

  const [goalViewCountsMutation] = useMutation(GOAL_VIEW_COUNTS, {
    variables: {
      goalId: id,
    },
  });

  const goalCountHandle = async () => {
    if (division !== "me" && division !== "goalSaleConfirm") {
      await goalViewCountsMutation();
    }
  };

  useEffect(() => {
    if (goalHistories !== undefined) {
      historyDateNumGen();
    }
  }, [goalHistories]);

  const privateInformationLength =
    goalInformations &&
    goalInformations.information &&
    goalInformations.information.filter((post) => post.postPrivate === true) &&
    goalInformations.information.filter((post) => post.postPrivate === true)
      .length;

  const privateHistoryLength =
    goalHistories &&
    goalHistories.history &&
    goalHistories.history.filter((post) => post.postPrivate === true) &&
    goalHistories.history.filter((post) => post.postPrivate === true).length;

  const historyLength =
    goalHistories && goalHistories.history && goalHistories.history.length;

  const GetFontSize = (width, length, max) => {
    let fontSize = width / length;
    const maxSize = width / max;
    fontSize = Math.min(fontSize, maxSize);
    return fontSize;
  };

  const goalStartDate = moment([
    new Date(startDate).getFullYear(),
    new Date(startDate).getMonth(),
    new Date(startDate).getDate(),
  ]);

  const goalEndDate = moment([
    new Date(originDDay).getFullYear(),
    new Date(originDDay).getMonth(),
    new Date(originDDay).getDate(),
  ]);

  const diffDate = goalEndDate.diff(goalStartDate, "days") + 1;
  const remainderDate = dDay;
  const lastDate = diffDate - remainderDate;

  return (
    <View
      style={{
        width: small ? 240 : 350,
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          backgroundColor: cardColor,
          borderTopLeftRadius: small ? 10 : 15,
          borderTopRightRadius: small ? 10 : 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: small ? 240 : 350,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: "space-between",
          }}
        >
          {create === true ||
          settingsView === true ||
          division === "me" ? null : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SoulerProfile", {
                  userId: user && user.id,
                  me: me,
                })
              }
            >
              <View
                style={{
                  marginLeft: small === true ? 7 : 10,
                  marginTop: small === true ? 3 : 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={
                      division === "me"
                        ? me && me.avatar
                          ? { uri: me && me.avatar }
                          : require("../../../../assets/noAvatar.png")
                        : user && user.avatar
                        ? { uri: user && user.avatar }
                        : require("../../../../assets/noAvatar.png")
                    }
                    style={{
                      width: small ? 20 : 30,
                      height: small ? 20 : 30,
                      borderRadius: small ? 10 : 25,
                    }}
                    resizeMode={"cover"}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          cardColor === styles.Sky ||
                          cardColor === styles.Yellow
                            ? "black"
                            : "white",
                        fontSize: small
                          ? GetFontSize(
                              60,
                              division === "me"
                                ? me && me.nickname && me.nickname.length
                                : user && user.nickname && user.nickname.length,
                              5
                            )
                          : GetFontSize(
                              100,
                              division === "me"
                                ? me && me.nickname && me.nickname.length
                                : user && user.nickname && user.nickname.length,
                              8
                            ),
                        marginLeft: small ? 5 : 10,
                        fontWeight: "700",
                      }}
                      adjustsFontSizeToFit
                      minimumFontScale={0.5}
                    >
                      {division === "me"
                        ? me && me.nickname
                        : user && user.nickname}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          <View
            style={{
              marginRight:
                division === "me" || create === true || settingsView === true
                  ? null
                  : 10,
              marginLeft:
                division === "me" || create === true || settingsView === true
                  ? 10
                  : null,
              marginTop: 7,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: small ? 5 : 7,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                fontWeight: "700",
              }}
            >
              {`${category} ${" "} > ${" "} ${detailCategory}`}
            </Text>
          </View>
          <View
            style={{
              marginRight: 7,
              width: 320,
              justifyContent: "center",
              position: "absolute",
              right: 5,
              top: 7,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: small ? 7 : 7,
                fontWeight: "700",
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
              }}
            >
              조회수
            </Text>
            <Text
              style={{
                fontSize: small ? 7 : 7,
                fontWeight: "700",
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                marginLeft: 3,
              }}
            >
              {viewCounts === null ? 0 : viewCounts}
            </Text>
          </View>
          {/* {division === "me" ? (
            <Text
              style={{
                color: cardPrivate ? "white" : styles.darkGreyColor,
                fontSize: 7,
                marginRight: 7,
                marginTop: 7,
                fontWeight: "700",
              }}
            >
              {cardPrivate ? "공개" : "비공개"}
            </Text>
          ) : null} */}

          {division === "me" || settingsView === true || create === true ? (
            <TouchableOpacity
              style={{ marginRight: 10, marginTop: 7 }}
              onPress={() =>
                sale !== null
                  ? navigation.navigate("GoalIntroduce", {
                      goalId: id,
                      division: "sale",
                      category,
                      detailCategory,
                      cardPrivate,
                      value,
                      selectDay,
                      dDay,
                      cardColor,
                      me,
                      goalInformations,
                      goalHistories,
                      id,
                      startDate,
                      originDDay,
                      complete,
                      completeDate,
                      goalText,
                      keyWord,
                      sale,
                      salePrice,
                      mainImage,
                      introduceText,
                      target,
                      otherCosts,
                      otherCostsDesc,
                      dayToDoesCount,
                      seeDayToDo,
                    })
                  : navigation.navigate("GoalEdit", {
                      category,
                      detailCategory,
                      cardPrivate,
                      value,
                      selectDay,
                      dDay,
                      cardColor,
                      me,
                      goalInformations,
                      goalHistories,
                      id,
                      startDate,
                      originDDay,
                      complete,
                      completeDate,
                      goalText,
                      keyWord,
                      sale,
                      salePrice,
                      mainImage,
                      introduceText,
                      target,
                      otherCosts,
                      otherCostsDesc,
                      dayToDoesCount,
                      seeDayToDo,
                      purchase,
                    })
              }
            >
              {settingsView === true || create === true ? (
                <View style={{ height: 25, width: 25 }} />
              ) : (
                <ExpoIcon name={"settings"} color={"white"} size={25} />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableWithoutFeedback
          disabled={create === true ? true : false}
          onPress={() => {
            goalCountHandle();
            navigation.navigate("GoalViewDiv", {
              id,
              division,
              goalText,
              user,
              me,
              goalInformations,
              goalHistories,
              createdHistoryDateNum,
              selectDay,
              dDay,
              startDate,
              originDDay,
              sale,
              salePrice,
              mainImage,
              introduceText,
              target,
              otherCosts,
              otherCostsDesc,
              category,
              detailCategory,
              historyPubCount,
            });
          }}
        >
          <View style={{ paddingBottom: 10 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: small ? 20 : 30,
                marginTop: small ? 4 : 10,
              }}
            >
              <Text
                style={{
                  fontSize: small ? 10 : 13,
                  width: small ? 195 : 270,
                  fontWeight: "700",
                  color:
                    cardColor === styles.Sky || cardColor === styles.Yellow
                      ? "black"
                      : "white",
                  textAlign: "center",
                }}
              >
                {value ? value : initialValue}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-around",
                paddingLeft: 10,
                paddingRight: 10,

                marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: small ? 7 : 12,
                }}
              >
                <View style={{}}>
                  <View style={{ flexDirection: "row" }}>
                    <ExpoIcon
                      name={"calendar-multiselect"}
                      color={
                        cardColor === styles.Sky || cardColor === styles.Yellow
                          ? "black"
                          : "white"
                      }
                      size={15}
                    />
                    <Text
                      style={{
                        marginLeft: 7,
                        color:
                          cardColor === styles.Yellow ||
                          cardColor === styles.Sky
                            ? "black"
                            : styles.lightGreyColor,
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      스케쥴
                    </Text>
                    <Text
                      style={{
                        color:
                          cardColor === styles.Yellow ||
                          cardColor === styles.Sky
                            ? "black"
                            : styles.lightGreyColor,
                        marginLeft: small ? 5 : 10,
                        fontSize: 12,
                      }}
                    >
                      {dayToDoesCount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ExpoIcon
                      name={"check-outline"}
                      color={
                        cardColor === styles.Sky || cardColor === styles.Yellow
                          ? "black"
                          : "white"
                      }
                      size={15}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        marginLeft: 5,
                        color:
                          cardColor === styles.Sky ||
                          cardColor === styles.Yellow
                            ? "black"
                            : "white",
                      }}
                    >
                      완료
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        marginLeft: 5,
                        color:
                          cardColor === styles.Sky ||
                          cardColor === styles.Yellow
                            ? "black"
                            : "white",
                      }}
                    >
                      {dayToDoComCount}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <ExpoIcon
                      name={"book-open-outline"}
                      color={
                        cardColor === styles.Sky || cardColor === styles.Yellow
                          ? "black"
                          : "white"
                      }
                      size={15}
                    />
                    <Text
                      style={{
                        marginLeft: 7,
                        color:
                          cardColor === styles.Yellow ||
                          cardColor === styles.Sky
                            ? "black"
                            : styles.lightGreyColor,
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      히스토리
                    </Text>
                    <Text
                      style={{
                        color:
                          cardColor === styles.Yellow ||
                          cardColor === styles.Sky
                            ? "black"
                            : styles.lightGreyColor,
                        marginLeft: small ? 5 : 10,
                        fontSize: 12,
                      }}
                    >
                      {division === "feed" ? historyLength : historyCount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ExpoIcon
                      name={"account-group-outline"}
                      color={
                        cardColor === styles.Sky || cardColor === styles.Yellow
                          ? "black"
                          : "white"
                      }
                      size={15}
                    />
                    <Text
                      style={{
                        color: styles.lightGreyColor,
                        fontSize: 10,
                        marginLeft: 5,
                        color:
                          cardColor === styles.Sky ||
                          cardColor === styles.Yellow
                            ? "black"
                            : "white",
                      }}
                    >
                      공개
                    </Text>
                    <Text
                      style={{
                        color: styles.lightGreyColor,
                        fontSize: 10,
                        marginLeft: 5,
                        color:
                          cardColor === styles.Sky ||
                          cardColor === styles.Yellow
                            ? "black"
                            : "white",
                      }}
                    >
                      {historyPubCount}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <ExpoIcon
                      name={"download"}
                      color={
                        cardColor === styles.Sky || cardColor === styles.Yellow
                          ? "black"
                          : "white"
                      }
                      size={15}
                    />

                    <Text
                      style={{
                        marginLeft: 7,
                        color:
                          cardColor === styles.Yellow ||
                          cardColor === styles.Sky
                            ? "black"
                            : styles.lightGreyColor,
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      다운로드
                    </Text>
                    <Text
                      style={{
                        color:
                          cardColor === styles.Yellow ||
                          cardColor === styles.Sky
                            ? "black"
                            : styles.lightGreyColor,
                        marginLeft: small ? 5 : 10,
                        fontSize: 12,
                      }}
                    >
                      {downloadCount === null ? 0 : downloadCount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 5,
                      marginTop: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {sale === "승인" ? (
                      <>
                        <ExpoIcon
                          name={"database"}
                          color={
                            cardColor === styles.Sky ||
                            cardColor === styles.Yellow
                              ? "black"
                              : "white"
                          }
                          size={15}
                        />
                        <Text
                          style={{
                            color:
                              cardColor === styles.Sky ||
                              cardColor === styles.Yellow
                                ? "black"
                                : "white",
                            fontSize: 10,
                            marginLeft: 5,
                          }}
                        >
                          {salePrice === 0 ? "무료" : `${salePrice}Won`}
                        </Text>
                      </>
                    ) : (
                      <>
                        <ExpoIcon
                          name={"database"}
                          color={
                            cardColor === styles.Sky ||
                            cardColor === styles.Yellow
                              ? "black"
                              : "white"
                          }
                          size={15}
                        />
                        <Text
                          style={{
                            color:
                              cardColor === styles.Sky ||
                              cardColor === styles.Yellow
                                ? "black"
                                : "white",
                            fontSize: 10,
                            marginLeft: 5,
                          }}
                        >
                          미공유
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: cardColor,
            width: 350,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <ExpoIcon
              name={"clock-start"}
              color={
                cardColor === styles.Sky || cardColor === styles.Yellow
                  ? "black"
                  : "white"
              }
              size={15}
            />

            <Text
              style={{
                fontSize: 10,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                paddingLeft: 5,
              }}
            >
              시작일
            </Text>
            <Text
              style={{
                fontSize: 10,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                paddingLeft: 5,
              }}
            >
              {create
                ? moment(startSelectDate).format("M/D")
                : moment(startDate).format("M/D")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <ExpoIcon
              name={"clock-end"}
              color={
                cardColor === styles.Sky || cardColor === styles.Yellow
                  ? "black"
                  : "white"
              }
              size={15}
            />

            <Text
              style={{
                fontSize: 10,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              완료일
            </Text>
            <Text
              style={{
                fontSize: 10,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                paddingRight: 5,
              }}
            >
              {create
                ? moment(select).format("M/D")
                : moment(originDDay).format("M/D")}
            </Text>
          </View>
        </View>
      </View>

      {create ? null : (
        <View style={{ width: 350, backgroundColor: styles.darkGreyColor }}>
          <View
            style={{
              width: remainderDate < 0 ? 350 : (350 * lastDate) / diffDate,
              height: 2,
              backgroundColor: styles.lightGreyColor,
            }}
          ></View>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: styles.darkGreyColor,
          height: small ? 27 : 35,
          borderBottomLeftRadius: small ? 10 : 15,
          borderBottomRightRadius: small ? 10 : 15,
        }}
      >
        {create === true ? null : (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: small ? 240 : 350,
              alignItems: "center",
              paddingLeft: small ? 1 : 7,
              paddingRight: 7,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginRight: small ? 5 : 10 }}>
                <Lucky
                  goalId={id}
                  filtering={filtering}
                  me={me}
                  luckies={luckies}
                  loading={loading}
                  small={small}
                  ordering={ordering}
                  division={division}
                  navigation={navigation}
                  communityDivision={communityDivision}
                  user={user}
                  goalText={goalText}
                />
              </View>
              <View style={{ marginRight: small ? 5 : 10 }}>
                <Excellent
                  goalId={id}
                  filtering={filtering}
                  me={me}
                  excellents={excellents}
                  loading={loading}
                  small={small}
                  ordering={ordering}
                  division={division}
                  navigation={navigation}
                  communityDivision={communityDivision}
                  user={user}
                  goalText={goalText}
                />
              </View>
              <View style={{ marginRight: small ? 3 : 7 }}>
                <Favorite
                  favorites={favorites}
                  goalId={id}
                  filtering={filtering}
                  me={me}
                  loading={loading}
                  small={small}
                  ordering={ordering}
                  division={division}
                  navigation={navigation}
                  communityDivision={communityDivision}
                  user={user}
                  goalText={goalText}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CardComments", {
                    cardColor,
                    id,
                    me,
                    commentLength,
                    repplyLength,
                  })
                }
              >
                <View style={{ marginRight: 10, flexDirection: "row" }}>
                  <ExpoIcon
                    name={"comment"}
                    color={cardColor}
                    size={small ? 17 : 23}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 7,
                    }}
                  >
                    <Text
                      style={{
                        color: cardColor,
                        fontWeight: "700",
                        fontSize: small ? 8 : 12,
                      }}
                    >
                      {commentLength + repplyLength}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: small ? 30 : 50,
                  height: small ? 15 : 25,
                  backgroundColor: cardColor,
                  borderRadius: small ? 3 : 5,
                  marginRight: small ? 5 : 10,
                }}
              >
                {complete ? (
                  <Text style={{ fontSize: 10, color: "white" }}>완료</Text>
                ) : dDay >= 0 ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: small ? 7 : 10,
                    }}
                  >
                    D - &nbsp;{dDay}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontSize: small ? 7 : 10,
                    }}
                  >
                    D + &nbsp;{dDay * -1}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default GoalCard;
