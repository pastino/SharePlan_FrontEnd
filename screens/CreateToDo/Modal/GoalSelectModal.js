import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import ExpoIcon from "../../../components/ExpoIcon";
import styles from "../../../styles";
import moment from "moment";

const GoalSelectModal = ({
  goalModalVisible,
  setGoalModalVisible,
  selectGoal,
  setSelectGoal,
  selectGoalStageHandle,
  data,
  loading,
  navigation,
}) => {
  const [goalKeyword, setGoalKeyword] = useState();
  const [toDayStage, setToDayStage] = useState();
  const [goalStartDate, setGoalStartDate] = useState();
  const [goalEndDate, setGoalEndDate] = useState();
  const [selectStageText, setSelectStageText] = useState();
  const [selectStageStartingDay, setSelectStageStartingDay] = useState();
  const [selectStageEndDay, setSelectStageEndDay] = useState();
  const [selectDetailPlanId, setSelectDetailPlanId] = useState();
  const [goalText, setGoalText] = useState();
  const [sale, setSale] = useState();

  const seeMyGoalList = data && data.seeMyGoalList;

  const selectGoalHandle = ({ goalId }) => {
    setSelectGoal(goalId);
  };

  const selectGoalStage =
    seeMyGoalList && seeMyGoalList.filter((goal) => goal.id === selectGoal);

  const selectDetailPlan =
    selectGoalStage && selectGoalStage[0] && selectGoalStage[0].detailPlans;

  useEffect(() => {
    if (
      selectDetailPlan &&
      selectDetailPlan.length !== 0 &&
      selectDetailPlan !== undefined
    ) {
      for (
        let i = 0;
        i < parseInt(selectDetailPlan && selectDetailPlan.length);
        i++
      ) {
        const start = moment(
          selectDetailPlan &&
            selectDetailPlan[i] &&
            selectDetailPlan[i].startingDay
        ).format("YYYY-MM-DD");
        const end = moment(
          selectDetailPlan && selectDetailPlan[i] && selectDetailPlan[i].endDay
        ).format("YYYY-MM-DD");
        const startDate = moment(start, "YYYY-MM-DD");
        const endDate = moment(end, "YYYY-MM-DD");
        const date = moment(new Date(), "YYYY-MM-DD");
        if (
          (date.isBefore(endDate) && date.isAfter(startDate)) ||
          date.isSame(startDate) ||
          date.isSame(endDate)
        ) {
          setToDayStage(i);
          setSelectStageText(
            selectDetailPlan &&
              selectDetailPlan[i] &&
              selectDetailPlan[i].stagePlanText
          );
          setSelectStageStartingDay(
            selectDetailPlan &&
              selectDetailPlan[i] &&
              selectDetailPlan[i].startingDay
          );
          setSelectStageEndDay(
            selectDetailPlan &&
              selectDetailPlan[i] &&
              selectDetailPlan[i].endDay
          );
          setSelectDetailPlanId(
            selectDetailPlan && selectDetailPlan[i] && selectDetailPlan[i].id
          );
          break;
        }
      }
    }
  }, [selectGoal]);

  const goalSelectModalCancle = () => {
    setGoalModalVisible(!setGoalModalVisible);
    setToDayStage();
    setSelectStageText();
    setSelectStageStartingDay();
    setSelectStageEndDay();
    setSelectDetailPlanId();
    setSelectGoal();
    setGoalKeyword();
    setGoalStartDate();
    setGoalEndDate();
    setGoalText();
    setSale();
  };

  return (
    <Modal
      isVisible={goalModalVisible}
      onBackdropPress={() => goalSelectModalCancle()}
      onRequestClose={() => goalSelectModalCancle()}
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
            width: 320,
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 320,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderBottomColor: styles.darkGreyColor,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "700",
                color: "black",
                marginTop: 10,
              }}
            >
              목표 연동
            </Text>
            <Text style={{ fontSize: 10, marginLeft: 5, marginBottom: 10 }}>
              연동 시 해당 목표 스케쥴과 연동됩니다.
            </Text>
            <Text style={{ fontSize: 10, marginLeft: 5, color: styles.Wine }}>
              ※ 다운 등록된 목표, 완료된 목표,
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginLeft: 5,
                marginBottom: 10,
                color: styles.Wine,
              }}
            >
              일정 만료된 목표는 선택이 불가합니다.
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            {loading ? (
              <View
                style={{
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            ) : (
              <View>
                {seeMyGoalList &&
                seeMyGoalList.length === 0 ? null : selectStageStartingDay ||
                  selectGoal ? (
                  (selectDetailPlan && selectDetailPlan.length === 0) ||
                  selectDetailPlan === undefined ? (
                    <View
                      style={{
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                          fontSize: 12,
                        }}
                      >
                        {goalText}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ textAlign: "center", fontSize: 10 }}>
                          {moment(goalStartDate).format("YYYY-MM-DD")}
                        </Text>
                        <Text style={{ fontSize: 10 }}> ~ </Text>
                        <Text style={{ fontSize: 10 }}>
                          {moment(goalEndDate).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                          fontSize: 12,
                        }}
                      >
                        {goalText}
                      </Text>

                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "700",
                          fontSize: 12,
                          color: styles.darkGreyColor,
                        }}
                      >
                        {selectStageText}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ textAlign: "center", fontSize: 10 }}>
                          {moment(selectStageStartingDay).format("YYYY-MM-DD")}
                        </Text>
                        <Text style={{ fontSize: 10 }}> ~ </Text>
                        <Text style={{ fontSize: 10 }}>
                          {moment(selectStageEndDay).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                    </View>
                  )
                ) : (
                  <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 10, textAlign: "center" }}>
                      연관된 목표를 선택 후 완료를 눌러주세요.
                    </Text>
                  </View>
                )}

                {seeMyGoalList && seeMyGoalList.length === 0 ? (
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: styles.darkGreyColor,
                        textAlign: "center",
                      }}
                    >
                      연동할 목표가 없습니다.
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: styles.darkGreyColor,
                        textAlign: "center",
                      }}
                    >
                      목표카드를 생성해주세요.
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setGoalModalVisible(!goalModalVisible);
                        navigation.navigate("GoalStack");
                      }}
                    >
                      <Text
                        style={{
                          color: styles.Wine,
                          fontWeight: "700",
                          textAlign: "center",
                          marginTop: 10,
                          textDecorationLine: "underline",
                        }}
                      >
                        목표카드 생성하기
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      marginBottom: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {seeMyGoalList &&
                      seeMyGoalList.map((goal) => (
                        <TouchableOpacity
                          disabled={
                            goal.sale !== null ||
                            moment(goal.dDay).format("YYYY-MM-DD") <
                              moment(new Date()).format("YYYY-MM-DD") ||
                            goal.complete === true
                          }
                          key={goal.id}
                          onPress={() => {
                            selectGoalHandle({ goalId: goal && goal.id });
                            setGoalKeyword(goal && goal.keyWord);
                            setGoalText(goal && goal.goalText);
                            setSale(goal && goal.sale);
                            setGoalStartDate(
                              moment(goal && goal.startDate).format(
                                "YYYY-MM-DD"
                              )
                            );
                            setGoalEndDate(
                              moment(goal && goal.dDay).format("YYYY-MM-DD")
                            );
                          }}
                        >
                          <View
                            style={{
                              width: goal.id === selectGoal ? 280 : 270,
                              height: "auto",
                              marginBottom: 10,
                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center",
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.8,
                              shadowRadius: 1,
                              elevation: 1,
                              borderRadius: 2,
                              borderWidth: 1,
                              borderColor: "#ddd",
                              borderBottomWidth: 0,
                            }}
                          >
                            {goal.sale !== null ||
                            moment(goal.dDay).format("YYYY-MM-DD") <
                              moment(new Date()).format("YYYY-MM-DD") ||
                            goal.complete === true ? (
                              <View
                                style={{
                                  position: "absolute",
                                  left: 1,
                                  top: 1,
                                }}
                              >
                                {goal.sale !== null ? (
                                  <Text
                                    style={{
                                      fontWeight: "700",
                                      fontSize: 10,
                                      color: styles.Wine,
                                    }}
                                  >
                                    다운공유 중
                                  </Text>
                                ) : moment(goal.dDay).format("YYYY-MM-DD") <
                                  moment(new Date()).format("YYYY-MM-DD") ? (
                                  <Text
                                    style={{
                                      fontWeight: "700",
                                      fontSize: 10,
                                      color: styles.Wine,
                                    }}
                                  >
                                    기간만료
                                  </Text>
                                ) : goal.complete === true ? (
                                  <Text
                                    style={{
                                      fontWeight: "700",
                                      fontSize: 10,
                                      color: styles.Wine,
                                    }}
                                  >
                                    완료
                                  </Text>
                                ) : null}
                              </View>
                            ) : null}
                            {goal &&
                            goal.detailPlans &&
                            goal.detailPlans.length === 0 &&
                            goal.id === selectGoal ? (
                              <View style={{ padding: 10 }}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "700",
                                    color:
                                      goal.sale !== null ||
                                      moment(goal.dDay).format("YYYY-MM-DD") <
                                        moment(new Date()).format(
                                          "YYYY-MM-DD"
                                        ) ||
                                      goal.complete === true
                                        ? styles.darkGreyColor
                                        : null,
                                  }}
                                >
                                  {goal.goalText}
                                </Text>
                                <View
                                  style={{
                                    position: "absolute",
                                    right: -10,
                                    top: -10,
                                    zIndex: 1,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(200, 200, 200, 0.5)",
                                  }}
                                >
                                  <ExpoIcon name={"check"} size={20} />
                                </View>
                              </View>
                            ) : (
                              <View style={{ padding: 10 }}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color:
                                      goal.sale !== null ||
                                      moment(goal.dDay).format("YYYY-MM-DD") <
                                        moment(new Date()).format(
                                          "YYYY-MM-DD"
                                        ) ||
                                      goal.complete === true
                                        ? styles.darkGreyColor
                                        : null,
                                  }}
                                >
                                  {goal.goalText}
                                </Text>
                              </View>
                            )}
                            {goal.id === selectGoal ? (
                              <View
                                style={{
                                  width: 280,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {goal &&
                                  goal.detailPlans &&
                                  goal.detailPlans.map((detailPlan, index) => (
                                    <TouchableOpacity
                                      key={detailPlan.id}
                                      onPress={() => {
                                        setSelectStageStartingDay(
                                          detailPlan.startingDay
                                        );
                                        setSelectStageEndDay(detailPlan.endDay);
                                        setSelectStageText(
                                          detailPlan.stagePlanText
                                        );
                                        setSelectDetailPlanId(detailPlan.id);
                                      }}
                                    >
                                      <View
                                        style={{
                                          borderTopWidth: 0.5,
                                          borderTopColor: styles.darkGreyColor,
                                          width: 280,
                                          padding: 10,
                                        }}
                                      >
                                        <View
                                          style={{
                                            marginBottom: 3,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontWeight: "700",
                                              fontSize: 12,
                                            }}
                                          >
                                            Stage {index + 1}
                                          </Text>
                                          {toDayStage === index ? (
                                            <Text
                                              style={{
                                                fontSize: 10,
                                                marginRight: 10,
                                                fontWeight: "700",
                                                color: styles.TextLavendar,
                                              }}
                                            >
                                              진행중
                                            </Text>
                                          ) : null}
                                        </View>
                                        <View
                                          style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Text style={{ fontSize: 12 }}>
                                            {detailPlan.stagePlanText}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <Text style={{ fontSize: 12 }}>
                                              {moment(
                                                detailPlan.startingDay
                                              ).format("YYYY-MM-DD")}
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                              {" "}
                                              ~{" "}
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                              {moment(detailPlan.endDay).format(
                                                "YYYY-MM-DD"
                                              )}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      {detailPlan.id === selectDetailPlanId ? (
                                        <View
                                          style={{
                                            position: "absolute",
                                            right: 10,
                                            top: 5,
                                            zIndex: 1,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor:
                                              "rgba(200, 200, 200, 0.5)",
                                          }}
                                        >
                                          <ExpoIcon name={"check"} />
                                        </View>
                                      ) : null}
                                    </TouchableOpacity>
                                  ))}
                              </View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                )}
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                borderTopColor: styles.lightGreyColor,
                borderTopWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
            >
              <TouchableOpacity onPress={() => goalSelectModalCancle()}>
                <View
                  style={{
                    width: 160,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightColor: styles.lightGreyColor,
                    borderRightWidth: 1,
                    height: 50,
                  }}
                >
                  <View style={{}}>
                    <Text style={{ fontSize: 15 }}>취소</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (selectDetailPlan && selectDetailPlan.length === 0) {
                    selectGoalStageHandle({
                      goalId: selectGoal,
                      stagePlanText: null,
                      startingDay: goalStartDate,
                      endDay: goalEndDate,
                      goalKeyword,
                      goalText,
                      sale,
                    });
                  } else {
                    selectGoalStageHandle({
                      goalId: selectGoal,
                      stagePlanText: selectStageText,
                      startingDay: selectStageStartingDay,
                      endDay: selectStageEndDay,
                      goalKeyword,
                      goalText,
                      sale,
                    });
                  }
                  goalSelectModalCancle();
                }}
              >
                <View
                  style={{
                    width: 160,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                  }}
                >
                  <View style={{}}>
                    <Text style={{ fontSize: 15 }}>확인</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalSelectModal;
