import React, { useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
} from "react-native";
import GoalCreateIndication from "./goalComponents/GoalCreateIndication";
import GoalHeaderView from "./goalComponents/GoalHeaderView";
import contents from "../../../contents";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../../styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ExpoIcon from "../../../components/ExpoIcon";
import Moment from "moment";
import { extendMoment } from "moment-range";
import GoalCard from "./goalComponents/GoalCard";
import { SEE_ME } from "../HomeQueries";
import { useQuery } from "react-apollo-hooks";
import SlideToggle from "../../../components/SlideToggle";
import MultiLine from "./goalComponents/Test";

const GoalBody = styled.View`
  margin-bottom: 10px;
`;

const GoalStackThree = ({ navigation }) => {
  const [value, setValue] = useState();
  const [maxLength, setMaxlength] = useState(33);

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

  const showDatePicker = () => {
    if (startSelectDate === undefined) {
      ToastAndroid.show("시작일을 먼저 선택해주세요.", ToastAndroid.SHORT);
    } else {
      setDatePickerVisibility(!isDatePickerVisible);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelect(date);
  };

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
    } else if (select === undefined || startSelectDate === undefined) {
      ToastAndroid.show("일정을 입력해주세요.", ToastAndroid.SHORT);
    } else {
      navigation.navigate("GoalStackFour", {
        value,
        selectCategory,
        selectItem,
        cardColor,
        select,
        startSelectDate,
        isSwitch,
        keywordValue,
      });
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
        <TouchableOpacity onPress={() => navigation.navigate("GoalStackTwo")}>
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
        <Text style={{ marginLeft: 10, fontWeight: "700" }}>기본정보 생성</Text>
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
        <View style={{ alignItems: "center" }}>
          <GoalBody>
            <GoalCreateIndication indication={3} />
          </GoalBody>
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
                  marginTop: 10,
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
                  select={select}
                  startSelectDate={startSelectDate}
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
                    {select !== undefined ? <Text>{selectDay}</Text> : null}
                    <TouchableOpacity
                      onPress={showDatePicker}
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
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={startSelectDate}
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
    </View>
  );
};

export default GoalStackThree;
