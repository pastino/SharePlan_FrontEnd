import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Moment from "moment";
import styles from "../../../../styles";
import contents from "../../../../contents";
import ExpoIcon from "../../../../components/ExpoIcon";
import SlideToggle from "../../../../components/SlideToggle";
import {
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from "react-native-gesture-handler";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import GoalCardView from "./GoalCardView";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  EDIT_GOAL_CARD,
  COMPLETE_CANCLE_GOAL,
  SEE_TODO_OF_GOAL,
} from "../../HomeQueries";
import Loader from "../../../../components/Loader";
import Modal from "react-native-modal";
import MultiLine from "../../goal/goalComponents/Test";
import GoalCard from "../../goal/goalComponents/GoalCard";
import moment from "moment";
import GoalPlan from "../GoalPlan/GoalPlan";
import LoadingModal from "../../../../components/LoadingModal";
import { SEE_GOAL_FULL_STAGE_PLAN } from "../GoalPlan/GoalPlanQuery";
import { NavigationActions } from "react-navigation";
import { SEE_HOME_GOAL } from "../../../newQueries";

const HomeGoalStackThree = ({ navigation }) => {
  const [completeCancleModal, setCompleteCancleModal] = useState(false);
  const navCategory = navigation.getParam("category");
  const navDetailCategory = navigation.getParam("detailCategory");
  const navCardPrivate = navigation.getParam("cardPrivate");
  const navValue = navigation.getParam("value");
  const navSelectDay = navigation.getParam("selectDay");
  const navDDay = navigation.getParam("dDay");
  const originDDay = navigation.getParam("originDDay");
  const navCardColor = navigation.getParam("cardColor");
  const navKeyWord = navigation.getParam("keyWord");
  const me = navigation.getParam("me");
  const goalInformations = navigation.getParam("goalInformations");
  const goalHistories = navigation.getParam("goalHistories");
  const startDate = navigation.getParam("startDate");
  const sale = navigation.getParam("sale");
  const salePrice = navigation.getParam("salePrice");
  const mainImage = navigation.getParam("mainImage");
  const introduceText = navigation.getParam("introduceText");
  const target = navigation.getParam("target");
  const otherCosts = navigation.getParam("otherCosts");
  const otherCostsDesc = navigation.getParam("otherCostsDesc");
  const dayToDoesCount = navigation.getParam("dayToDoesCount");
  const seeDayToDo = navigation.getParam("seeDayToDo");
  const purchase = navigation.getParam("purchase");

  const goalId = navigation.getParam("id");
  const complete = navigation.getParam("complete");
  const completeDate = navigation.getParam("completeDate");

  const selectCategory = navigation.getParam("selectCategory");
  const selectItem = navigation.getParam("selectItem");

  const [isLoading, setIsLoading] = useState(false);
  const [completeCancleLoading, setCompleteCancleLoading] = useState(false);
  const [detailCategory, setDetailCategory] = useState(navDetailCategory);
  const [category, setCategory] = useState(navCategory);
  const [value, setValue] = useState(navValue);
  const [keywordValue, setKeywordValue] = useState(navKeyWord);
  const [maxLength, setMaxlength] = useState(33);
  const [selectDay, setSelectDay] = useState(originDDay);
  const [startDay, setStartDay] = useState(startDate);
  const [dDay, setDDay] = useState(navDDay);
  const [cardColor, setCardColor] = useState(navCardColor);
  const [isSwitch, setIsSwitch] = useState(navCardPrivate);

  const [loadingModalText, setLoadingModalText] = useState("");

  const selectedLastDay = navigation.getParam("selectedLastDay");
  const secondSelectedLastDay = navigation.getParam("secondSelectedLastDay");
  const thirdSelectedLastDay = navigation.getParam("thirdSelectedLastDay");
  const forthSelectedLastDay = navigation.getParam("forthSelectedLastDay");
  const fivethSelectedLastDay = navigation.getParam("fivethSelectedLastDay");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startIsDatePickerVisible, setStartIsDatePickerVisible] = useState(
    false
  );

  const keywordOnChange = (text) => {
    setKeywordValue(text);
  };
  useEffect(() => {
    setCategory(selectCategory);
    setDetailCategory(selectItem);
  }, [selectCategory]);

  useEffect(() => {
    setCategory(navCategory);
    setDetailCategory(navDetailCategory);
  }, [navCategory]);

  const selectDayView = moment(selectDay).format("YYYY. M. D");

  const changeValue = (text) => {
    setValue(text);
  };
  const onPressHandle = () => {
    setIsSwitch(!isSwitch);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const startShowDatePicker = () => {
    setStartIsDatePickerVisible(true);
  };
  const startHideDatePicker = () => {
    setStartIsDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectDay(date);
    const start = new Date();
    const end = new Date(date);
    const range1 = Moment.range(start, end);
    const range2 = range1.snapTo("day");
    const dDay = range2.diff("days");
    setDDay(dDay);
  };

  const startHandleConfirm = (date) => {
    startHideDatePicker();
    if (moment(selectDay).format() < moment(date).format()) {
      setSelectDay(date);
    }
    setStartDay(date);
    const start = selectDay;
    const end = new Date(date);
    const range1 = Moment.range(start, end);
    const range2 = range1.snapTo("day");
    const dDay = range2.diff("days");
    setDDay(dDay);
  };

  const [editGoalCardMutation] = useMutation(EDIT_GOAL_CARD, {
    variables: {
      goalId,
      goalText: value,
      dDay: selectDay,
      startDate: startDay,
      category: selectCategory,
      keyWord: keywordValue,
      detailCategory: selectItem,
      cardColor,
      cardPrivate: isSwitch,
    },
    refetchQueries: () => [{ query: SEE_HOME_GOAL }],
    awaitRefetchQueries: true,
  });

  const editCompleteHandle = async () => {
    if (
      navCategory === category &&
      navValue === value &&
      originDDay === selectDay &&
      navCardColor === cardColor &&
      navCardPrivate === isSwitch &&
      startDay === startDate &&
      keywordValue === navKeyWord
    ) {
      ToastAndroid.show("변동사항이 없습니다.", ToastAndroid.SHORT);
    } else if (value.length < 2) {
      ToastAndroid.show("최소 두글자 이상 입력해주세요.", ToastAndroid.SHORT);
    } else {
      setIsLoading(true);
      await editGoalCardMutation();
      setIsLoading(false);
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
  };

  const [completeCancleGoalMutation] = useMutation(COMPLETE_CANCLE_GOAL, {
    variables: {
      goalId,
    },
    refetchQueries: () => [{ query: SEE_HOME_GOAL }],
    awaitRefetchQueries: true,
  });

  const completeCancleHandle = async () => {
    setCompleteCancleLoading(true);
    await completeCancleGoalMutation();
    setCompleteCancleLoading(false);
    setCompleteCancleModal(!completeCancleModal);
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
  };

  const { data: seeToDoData, loading } = useQuery(SEE_TODO_OF_GOAL, {
    variables: {
      goalId,
    },
    fetchPolicy: "network-only",
  });

  const startDateTimeArray =
    seeToDoData &&
    seeToDoData.seeToDoOfGoal &&
    seeToDoData.seeToDoOfGoal.map((toDo) => new Date(toDo.startDate).getTime());

  const endDateTimeArray =
    seeToDoData &&
    seeToDoData.seeToDoOfGoal &&
    seeToDoData.seeToDoOfGoal.map((toDo) => new Date(toDo.endDate).getTime());

  const min =
    !loading && startDateTimeArray && startDateTimeArray.length !== 0
      ? startDateTimeArray.reduce(function (previous, current) {
          return previous > current ? current : previous;
        })
      : null;

  const max =
    !loading && endDateTimeArray.length !== 0
      ? endDateTimeArray.reduce(function (previous, current) {
          return previous > current ? previous : current;
        })
      : null;

  const minDate = new Date(min);
  const maxDate = new Date(max);

  const CardColor = ({ color }) => {
    return (
      <TouchableOpacity onPress={() => setCardColor(color)}>
        <View
          style={{
            width: contents.width / 12,
            height: contents.height / 30,
            backgroundColor: color,
            marginLeft: 10,
            borderRadius: 5,
          }}
        ></View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              height: 70,
              width: contents.width,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <TouchableWithoutFeedback
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPressIn={() =>
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
                    )
                  }
                >
                  <ExpoIcon name={"chevron-left"} size={32} />
                  <Text style={{ marginLeft: 7, fontWeight: "700" }}>Home</Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                {purchase === true ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      if (navCardPrivate === false) {
                        ToastAndroid.show(
                          "비공개 목표카드는 다운로드 공유가 불가합니다.",
                          ToastAndroid.SHORT
                        );
                      } else if (dayToDoesCount < 10) {
                        ToastAndroid.show(
                          "스케쥴(해야할 일) 10개 이하는 공유가 불가합니다.",
                          ToastAndroid.SHORT
                        );
                      } else {
                        navigation.navigate("GoalIntroduce", { goalId, value });
                      }
                    }}
                    style={{
                      marginRight: 20,
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <ExpoIcon name={"database"} size={25} />
                      <Text
                        style={{
                          fontSize: 7,
                          textAlign: "center",
                          marginTop: 5,
                        }}
                      >
                        다운로드 공유
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() =>
                    complete
                      ? setCompleteCancleModal(!completeCancleModal)
                      : navigation.navigate("GoalComplete", {
                          goalInformations,
                          goalHistories,
                          goalId,
                          navValue,
                        })
                  }
                  style={{
                    marginRight: 20,
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {complete ? (
                      <ExpoIcon name={"flag-remove"} size={25} />
                    ) : (
                      <ExpoIcon name={"flag-variant"} size={25} />
                    )}

                    <Text
                      style={{ fontSize: 7, textAlign: "center", marginTop: 5 }}
                    >
                      {complete ? "완료취소" : "목표완료"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("GoalGiveUp", {
                      goalInformations,
                      goalHistories,
                      goalId,
                      navValue,
                      seeDayToDo,
                    })
                  }
                  style={{
                    marginRight: 20,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ExpoIcon name={"delete"} size={25} />
                    <Text
                      style={{ fontSize: 7, textAlign: "center", marginTop: 5 }}
                    >
                      삭제
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLoadingModalText("목표카드 기본정보를 수정중입니다.");
                    editCompleteHandle();
                  }}
                  style={{
                    marginRight: 20,
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
                      수정완료
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                width: contents.width / 1.03,
                justifyContent: "center",

                backgroundColor: "white",
                paddingBottom: 20,

                marginTop: 5,
                marginBottom: 5,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ paddingTop: 10, paddingLeft: 10, fontWeight: "700" }}
              >
                목표카드
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <GoalCard
                  select={selectDay}
                  startSelectDate={startDay}
                  category={category}
                  detailCategory={detailCategory}
                  value={value}
                  selectDay={selectDayView}
                  dDay={dDay}
                  cardColor={cardColor}
                  me={me}
                  cardPrivate={isSwitch}
                  create={true}
                  goalInformations={goalInformations}
                  goalHistories={goalHistories}
                  startDate={startDate}
                  complete={complete}
                  completeDate={completeDate}
                  division={"me"}
                  sale={sale}
                  salePrice={salePrice}
                  mainImage={mainImage}
                  introduceText={introduceText}
                  target={target}
                  otherCosts={otherCosts}
                  otherCostsDesc={otherCostsDesc}
                  dayToDoesCount={dayToDoesCount}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: "blue",
                width: contents.width / 1.03,
                paddingBottom: 17,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: "700" }}>카드정보 수정</Text>
              </View>
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: 50,
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"view-list"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        color: styles.darkGreyColor,
                        fontWeight: "700",
                      }}
                    >
                      카테고리
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: contents.width / 1.15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      marginLeft: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: styles.lightGreyColor,
                      width: 230,
                      height: 35,
                      borderRadius: 10,
                    }}
                  >
                    <View style={{ width: 180 }}>
                      <Text style={{ marginLeft: 20 }}>
                        {category} > {detailCategory}
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <TouchableOpacity
                        onPressIn={() =>
                          navigation.navigate("GoalStack", {
                            goalEdit: true,
                          })
                        }
                      >
                        <ExpoIcon
                          name={"square-edit-outline"}
                          color={styles.MainColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"target"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
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
                </View>
                <View
                  style={{
                    width: contents.width / 1.15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MultiLine
                    value={value}
                    setValue={setValue}
                    maxLength={maxLength}
                    setMaxLength={setMaxlength}
                    onChangeText={changeValue}
                    maxLines={2}
                    style={{
                      width: 300,
                      minHeight: 47,
                      maxHeight: 47,
                      backgroundColor: "white",
                      borderRadius: 10,
                      paddingLeft: 10,
                    }}
                  />

                  <Text
                    style={{
                      marginTop: 7,
                      marginLeft: 20,
                      fontSize: 10,
                      textAlign: "center",
                      color: styles.darkGreyColor,
                      marginBottom: 10,
                    }}
                  >
                    최소 2글자 최대 두줄까지 입력할 수 있습니다.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"key"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        color: styles.darkGreyColor,
                        fontWeight: "700",
                      }}
                    >
                      키워드
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: contents.width / 1.2,
                  }}
                >
                  <TextInput
                    maxLength={7}
                    value={keywordValue}
                    onChangeText={keywordOnChange}
                    style={{
                      backgroundColor: styles.lightGreyColor,
                      borderRadius: 10,
                      width: 200,
                      height: 37,
                      marginLeft: 20,
                      paddingLeft: 10,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 10,
                      paddingTop: 5,
                      paddingLeft: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor,
                    }}
                  >
                    목표 키워드 작성(7글자 이내)
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 10,
                      paddingTop: 5,
                      paddingLeft: 10,
                      color: styles.darkGreyColor,
                    }}
                  >
                    ex. 산티아고 순례길 걷기 => 산티아고 or 순례길
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"ray-start-arrow"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        color: styles.darkGreyColor,
                        fontWeight: "700",
                      }}
                    >
                      시작일
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: contents.width / 1.15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: contents.width / 2.3,
                        height: contents.height / 25,
                        backgroundColor: styles.lightGreyColor,
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 10,
                        paddingLeft: 23,
                      }}
                    >
                      <Text>{moment(startDay).format("YYYY. M. D")}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          loading
                            ? ToastAndroid.show(
                                "로딩중 입니다. 다시 클릭해 주세요.",
                                ToastAndroid.SHORT
                              )
                            : startShowDatePicker()
                        }
                      >
                        <View>
                          <ExpoIcon
                            size={25}
                            name={"calendar-check"}
                            color={styles.MainColor}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                      isVisible={startIsDatePickerVisible}
                      maximumDate={
                        !loading && startDateTimeArray.length !== 0
                          ? minDate
                          : null
                      }
                      mode="date"
                      onConfirm={startHandleConfirm}
                      onCancel={startHideDatePicker}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"ray-end"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        color: styles.darkGreyColor,
                        fontWeight: "700",
                      }}
                    >
                      목표일
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: contents.width / 1.15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: contents.width / 2.3,
                        height: contents.height / 25,
                        backgroundColor: styles.lightGreyColor,
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 10,
                        paddingLeft: 23,
                      }}
                    >
                      <Text>{selectDayView}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          loading
                            ? ToastAndroid.show(
                                "로딩중 입니다. 다시 클릭해 주세요.",
                                ToastAndroid.SHORT
                              )
                            : showDatePicker()
                        }
                      >
                        <View>
                          <Text>
                            <ExpoIcon
                              size={25}
                              name={"calendar-check"}
                              color={styles.MainColor}
                            />
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      minimumDate={
                        !loading && endDateTimeArray.length !== 0
                          ? maxDate
                            ? maxDate
                            : new Date(startDay)
                          : null
                      }
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"marker"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
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
                </View>
                <View
                  style={{
                    width: contents.width / 1.15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <CardColor color={styles.Wine} />
                    <CardColor color={styles.Sky} />
                    <CardColor color={styles.Yellow} />
                    <CardColor color={styles.Green} />
                    <CardColor color={styles.Blue} />
                    <CardColor color={styles.Indigo} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    left: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ExpoIcon
                        name={"account-group"}
                        color={styles.darkGreyColor}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 9,
                        color: styles.darkGreyColor,
                        fontWeight: "700",
                      }}
                    >
                      공개설정
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: contents.width / 1.15,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <SlideToggle
                      isSwitch={isSwitch}
                      onPressHandle={onPressHandle}
                    />
                    <View
                      style={{
                        marginLeft: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 12 }}>
                        {isSwitch ? "공개" : "비공개"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* <View style={{ marginTop: 10 }}>
              <GoalPlan
                navigation={navigation}
                division={"edit"}
                selectedLastDay={selectedLastDay}
                secondSelectedLastDay={secondSelectedLastDay}
                thirdSelectedLastDay={thirdSelectedLastDay}
                forthSelectedLastDay={forthSelectedLastDay}
                fivethSelectedLastDay={fivethSelectedLastDay}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setLoadingModalText={setLoadingModalText}
              />
            </View> */}
          </View>
          <Modal
            isVisible={completeCancleModal}
            onBackdropPress={() =>
              completeCancleLoading
                ? null
                : setCompleteCancleModal(!completeCancleModal)
            }
            onRequestClose={() =>
              completeCancleLoading
                ? null
                : setCompleteCancleModal(!completeCancleModal)
            }
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
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{}}>목표 완료를 취소 하시겠습니까?</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 50,
                    borderTopWidth: 1,
                    borderTopColor: styles.darkGreyColor,
                    width: 300,
                  }}
                >
                  <TouchableOpacity
                    disabled={completeCancleLoading}
                    onPress={() => setCompleteCancleModal(!completeCancleModal)}
                  >
                    <View
                      style={{
                        width: 150,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                        borderRightColor: styles.darkGreyColor,
                      }}
                    >
                      <Text>아니오</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => completeCancleHandle()}>
                    <View
                      style={{
                        width: 150,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {completeCancleLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text>예</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <LoadingModal isLoading={isLoading} loadingText={loadingModalText} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeGoalStackThree;
