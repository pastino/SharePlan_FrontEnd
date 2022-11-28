import React from "react";
import { View, Text } from "react-native";
import contents from "../../../../../contents";
import moment from "moment";
import styles from "../../../../../styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const ToDoStageView = ({
  stageData,
  stageNumber,
  toDayStage,
  navigation,
  id,
}) => {
  const size = contents.width / 2.3;
  let toDayGoal;
  if (stageNumber === toDayStage) {
    toDayGoal = true;
  } else {
    toDayGoal = false;
  }
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("ToDoCalendar", {
          stageNumber,
          stagePlan: stageData.stagePlanText,
          startDay: stageData.startingDay,
          endDay: stageData.endDay,
          id,
        })
      }
    >
      <View
        style={{
          width: contents.width / 2.3,
          height: contents.width / 2.2,
          backgroundColor: toDayGoal ? styles.subYellow : null,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#ddd",
          borderBottomWidth: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: toDayGoal ? "white" : null,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            Stage {stageNumber}
          </Text>
          {toDayGoal ? (
            <View
              style={{
                width: 50,
                height: 25,
                backgroundColor: styles.Green,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                  fontWeight: "700",
                }}
              >
                진행중
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
            borderTopColor: styles.lightGreyColor,
            borderTopWidth: 0.5,
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 0.5,
            padding: 10,
          }}
        >
          <Text style={{ color: toDayGoal ? "white" : null }}>
            {stageData.stagePlanText}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              marginTop: 7,
            }}
          >
            <Text
              style={{
                color: toDayGoal ? "white" : null,
                fontSize: 13,
                fontWeight: "700",
              }}
            >
              목표일
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 7,
              }}
            >
              <Text style={{ color: toDayGoal ? "white" : null, fontSize: 10 }}>
                {moment(stageData.startingDay).format("YYYY.MM.DD")}
              </Text>
              <Text style={{ color: toDayGoal ? "white" : null, fontSize: 10 }}>
                {" "}
                ~{" "}
              </Text>
              <Text style={{ color: toDayGoal ? "white" : null, fontSize: 10 }}>
                {moment(stageData.endDay).format("YYYY.MM.DD")}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginTop: 7,
              }}
            >
              <Text
                style={{
                  color: toDayGoal ? "white" : null,
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                해야할 일
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 7,
                }}
              >
                <Text
                  style={{ color: toDayGoal ? "white" : null, fontSize: 10 }}
                >
                  {moment(stageData.startingDay).format("YYYY.MM.DD")}
                </Text>
                <Text
                  style={{ color: toDayGoal ? "white" : null, fontSize: 10 }}
                >
                  {" "}
                  ~{" "}
                </Text>
                <Text
                  style={{ color: toDayGoal ? "white" : null, fontSize: 10 }}
                >
                  {moment(stageData.endDay).format("YYYY.MM.DD")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ToDoStageView;
