import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import contents from "../../../../contents";
import styles from "../../../../styles";
import ExpoIcon from "../../../../components/ExpoIcon";

const GoalStageBar = ({
  startingDay,
  endDay,
  data,
  loading,
  keyWord,
  index,
  stagePlanText,
  toDoData,
  goalId,
}) => {
  const width = 2.6;
  const a = moment(endDay);
  const b = moment(new Date());
  const c = moment(endDay);
  const d = moment(startingDay);

  const remainderDateDiff = a.diff(b, "days") + 1;
  const totalDateDiff = c.diff(d, "days") + 1;

  const progressDay = totalDateDiff - remainderDateDiff + 1;

  const dDay = remainderDateDiff - 1;

  const progressPercent = Math.floor((progressDay / totalDateDiff) * 100);

  const goalToDoArray =
    toDoData &&
    toDoData.dayToDoes &&
    toDoData.dayToDoes.filter(
      (toDo) =>
        toDo.goal !== null && toDo && toDo.goal && toDo.goal.id === goalId
    );

  const start = moment(startingDay).format("YYYY-MM-DD");
  const end = moment(endDay).format("YYYY-MM-DD");
  const startDate = moment(start, "YYYY-MM-DD");
  const endDate = moment(end, "YYYY-MM-DD");

  const goalStageToDoArray =
    goalToDoArray &&
    goalToDoArray.filter(
      (toDo) =>
        moment(toDo.monthDay).format() <=
          moment(endDate && toDo.monthDay).format() &&
        moment(toDo.monthDay).format() >= moment(startDate).format()
    );

  const goalStageToDoLength = goalStageToDoArray && goalStageToDoArray.length;

  const goalStageCompleteToDoArray =
    goalStageToDoArray &&
    goalStageToDoArray.filter((toDo) => toDo.complete === true);

  const goalStageCompleteToDoLength =
    goalStageCompleteToDoArray && goalStageCompleteToDoArray.length;

  const completePercent =
    goalStageToDoLength > 0
      ? (goalStageCompleteToDoLength / goalStageToDoLength) * 100
      : null;

  return (
    <View style={{ marginTop: 3, marginBottom: 3 }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 10 }}>{keyWord}</Text>
        <Text style={{ fontSize: 10 }}> / </Text>
        <Text style={{ fontSize: 10, fontWeight: "700" }}>Stage {index} :</Text>
        <Text style={{ fontSize: 10, color: styles.Wine, fontWeight: "700" }}>
          {" "}
          {stagePlanText}
        </Text>
        <Text
          style={{ fontSize: 10, marginLeft: 10, color: styles.darkGreyColor }}
        >
          [{moment(startingDay).format("M/D")}
        </Text>
        <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>~</Text>
        <Text style={{ fontSize: 10, color: styles.darkGreyColor }}>
          {moment(endDay).format("M/D")}]
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
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              color: styles.darkGreyColor,
              textAlign: "center",
              marginTop: 2,
              width: 35,
            }}
          >
            D-{dDay}
          </Text>
          <View
            style={{
              width: (contents.width / width / totalDateDiff) * progressDay,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              height: 20,
              backgroundColor: styles.Yellow,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: (contents.width / width / totalDateDiff) * progressDay,
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                paddingRight: progressPercent === 100 ? 3 : null,
              }}
            >
              {progressPercent < 70 ? null : (
                <View
                  style={{
                    height: 20,
                    justifyContent: "center",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "700",
                    }}
                  >
                    {progressPercent}%
                  </Text>
                </View>
              )}
              {progressPercent === 100 ? (
                <ExpoIcon
                  name={"clock-end"}
                  size={17}
                  color={styles.MainColor}
                />
              ) : (
                <ExpoIcon
                  name={"clock-fast"}
                  size={17}
                  color={styles.MainColor}
                />
              )}
            </View>
          </View>
          <View
            style={{
              width:
                contents.width / width -
                (contents.width / width / totalDateDiff) * progressDay,
              height: 20,
              backgroundColor: styles.lightGreyColor,
            }}
          >
            {progressPercent > 70 ? null : (
              <View
                style={{
                  height: 20,
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "700",
                  }}
                >
                  {progressPercent}%
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width:
                goalStageCompleteToDoLength === 0
                  ? 0
                  : ((contents.width / width) * goalStageCompleteToDoLength) /
                    goalStageToDoLength,
              height: 20,
              flexDirection: "row",
              borderLeftWidth: goalStageCompleteToDoLength === 0 ? 0.5 : null,
              borderLeftColor:
                goalStageCompleteToDoLength === 0 ? styles.darkGreyColor : null,
              backgroundColor: styles.Sky,
              borderTopRightRadius:
                goalStageToDoLength !== 0 &&
                goalStageCompleteToDoLength === goalStageToDoLength
                  ? 10
                  : 0,
              borderBottomRightRadius:
                goalStageToDoLength !== 0 &&
                goalStageCompleteToDoLength === goalStageToDoLength
                  ? 10
                  : 0,
            }}
          >
            <View
              style={{
                width:
                  goalStageCompleteToDoLength === 0
                    ? 0
                    : ((contents.width / width) * goalStageCompleteToDoLength) /
                      goalStageToDoLength,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: progressPercent === 100 ? width : null,
                paddingRight:
                  goalStageToDoLength !== 0 &&
                  goalStageCompleteToDoLength === goalStageToDoLength
                    ? 10
                    : null,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {goalStageToDoLength !== 0 && completePercent > 70 ? (
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "700",
                      marginRight: 10,
                    }}
                  >
                    {Math.floor(
                      (goalStageCompleteToDoLength / goalStageToDoLength) * 100
                    )}
                    {goalStageToDoLength === 0 ? null : "%"}
                  </Text>
                ) : null}

                {completePercent === 100 ? (
                  <ExpoIcon
                    name={"exit-run"}
                    size={17}
                    color={styles.MainColor}
                  />
                ) : (
                  <ExpoIcon
                    name={"run-fast"}
                    size={17}
                    color={styles.MainColor}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              width:
                goalStageCompleteToDoLength === 0
                  ? contents.width / width
                  : contents.width / width -
                    ((contents.width / width) * goalStageCompleteToDoLength) /
                      goalStageToDoLength,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              height: 20,
              backgroundColor: styles.lightGreyColor,
            }}
          >
            <View
              style={{
                height: 20,
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              {goalStageToDoLength === 0 ? (
                <Text
                  style={{ fontSize: 8, fontWeight: "700", marginRight: 10 }}
                >
                  계획없음
                </Text>
              ) : null}
              {goalStageToDoLength !== 0 && completePercent < 70 ? (
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "700",
                  }}
                >
                  {goalStageToDoLength === 0 ? null : "%"}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "700",
            color: styles.darkGreyColor,
            marginLeft: 10,
          }}
        >
          {goalStageCompleteToDoLength}/{goalStageToDoLength}
        </Text>
      </View>
    </View>
  );
};

export default GoalStageBar;
