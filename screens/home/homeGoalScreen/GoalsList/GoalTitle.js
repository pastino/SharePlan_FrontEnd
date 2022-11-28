import React from "react";
import { View, Text } from "react-native";
import contents from "../../../../contents";
import styles from "../../../../styles";

const GoalTitle = ({ goalTapName, goalText }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          width: contents.width / 4.3,
          height: contents.height / 30,
          backgroundColor: styles.MainColor,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>{goalTapName}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: contents.width / 1.5,
          marginLeft: 10
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            marginLeft: 10,
            textAlign: "center"
          }}
        >
          {goalText}
        </Text>
      </View>
    </View>
  );
};

export default GoalTitle;
