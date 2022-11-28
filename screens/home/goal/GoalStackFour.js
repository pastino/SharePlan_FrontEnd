import React, { useState } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import GoalCreateIndication from "./goalComponents/GoalCreateIndication";
import GoalHeaderView from "./goalComponents/GoalHeaderView";
import contents from "../../../contents";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import styles from "../../../styles";
import { useMutation } from "react-apollo-hooks";
import {
  CREATE_GOAL,
  CREATE_GOAL_TEST,
  SEE_ME,
  SEE_FEED,
} from "../HomeQueries";
import { NavigationActions } from "react-navigation";
import { SEE_GOAL_FULL_STAGE_PLAN } from "../homeGoalScreen/GoalPlan/GoalPlanQuery";
import GoalStagePlan from "../homeGoalScreen/GoalPlan/GoalStagePlan";
import ExpoIcon from "../../../components/ExpoIcon";
import Modal from "react-native-modal";
import { SEE_HOME_GOAL } from "../../newQueries";

const GoalBody = styled.View`
  margin-bottom: 10px;
`;

const GoalStackFour = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [skipModal, setSkipModal] = useState(false);

  const goalText = navigation.getParam("value");
  const bigCategory = navigation.getParam("selectCategory");
  const detailCategory = navigation.getParam("selectItem");
  const cardColor = navigation.getParam("cardColor");
  const dDay = navigation.getParam("select");
  const startDate = navigation.getParam("startSelectDate");
  const cardPrivate = navigation.getParam("isSwitch");
  const category = `${bigCategory} > ${detailCategory}`;
  const keyword = navigation.getParam("keywordValue");

  const selectedLastDay = navigation.getParam("selectedLastDay");
  const secondSelectedLastDay = navigation.getParam("secondSelectedLastDay");
  const thirdSelectedLastDay = navigation.getParam("thirdSelectedLastDay");
  const forthSelectedLastDay = navigation.getParam("forthSelectedLastDay");
  const fivethSelectedLastDay = navigation.getParam("fivethSelectedLastDay");

  const [create] = useMutation(CREATE_GOAL_TEST, {
    refetchQueries: () => [
      {
        query: SEE_HOME_GOAL,
      },
      {
        query: SEE_FEED,
      },
      { query: SEE_GOAL_FULL_STAGE_PLAN },
    ],
    awaitRefetchQueries: true,
  });

  const createGoalCard = async () => {
    setIsLoading(true);
    setSkipModal(!skipModal);
    await create({
      variables: {
        goalText,
        category: bigCategory,
        detailCategory,
        cardColor,
        startDate,
        dDay,
        cardPrivate,
        keyword,
        division: "skip",
      },
    });
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
  };

  const [createGoalCardModal, setCreateGoalCardModal] = useState(false);

  return (
    <>
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
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("GoalStackThree")}
          >
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
          <Text style={{ marginLeft: 10, fontWeight: "700" }}>
            단계 별 목표설정
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <TouchableOpacity
                onPress={() => setSkipModal(!skipModal)}
                style={{ marginRight: 20 }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    textDecorationLine: "underline",
                    color: styles.darkGreyColor,
                  }}
                >
                  건너뛰기
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={
                  () => setSkipModal(!skipModal)
                  // setCreateGoalCardModal(true)
                }
                style={{ marginRight: 13 }}
              >
                <ExpoIcon name={"check"} />
                <Text style={{ fontSize: 7, textAlign: "center" }}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
                모든 정보 입력이 끝났습니다.
              </Text>
              <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
                상단 오른쪽의 완료를 클릭하여{" "}
              </Text>
              <Text style={{ fontWeight: "700", color: styles.darkGreyColor }}>
                목표생성을 완료해주세요.{" "}
              </Text>
            </View>
            {/* <GoalBody>
              <GoalCreateIndication indication={4} />
            </GoalBody>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <GoalStagePlan
                navigation={navigation}
                goalText={goalText}
                startDate={startDate}
                originDDay={dDay}
                bigCategory={bigCategory}
                detailCategory={detailCategory}
                cardColor={cardColor}
                dDay={dDay}
                cardPrivate={cardPrivate}
                keyword={keyword}
                division={"create"}
                selectedLastDay={selectedLastDay}
                secondSelectedLastDay={secondSelectedLastDay}
                thirdSelectedLastDay={thirdSelectedLastDay}
                forthSelectedLastDay={forthSelectedLastDay}
                fivethSelectedLastDay={fivethSelectedLastDay}
                create={create}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                createGoalCardModal={createGoalCardModal}
                setCreateGoalCardModal={setCreateGoalCardModal}
              />
            </View> */}
          </View>
        </ScrollView>
      </View>
      <Modal
        isVisible={skipModal}
        onBackdropPress={() => setSkipModal(!skipModal)}
        onRequestClose={() => setSkipModal(!skipModal)}
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
            {/* <View
              style={{
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>단계 별 목표설정을 건너뛰고,</Text>
              <Text>목표카드를 생성하겠습니까?</Text>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: styles.Wine,
                    marginTop: 20,
                    textAlign: "center",
                  }}
                >
                  생성 후 목표카드 설정을 통해서
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: styles.Wine,
                    textAlign: "center",
                  }}
                >
                  언제든지 생성가능합니다.
                </Text>
              </View>
            </View> */}
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>목표카드를 생성하겠습니까?</Text>
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
                onPress={() => setSkipModal(!skipModal)}
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
                onPress={() => createGoalCard()}
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
      {isLoading ? (
        <Modal isVisible={isLoading} transparent={true}>
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
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={"white"} size={50} />
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: contents.width / 1.3,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text>목표카드 생성중입니다. </Text>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default GoalStackFour;
