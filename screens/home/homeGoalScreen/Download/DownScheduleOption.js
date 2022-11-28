import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../../../styles";

const DownScheduleOption = ({
  text,
  useState,
  setUseState,
  title,
  boxText,
  length,
  zeroLengthText,
  timeState,
}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: styles.lightGreyColor,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          paddingTop: 15,
          paddingLeft: 15,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: styles.darkGreyColor,
          textAlign: "center",
          marginBottom: 5,
          fontWeight: "700",
        }}
      >
        {length === 0 ? zeroLengthText : text}
      </Text>
      {title === "알람" && timeState === true ? (
        <Text
          style={{
            fontSize: 10,
            color: styles.Wine,
            textAlign: "center",
            marginBottom: 5,
            fontWeight: "700",
          }}
        >
          ※ 시간삭제 시 알람도 삭제됩니다.
        </Text>
      ) : null}

      <View
        style={{
          width: 300,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            width: 200,
            flexDirection: "row",
            height: 40,
          }}
        >
          <TouchableOpacity
            disabled={length === 0 ? true : false}
            onPress={() => setUseState(false)}
          >
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor:
                  !useState && length !== 0
                    ? styles.MainColor
                    : styles.lightGreyColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    !useState && length !== 0 ? "white" : styles.darkGreyColor,
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                기존
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={length === 0 ? true : false}
            onPress={() => setUseState(true)}
          >
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor:
                  useState && length !== 0
                    ? styles.MainColor
                    : styles.lightGreyColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    useState && length !== 0 ? "white" : styles.darkGreyColor,
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                {boxText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DownScheduleOption;
