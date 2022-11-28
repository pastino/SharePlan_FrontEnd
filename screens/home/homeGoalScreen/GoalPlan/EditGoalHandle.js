import React from "react";
import { ToastAndroid } from "react-native";
import moment from "moment";

export const stagePlanCreateHandle = async ({
  firstValue,
  secondValue,
  thirdValue,
  forthValue,
  fivethValue,
  startDate,
  secondStartDay,
  thirdStartDay,
  forthStartDay,
  fivethStartDay,
  cSelectedLastDay,
  cSecondSelectedLastDay,
  cThirdSelectedLastDay,
  cForthSelectedLastDay,
  cFivethSelectedLastDay,
  originDDay,
  id,
  stagePlan,
  setIsLoading,
  createdPlanLength,
  createdPlanData,
  editGoalStagePlan,
  navigation,
}) => {
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
        if (stagePlan > createdPlanLength) {
          setIsLoading(true);
          await editGoalStagePlan({
            variables: {
              goalId: id,
              stagePlanText: saveStagePlanTextArray,
              startingDay: saveStartingDayArray,
              endDay: saveEndingDayArray,
              updatePlanNumber: createdPlanLength,
              stagePlan,
              updatePlanId:
                createdPlanData && createdPlanData.map((plan) => plan.id),
              modifyDivision: "updateAfterAdd",
            },
          });
          setIsLoading(false);
          navigation.navigate("GoalEdit");
        } else if (stagePlan < createdPlanLength) {
          const stagePlanIdArray =
            createdPlanData && createdPlanData.map((plan) => plan.id);
          const deleteIdArray = [];
          for (let i = createdPlanLength - 1; i > stagePlan - 1; i--) {
            deleteIdArray.push(stagePlanIdArray[i]);
          }
          const updateIdArrray = [];
          for (let i = 0; i < stagePlan; i++) {
            updateIdArrray.push(stagePlanIdArray[i]);
          }
          setIsLoading(true);
          await editGoalStagePlan({
            variables: {
              stagePlanText: saveStagePlanTextArray,
              startingDay: saveStartingDayArray,
              endDay: saveEndingDayArray,
              updatePlanNumber: stagePlan,
              stagePlan,
              updatePlanId: updateIdArrray,
              deletePlanId: deleteIdArray,
              modifyDivision: "deleteAfterUpdate",
            },
          });
          setIsLoading(false);
          navigation.navigate("GoalEdit");
        } else if (stagePlan === createdPlanLength) {
          const updatePlanIdArray =
            createdPlanData && createdPlanData.map((plan) => plan.id);
          setIsLoading(true);
          await editGoalStagePlan({
            variables: {
              stagePlanText: saveStagePlanTextArray,
              startingDay: saveStartingDayArray,
              endDay: saveEndingDayArray,
              updatePlanNumber: stagePlan,
              updatePlanId: updatePlanIdArray,
              modifyDivision: "update",
            },
          });
          setIsLoading(false);
          navigation.navigate("GoalEdit");
        }
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
  }
};
