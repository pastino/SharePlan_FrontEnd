import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import contents from "../../../../contents";
import styles from "../../../../styles";
import ExpoIcon from "../../../../components/ExpoIcon";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useMutation } from "react-apollo-hooks";
import {
  GOAL_STAGE_PLAN_CREATE,
  SEE_GOAL_STAGE_PLAN,
  SEE_GOAL_FULL_STAGE_PLAN,
} from "./GoalPlanQuery";
import Modal from "react-native-modal";
import { NavigationActions } from "react-navigation";

const GoalStagePlan = ({
  isLoading,
  setIsLoading,
  bigCategory,
  detailCategory,
  cardColor,
  dDay,
  cardPrivate,
  keyword,
  startDate,
  originDDay,
  goalText,
  navigation,
  selectedLastDay,
  secondSelectedLastDay,
  thirdSelectedLastDay,
  forthSelectedLastDay,
  fivethSelectedLastDay,
  id,
  data,
  division,
  create,
  createGoalCardModal,
  setCreateGoalCardModal,
  setLoadingModalText,
}) => {
  const createdPlanData = data && data.seePlan && data.seePlan.detailPlans;
  const createdPlanLength = createdPlanData && createdPlanData.length;

  // const [isLoading, setIsLoading] = useState(false);

  //First
  const [firstValue, setFirstValue] = useState(
    createdPlanData && createdPlanData[0] && createdPlanData[0].stagePlanText
  );
  const [cSelectedLastDay, setCSelectedLastDay] = useState(
    createdPlanData && createdPlanData[0] && createdPlanData[0].endDay
  );

  useEffect(() => {
    if (selectedLastDay) {
      setCSelectedLastDay(selectedLastDay);
    }
  }, [selectedLastDay]);

  //Second

  const [secondValue, setSecondValue] = useState(
    createdPlanData && createdPlanData[1] && createdPlanData[1].stagePlanText
  );
  const [cSecondSelectedLastDay, setCSecondSelectedLastDay] = useState(
    createdPlanData && createdPlanData[1] && createdPlanData[1].endDay
  );
  const secondStartDay = cSelectedLastDay
    ? moment(cSelectedLastDay).add("days", 1).format("YYYY-MM-DD")
    : null;

  useEffect(() => {
    if (secondSelectedLastDay) {
      setCSecondSelectedLastDay(secondSelectedLastDay);
    }
  }, [secondSelectedLastDay]);

  //Third

  const [thirdValue, setThirdValue] = useState(
    createdPlanData && createdPlanData[2] && createdPlanData[2].stagePlanText
  );
  const thirdStartDay = cSecondSelectedLastDay
    ? moment(cSecondSelectedLastDay).add("days", 1).format("YYYY-MM-DD")
    : null;

  const [cThirdSelectedLastDay, setCThirdSelectedLastDay] = useState(
    createdPlanData && createdPlanData[2] && createdPlanData[2].endDay
  );

  useEffect(() => {
    if (thirdSelectedLastDay) {
      setCThirdSelectedLastDay(thirdSelectedLastDay);
    }
  }, [thirdSelectedLastDay]);

  //Forth

  const [forthValue, setForthValue] = useState(
    createdPlanData && createdPlanData[3] && createdPlanData[3].stagePlanText
  );
  const forthStartDay = cThirdSelectedLastDay
    ? moment(cThirdSelectedLastDay).add("days", 1).format("YYYY-MM-DD")
    : null;

  const [cForthSelectedLastDay, setCForthSelectedLastDay] = useState(
    createdPlanData && createdPlanData[3] && createdPlanData[3].endDay
  );

  useEffect(() => {
    if (forthSelectedLastDay) {
      setCForthSelectedLastDay(forthSelectedLastDay);
    }
  }, [forthSelectedLastDay]);

  //Fiveth

  const [fivethValue, setFivethValue] = useState(
    createdPlanData && createdPlanData[4] && createdPlanData[4].stagePlanText
  );
  const fivethStartDay = cForthSelectedLastDay
    ? moment(cForthSelectedLastDay).add("days", 1).format("YYYY-MM-DD")
    : null;
  const [cFivethSelectedLastDay, setCFivethSelectedLastDay] = useState(
    createdPlanData && createdPlanData[4] && createdPlanData[4].endDay
  );
  useEffect(() => {
    if (fivethSelectedLastDay) {
      setCFivethSelectedLastDay(fivethSelectedLastDay);
    }
  }, [fivethSelectedLastDay]);

  const [stagePlan, setStagePlan] = useState(
    createdPlanLength === undefined ? 0 : createdPlanLength
  );

  const [createStagePlanMutation] = useMutation(GOAL_STAGE_PLAN_CREATE, {
    refetchQueries: () => [
      {
        query: SEE_GOAL_STAGE_PLAN,
        variables: {
          goalId: id,
        },
      },
      { query: SEE_GOAL_FULL_STAGE_PLAN },
    ],
    awaitRefetchQueries: true,
  });

  const firstOnChange = (text) => {
    setFirstValue(text);
  };
  const secondOnChange = (text) => {
    setSecondValue(text);
  };
  const thirdOnChange = (text) => {
    setThirdValue(text);
  };
  const forthOnChange = (text) => {
    setForthValue(text);
  };
  const fivethOnChange = (text) => {
    setFivethValue(text);
  };

  const formatingCreatedAt = moment(startDate).format("YYYY.MM.DD").split(".");
  const formatingOriginDDay = moment(originDDay)
    .format("YYYY.MM.DD")
    .split(".");

  var b = moment([
    formatingCreatedAt[0],
    formatingCreatedAt[1],
    formatingCreatedAt[2],
  ]);
  var a = moment([
    formatingOriginDDay[0],
    formatingOriginDDay[1],
    formatingOriginDDay[2],
  ]);

  const diffDays = a.diff(b, "days");

  const stagePlanCreate = () => {
    if (
      (stagePlan === 1 &&
        moment(originDDay).format("YYYY-MM-DD") === cSelectedLastDay) ||
      (stagePlan === 2 &&
        moment(originDDay).format("YYYY-MM-DD") === cSecondSelectedLastDay) ||
      (stagePlan === 3 &&
        moment(originDDay).format("YYYY-MM-DD") === cThirdSelectedLastDay) ||
      (stagePlan === 4 &&
        moment(originDDay).format("YYYY-MM-DD") === cForthSelectedLastDay)
    ) {
      ToastAndroid.show(
        "최종 목표일까지 생성 완료하였습니다.",
        ToastAndroid.SHORT
      );
    } else if (stagePlan === 5) {
      ToastAndroid.show("5단계 이상 생성할 수 없습니다.", ToastAndroid.SHORT);
    } else {
      setStagePlan(stagePlan + 1);
    }
  };
  const stagePlanDelete = () => {
    if (stagePlan === 0) {
      ToastAndroid.show("삭제할 단계가 없습니다.", ToastAndroid.SHORT);
    } else {
      setStagePlan(stagePlan - 1);
    }
  };

  const stagePlanCreateHandle = async () => {
    const stagePlanTextArray = [
      firstValue,
      secondValue,
      thirdValue,
      forthValue,
      fivethValue,
    ];
    const startingDayArray = [
      startDate,
      moment(secondStartDay).format(),
      moment(thirdStartDay).format(),
      moment(forthStartDay).format(),
      moment(fivethStartDay).format(),
    ];
    const endingDayArray = [
      moment(cSelectedLastDay).format(),
      moment(cSecondSelectedLastDay).format(),
      moment(cThirdSelectedLastDay).format(),
      moment(cForthSelectedLastDay).format(),
      moment(cFivethSelectedLastDay).format(),
    ];
    const saveStagePlanTextArray = [];
    const saveStartingDayArray = [];
    const saveEndingDayArray = [];

    for (let i = 0; i < stagePlan; i++) {
      saveStagePlanTextArray.push(stagePlanTextArray[i]);
      saveStartingDayArray.push(startingDayArray[i]);
      saveEndingDayArray.push(endingDayArray[i]);
    }

    try {
      let test;
      for (let i = 0; i < stagePlan; i++) {
        if (saveStartingDayArray[i] > saveEndingDayArray[i]) {
          ToastAndroid.show(
            `${i + 1}단계 목표일이 시작일보다 빠릅니다.`,
            ToastAndroid.SHORT
          );
          test = false;
        } else if (
          saveStagePlanTextArray[i] === undefined ||
          saveStagePlanTextArray[i] === ""
        ) {
          ToastAndroid.show(
            `${i + 1}단계의 목표가 없습니다.`,
            ToastAndroid.SHORT
          );
          test = false;
        } else if (saveEndingDayArray[i] === undefined) {
          ToastAndroid.show(
            `${i + 1}단계의 목표 완료일을 설정해주세요.`,
            ToastAndroid.SHORT
          );
        } else {
          test = true;
        }
      }
      if (stagePlan === 0) {
        ToastAndroid.show(
          `"+" 버튼을 클릭하여 단계 별 목표를 설정해주세요.`,
          ToastAndroid.SHORT
        );
      } else if (
        moment(originDDay).format("YYYY.MM.DD") !==
        moment(saveEndingDayArray[stagePlan - 1]).format("YYYY.MM.DD")
      ) {
        ToastAndroid.show(
          "마지막 목표 완료일은 목표카드의 완료일과 같아야합니다.",
          ToastAndroid.SHORT
        );
      } else {
        if (test) {
          if (division !== "edit") {
            setCreateGoalCardModal(!createGoalCardModal);
            setIsLoading(true);
            await create({
              variables: {
                goalText,
                category: bigCategory,
                detailCategory: detailCategory,
                cardColor,
                startDate,
                dDay,
                cardPrivate,
                keyword,
                division: "stage",
                stagePlanText: saveStagePlanTextArray,
                startingDay: saveStartingDayArray,
                endDay: saveEndingDayArray,
              },
            });
          } else {
            setIsLoading(true);
            await createStagePlanMutation({
              variables: {
                stagePlanText: saveStagePlanTextArray,
                startingDay: saveStartingDayArray,
                endDay: saveEndingDayArray,
                goalId: id,
              },
            });
          }
          navigation.navigate(
            NavigationActions.navigate({
              routeName: "TabNavigation",
              action: NavigationActions.navigate({
                routeName: "Tab1",
                action: NavigationActions.navigate({
                  routeName: "HomeDiv",
                  action: NavigationActions.navigate({
                    routeName: "HomeGoal",
                  }),
                }),
              }),
            })
          );
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        paddingBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: contents.width / 1.03,
            }}
          >
            <Text
              style={{
                marginLeft: 10,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              단계 별 목표설정
            </Text>
            {division === "edit" ? (
              <TouchableOpacity
                onPress={() => {
                  setLoadingModalText("단계 별 목표 설정중입니다.");
                  stagePlanCreateHandle();
                }}
                style={{
                  marginRight: 20,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ExpoIcon name={"check"} size={25} />
                  <Text
                    style={{ fontSize: 7, textAlign: "center", marginTop: 5 }}
                  >
                    완료
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 10,
                marginTop: 10,
                color: styles.darkGreyColor,
              }}
            >
              "{goalText}"의 목표기간은
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 10,
                fontWeight: "700",
              }}
            >
              &nbsp; {diffDays}일
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 10,
                color: styles.darkGreyColor,
              }}
            >
              로
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 10,
                marginTop: 10,
                fontWeight: "700",
              }}
            >
              {diffDays < 60
                ? "2단계"
                : diffDays >= 60 && diffDays <= 100
                ? "3단계"
                : diffDays >= 101 && diffDays <= 150
                ? "4단계"
                : "5단계"}
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 10,
                color: styles.darkGreyColor,
              }}
            >
              &nbsp; 이상으로 분할하여 목표설정를 하는 것을 추천합니다.
            </Text>
          </View>
        </View>
      </View>
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderTopColor: styles.lightGreyColor,
              borderTopWidth: 1,
              width: contents.width,
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
              paddingBottom: 10,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => stagePlanDelete()}>
              <View
                style={{
                  width: contents.width / 2.5,
                  height: 37,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: styles.MainColor,
                  marginTop: 10,
                }}
              >
                <View>
                  <ExpoIcon name={"minus-circle-outline"} color={"white"} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 12 }}
              onPress={() => stagePlanCreate()}
            >
              <View
                style={{
                  width: contents.width / 2.5,
                  height: 37,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: styles.MainColor,
                  marginTop: 10,
                }}
              >
                <View>
                  <ExpoIcon name={"plus-circle-outline"} color={"white"} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              minHeight: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {stagePlan === 1 ||
            stagePlan === 2 ||
            stagePlan === 3 ||
            stagePlan === 4 ||
            stagePlan === 5 ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.15,
                  height: 150,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                }}
              >
                <View style={{ position: "absolute", left: 10, top: 5 }}>
                  <Text style={{ marginRight: 10, fontSize: 10 }}>Stage 1</Text>
                </View>
                <View style={{}}>
                  <Text style={{ textAlign: "center", fontWeight: "700" }}>
                    Stage 1 목표기간
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {moment(startDate).format("YYYY.MM.DD")} &nbsp;~
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("GoalStageCalendal", {
                          startDate,
                          originDDay,
                          division,
                        });
                      }}
                    >
                      <View
                        style={{
                          width: 130,
                          height: 30,
                          backgroundColor: styles.lightGreyColor,
                          borderRadius: 10,
                          marginLeft: 10,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingRight: 7,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ marginRight: 5 }}>
                          {cSelectedLastDay === undefined
                            ? null
                            : moment(cSelectedLastDay).format("YYYY.MM.DD")}
                        </Text>
                        <ExpoIcon
                          name={"calendar-range"}
                          size={23}
                          color={styles.MainColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  value={firstValue}
                  onChangeText={firstOnChange}
                  placeholder={"1단계 목표를 적어주세요."}
                  multiline={true}
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    width: contents.width / 1.37,
                    height: 50,

                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                  }}
                />
              </View>
            ) : null}
            {stagePlan === 2 ||
            stagePlan === 3 ||
            stagePlan === 4 ||
            stagePlan === 5 ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.15,
                  height: 150,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                }}
              >
                <View style={{ position: "absolute", left: 10, top: 5 }}>
                  <Text style={{ marginRight: 10, fontSize: 10 }}>Stage 2</Text>
                </View>
                <View style={{}}>
                  <Text style={{ textAlign: "center", fontWeight: "700" }}>
                    Stage 2 목표기간
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {secondStartDay
                        ? moment(secondStartDay).format("YYYY.MM.DD")
                        : "0000.00.00"}
                      &nbsp;~
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (cSelectedLastDay !== undefined) {
                          navigation.navigate("Second", {
                            secondStartDay,
                            originDDay,
                            division,
                          });
                        } else {
                          ToastAndroid.show(
                            "먼저 앞단계 목표일 설정해주세요.",
                            ToastAndroid.SHORT
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          width: 130,
                          height: 30,
                          backgroundColor: styles.lightGreyColor,
                          borderRadius: 10,
                          marginLeft: 10,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingRight: 7,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ marginRight: 5 }}>
                          {cSecondSelectedLastDay
                            ? moment(cSecondSelectedLastDay).format(
                                "YYYY.MM.DD"
                              )
                            : null}
                        </Text>
                        <ExpoIcon
                          name={"calendar-range"}
                          size={23}
                          color={styles.MainColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  value={secondValue}
                  onChangeText={secondOnChange}
                  placeholder={"2단계 목표를 적어주세요."}
                  multiline={true}
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    width: contents.width / 1.37,
                    height: 50,

                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                  }}
                />
              </View>
            ) : null}
            {stagePlan === 3 || stagePlan === 4 || stagePlan === 5 ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.15,
                  height: 150,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                }}
              >
                <View style={{ position: "absolute", left: 10, top: 5 }}>
                  <Text style={{ marginRight: 10, fontSize: 10 }}>Stage 3</Text>
                </View>
                <View style={{}}>
                  <Text style={{ textAlign: "center", fontWeight: "700" }}>
                    Stage 3 목표기간
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {thirdStartDay
                        ? moment(thirdStartDay).format("YYYY.MM.DD")
                        : "0000.00.00"}
                      &nbsp;~
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (cSecondSelectedLastDay !== undefined) {
                          navigation.navigate("Third", {
                            thirdStartDay,
                            originDDay,
                            division,
                          });
                        } else {
                          ToastAndroid.show(
                            "먼저 앞단계 목표일 설정해주세요.",
                            ToastAndroid.SHORT
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          width: 130,
                          height: 30,
                          backgroundColor: styles.lightGreyColor,
                          borderRadius: 10,
                          marginLeft: 10,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingRight: 7,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ marginRight: 5 }}>
                          {cThirdSelectedLastDay
                            ? moment(cThirdSelectedLastDay).format("YYYY.MM.DD")
                            : null}
                        </Text>
                        <ExpoIcon
                          name={"calendar-range"}
                          size={23}
                          color={styles.MainColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  value={thirdValue}
                  onChangeText={thirdOnChange}
                  placeholder={"3단계 목표를 적어주세요."}
                  multiline={true}
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    width: contents.width / 1.37,
                    height: 50,

                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                  }}
                />
              </View>
            ) : null}
            {stagePlan === 4 || stagePlan === 5 ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.15,
                  height: 150,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                }}
              >
                <View style={{ position: "absolute", left: 10, top: 5 }}>
                  <Text style={{ marginRight: 10, fontSize: 10 }}>Stage 4</Text>
                </View>
                <View style={{}}>
                  <Text style={{ textAlign: "center", fontWeight: "700" }}>
                    Stage 4 목표기간
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {forthStartDay
                        ? moment(forthStartDay).format("YYYY.MM.DD")
                        : "0000.00.00"}{" "}
                      &nbsp;~
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        if (cThirdSelectedLastDay !== undefined) {
                          navigation.navigate("Forth", {
                            forthStartDay,
                            originDDay,
                            division,
                          });
                        } else {
                          ToastAndroid.show(
                            "먼저 앞단계 목표일 설정해주세요.",
                            ToastAndroid.SHORT
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          width: 130,
                          height: 30,
                          backgroundColor: styles.lightGreyColor,
                          borderRadius: 10,
                          marginLeft: 10,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingRight: 7,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ marginRight: 5 }}>
                          {cForthSelectedLastDay
                            ? moment(cForthSelectedLastDay).format("YYYY.MM.DD")
                            : null}
                        </Text>
                        <ExpoIcon
                          name={"calendar-range"}
                          size={23}
                          color={styles.MainColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  value={forthValue}
                  onChangeText={forthOnChange}
                  placeholder={"4단계 목표를 적어주세요."}
                  multiline={true}
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    width: contents.width / 1.37,
                    height: 50,

                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                  }}
                />
              </View>
            ) : null}
            {stagePlan === 5 ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.15,
                  height: 150,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                }}
              >
                <View style={{ position: "absolute", left: 10, top: 5 }}>
                  <Text style={{ marginRight: 10, fontSize: 10 }}>Stage 5</Text>
                </View>
                <View style={{}}>
                  <Text style={{ textAlign: "center", fontWeight: "700" }}>
                    Stage 5 목표기간
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {fivethStartDay
                        ? moment(fivethStartDay).format("YYYY.MM.DD")
                        : "0000.00.00"}
                      &nbsp;~
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (cForthSelectedLastDay !== undefined) {
                          navigation.navigate("Fiveth", {
                            fivethStartDay,
                            originDDay,
                            division,
                          });
                        } else {
                          ToastAndroid.show(
                            "먼저 앞단계 목표일 설정해주세요.",
                            ToastAndroid.SHORT
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          width: 130,
                          height: 30,
                          backgroundColor: styles.lightGreyColor,
                          borderRadius: 10,
                          marginLeft: 10,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingRight: 7,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ marginRight: 5 }}>
                          {cFivethSelectedLastDay
                            ? moment(cFivethSelectedLastDay).format(
                                "YYYY.MM.DD"
                              )
                            : null}
                        </Text>
                        <ExpoIcon
                          name={"calendar-range"}
                          size={23}
                          color={styles.MainColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  value={fivethValue}
                  onChangeText={fivethOnChange}
                  placeholder={"5단계 목표를 적어주세요."}
                  multiline={true}
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    width: contents.width / 1.37,
                    height: 50,
                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                  }}
                />
              </View>
            ) : stagePlan === 0 ? (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: styles.darkGreyColor,
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  "+" 버튼을 눌러 단계 별 목표를 생성해주세요.
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </>
      <Modal
        isVisible={createGoalCardModal}
        onBackdropPress={() => setCreateGoalCardModal(!createGoalCardModal)}
        onRequestClose={() => setCreateGoalCardModal(!createGoalCardModal)}
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
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>목표카드를 생성하겠습니다.</Text>
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
                onPress={() => setCreateGoalCardModal(!createGoalCardModal)}
                disabled={isLoading}
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
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => stagePlanCreateHandle()}
              >
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
    </View>
  );
};

export default GoalStagePlan;
