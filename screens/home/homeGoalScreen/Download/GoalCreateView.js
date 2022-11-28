import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from "react-native-gesture-handler";
import Moment from "moment";
import { extendMoment } from "moment-range";
import contents from "../../../../contents";
import styles from "../../../../styles";
import ExpoIcon from "../../../../components/ExpoIcon";
import GoalCard from "../../goal/goalComponents/GoalCard";
import { SEE_ME } from "../../HomeQueries";
import { useQuery } from "react-apollo-hooks";
import SlideToggle from "../../../../components/SlideToggle";
import MultiLine from "../../goal/goalComponents/Test";
import Modal from "react-native-modal";
import { GOAL_SELECT_VIEW } from "../../../home/HomeQueries";

const GoalCreateView = ({ navigation: { goBack }, navigation }) => {
  const id = navigation.getParam("id");
  const toDoes = navigation.getParam("toDoes");
  const schedulePeriod = navigation.getParam("schedulePeriod");
  const [value, setValue] = useState();
  const [maxLength, setMaxlength] = useState(33);
  const [goalSelectModal, setGoalSelectModal] = useState(false);

  const changeValue = (text) => {
    setValue(text);
  };
  const [keywordValue, setKewordValue] = useState("");

  const keywordOnChange = (text) => {
    setKewordValue(text);
  };

  const moment = extendMoment(Moment);
  const selectCategory = navigation.getParam("selectCategory");
  const selectItem = navigation.getParam("selectItem");
  const [cardColor, setCardColor] = useState(styles.Wine);
  const [select, setSelect] = useState();
  const [startSelectDate, setStartSelectDate] = useState();

  const timestampArray =
    toDoes.length === 0
      ? null
      : toDoes.map((toDo) => new Date(toDo.startDate).getTime());
  const min =
    timestampArray !== null
      ? timestampArray.reduce(function (previous, current) {
          return previous > current ? current : previous;
        })
      : null;

  const [changeToDo, setChangeToDo] = useState([]);

  useEffect(() => {
    const test = [];
    for (let i = 0; i < toDoes.length; i++) {
      //Start Date
      const startDay = new Date(min);
      const originStartDay = new Date(
        toDoes && toDoes[i] && toDoes[i].startDate
      );
      const originStartDiff = moment(originStartDay).diff(startDay, `days`);
      const startDateFull = moment(startSelectDate)
        .add(originStartDiff, "days")
        .toDate();
      const startDateInput = moment(startDateFull).format("YYYY-MM-DD");

      //End Date
      const toDoStartDate = new Date(
        toDoes && toDoes[i] && toDoes[i].startDate
      );
      const endDate = new Date(toDoes && toDoes[i] && toDoes[i].endDate);
      const endDateDiff = moment(endDate).diff(toDoStartDate, `days`);
      const endDateFull = moment(startDateInput)
        .add(endDateDiff, "days")
        .toDate();
      const endDateInput = moment(endDateFull).format("YYYY-MM-DD");
      test.push({
        id: toDoes && toDoes[i] && toDoes[i].id,
        toDoList: toDoes && toDoes[i] && toDoes[i].toDoList,
        complete: toDoes && toDoes[i] && toDoes[i].complete,
        alrams: toDoes && toDoes[i] && toDoes[i].alrams,
        startDate: startDateInput,
        startTime: toDoes && toDoes[i] && toDoes[i].startTime,
        endDate: endDateInput,
        endTime: toDoes && toDoes[i] && toDoes[i].endTime,
        color: toDoes && toDoes[i] && toDoes[i].color,
        goal: toDoes && toDoes[i] && toDoes[i].goal,
        originToDoId: toDoes && toDoes[i] && toDoes[i].id,
        memo: toDoes && toDoes[i] && toDoes[i].memo,
        index: toDoes && toDoes[i] && toDoes[i].index,
        user: toDoes && toDoes[i] && toDoes[i].user,
      });
    }
    setChangeToDo(test);
  }, [startSelectDate]);

  const maxTimestampArray = changeToDo
    ? changeToDo.map((toDo) => new Date(toDo.endDate).getTime())
    : [];

  const max =
    maxTimestampArray.length !== 0
      ? maxTimestampArray.reduce(function (previous, current) {
          return previous > current ? previous : current;
        })
      : null;

  const maxEndDate = new Date(max);

  const maxEndDateView = moment(maxEndDate).format("YYYY. M. D");

  const selectDay = moment(select).format("YYYY. M. D");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startIsDatePickerVisible, setStartIsDatePickerVisible] = useState(
    false
  );

  const startDate = moment(startSelectDate).format("YYYY. M. D");

  const start = new Date();
  const end = new Date(select);
  const range1 = moment.range(start, end);
  const range2 = range1.snapTo("day");
  const dDay = range2.diff("days");

  const [isSwitch, setIsSwitch] = useState(true);
  const onPressHandle = () => {
    setIsSwitch(!isSwitch);
  };

  const { loading, data: seeMe, refetch } = useQuery(SEE_ME, {
    fetchPolicy: "network-only",
  });

  const startShowDatePicker = () => {
    setStartIsDatePickerVisible(!startIsDatePickerVisible);
  };

  const startHideDatePicker = () => {
    setStartIsDatePickerVisible(!startIsDatePickerVisible);
  };

  const startHandleConfirm = (date) => {
    startHideDatePicker();
    setStartSelectDate(date);
    if (
      select !== undefined &&
      moment(select).format() < moment(date).format()
    ) {
      setSelect(date);
    }
  };

  const nextHandle = () => {
    if (!value) {
      ToastAndroid.show("목표를 입력해주세요.", ToastAndroid.SHORT);
    } else if (value.length < 2) {
      ToastAndroid.show(
        "목표는 최소 두글자 이상 생성 가능합니다.",
        ToastAndroid.SHORT
      );
    } else if (keywordValue === "") {
      ToastAndroid.show("키워드를 입력해주세요.", ToastAndroid.SHORT);
    } else if (startSelectDate === undefined) {
      ToastAndroid.show("일정을 입력해주세요.", ToastAndroid.SHORT);
    } else {
      navigation.navigate("DownScheduleView", {
        id,
        value,
        selectCategory,
        selectItem,
        cardColor,
        select: maxEndDate,
        startSelectDate,
        isSwitch,
        keywordValue,
        toDoes: changeToDo,
      });
    }
  };

  const { data } = useQuery(GOAL_SELECT_VIEW, {
    fetchPolicy: "network-only",
  });

  const goalSelectData = data && data.goalSelectView;

  const [selectGoalId, setSelectGoalId] = useState(null);
  const [goalText, setGoalText] = useState(null);
  const [goalStartDate, setGoalStartDate] = useState(null);
  const [goalEndDate, setGoalEndDate] = useState(null);

  const goalSelectHandle = () => {
    if (new Date(goalEndDate).getTime() > new Date().getTime()) {
      if (selectGoalId) {
        setGoalSelectModal(!goalSelectModal);
        navigation.navigate("InGoalSelectDate", {
          id,
          goalId: selectGoalId,
          goalText,
          goalStartDate,
          goalEndDate,
          schedulePeriod,
          toDoes,
        });
      } else {
        ToastAndroid.show("목표를 선택해 주세요.", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("목표 완료일이 지났습니다.", ToastAndroid.SHORT);
    }
  };

  const CardColor = ({ color }) => {
    return (
      <TouchableOpacity onPress={() => setCardColor(color)}>
        <View
          style={{
            width: 32,
            height: 25,
            backgroundColor: color,
            marginLeft: 10,
            borderRadius: 5,
          }}
        ></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          width: contents.width,
          height: 70,
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <TouchableOpacity onPress={() => goBack()}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExpoIcon name={"chevron-left"} size={37} />
            <Text style={{ fontWeight: "700" }}>이전</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: "700" }}>카드정보 입력</Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          <TouchableOpacity onPress={() => nextHandle()}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>다음</Text>
              <ExpoIcon name={"chevron-right"} size={37} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
        >
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "700",
                color: styles.darkGreyColor,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              스케쥴 생성을 위한 목표카드 정보를 기록해주세요.
            </Text>
            <Text
              style={{
                fontWeight: "700",
                color: styles.Wine,
                fontSize: 12,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              ※ 다운로드한 목표카드는 재공유(다운) 불가합니다.
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                if (goalSelectData && goalSelectData.length === 0) {
                  ToastAndroid.show(
                    "기존 목표카드가 없습니다.",
                    ToastAndroid.SHORT
                  );
                } else {
                  setGoalSelectModal(!goalSelectModal);
                }
              }}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "700",
                  color: styles.MainColor,
                }}
              >
                기존 목표에 스케쥴 다운로드 하기
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: contents.width / 1.03,
              backgroundColor: "white",
              borderRadius: 10,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.03,
                  height: 220,
                  backgroundColor: "white",
                  marginTop: 5,
                  borderRadius: 10,
                }}
              >
                <GoalCard
                  category={selectCategory}
                  detailCategory={selectItem}
                  value={value}
                  selectDay={selectDay}
                  dDay={dDay}
                  cardColor={cardColor}
                  me={seeMe && seeMe.me}
                  cardPrivate={isSwitch}
                  create={true}
                />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: styles.lightGreyColor,
                borderBottomWidth: 1,
                borderTopColor: styles.lightGreyColor,
                borderTopWidth: 1,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  height: 90,
                  left: 10,
                  justifyContent: "center",
                  alignItems: "center",
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
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.02,
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
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 10,
                    paddingLeft: 10,
                  }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                    fontSize: 10,
                    fontWeight: "700",
                    color: styles.darkGreyColor,
                  }}
                >
                  최소 2글자 최대 두줄까지 입력할 수 있습니다.
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: styles.lightGreyColor,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  height: 100,
                  left: 10,
                  justifyContent: "center",
                  alignItems: "center",
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: styles.lightGreyColor,
                flexDirection: "row",
                height: "auto",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
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
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.2,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 200,
                      height: 37,
                      backgroundColor: styles.lightGreyColor,
                      borderRadius: 10,
                      marginLeft: 20,
                      marginRight: 10,
                      paddingLeft: 23,
                    }}
                  >
                    {startSelectDate !== undefined ? (
                      <Text>{startDate}</Text>
                    ) : null}
                    <TouchableOpacity
                      onPress={startShowDatePicker}
                      style={{ position: "absolute", right: 10 }}
                    >
                      <View>
                        <Text>
                          <ExpoIcon name={"calendar-check"} size={25} />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={startIsDatePickerVisible}
                    mode="date"
                    onConfirm={startHandleConfirm}
                    onCancel={startHideDatePicker}
                    minimumDate={new Date()}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: styles.lightGreyColor,
                flexDirection: "row",
                height: "auto",
                paddingLeft: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
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
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: 200,
                    height: 37,
                    backgroundColor: styles.lightGreyColor,
                    borderRadius: 10,
                    marginLeft: 20,
                    marginRight: 10,
                    paddingLeft: 23,
                  }}
                >
                  {startSelectDate !== undefined ? (
                    <Text>{maxEndDateView}</Text>
                  ) : null}
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      color: styles.darkGreyColor,
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    목표일은 변경이 불가합니다.
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: styles.darkGreyColor,
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    생성 완료 후 변경 가능합니다.
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: styles.lightGreyColor,
                flexDirection: "row",
                height: "auto",
                paddingLeft: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.2,
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
                height: "auto",
                marginLeft: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpoIcon
                  name={"account-group"}
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
                  공개설정
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: contents.width / 1.2,
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
        </View>
      </ScrollView>
      <Modal
        isVisible={goalSelectModal}
        onBackdropPress={() => setGoalSelectModal(!goalSelectModal)}
        onRequestClose={() => setGoalSelectModal(!goalSelectModal)}
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
              borderRadius: 10,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              maxHeight: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScrollView>
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: styles.darkGreyColor,
                    textAlign: "center",
                    padding: 10,
                  }}
                >
                  스케쥴을 다운로드 할 목표를 선택해주세요.
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: styles.Wine,
                    textAlign: "center",
                    paddingBottom: 5,
                  }}
                >
                  ※ 다운로드 등록 된 카드는 선택이 불가합니다.
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: styles.Wine,
                    textAlign: "center",
                  }}
                >
                  ※ 선택하신 카드는 재공유가 불가하오니
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: styles.Wine,
                    textAlign: "center",
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.lightGreyColor,
                  }}
                >
                  주의해 주세요.
                </Text>
              </View>
              {goalSelectData &&
                goalSelectData.map((goal, i) => (
                  <TouchableOpacity
                    disabled={goal.sale !== null}
                    key={goal.id}
                    onPress={() => {
                      setSelectGoalId(goal.id);
                      setGoalText(goal.goalText);
                      setGoalStartDate(goal.startDate);
                      setGoalEndDate(goal.dDay);
                    }}
                  >
                    <View
                      key={goal.id}
                      style={{
                        width: 300,
                        padding: 15,
                        borderBottomColor:
                          goalSelectData.length !== i + 1
                            ? styles.lightGreyColor
                            : null,
                        borderBottomWidth:
                          goalSelectData.length !== i + 1 ? 1 : null,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{ fontSize: 13, color: styles.darkGreyColor }}
                        >
                          {moment(goal.startDate).format("YYYY-MM-DD")}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: styles.darkGreyColor,
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        >
                          ~
                        </Text>
                        <Text
                          style={{ fontSize: 13, color: styles.darkGreyColor }}
                        >
                          {moment(goal.dDay).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                          marginTop: 7,
                        }}
                      >
                        {goal.goalText}
                      </Text>
                      {selectGoalId === goal.id ? (
                        <View
                          style={{
                            position: "absolute",
                            top: 20,
                            left: 10,
                            zIndex: 1,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(200, 200, 200, 0.5)",
                          }}
                        >
                          <ExpoIcon name={"check"} />
                        </View>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.lightGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setGoalSelectModal(!goalSelectModal)}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.lightGreyColor,
                  }}
                >
                  <Text>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goalSelectHandle()}>
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GoalCreateView;
