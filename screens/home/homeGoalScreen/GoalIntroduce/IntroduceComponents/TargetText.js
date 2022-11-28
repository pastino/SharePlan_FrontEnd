import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../../../../styles";
import contents from "../../../../../contents";

const TargetText = ({ targetValue, setTargetValue }) => {
  const targetOnChange = (text) => {
    setTargetValue(text);
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: contents.width,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontWeight: "700", padding: 10 }}>타겟층</Text>
        <View
          style={{
            width: contents.width,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <TextInput
            value={targetValue}
            onChangeText={targetOnChange}
            placeholder={
              "목표를 달성하는데 소요되는 시간 및 강도 등을 토대로 적절한 대상(구매자)이 누구인지 설명해 주세요."
            }
            multiline={true}
            numberOfLines={4}
            style={{
              width: contents.width / 1.3,
              height: 100,
              padding: 10,
              justifyContent: "flex-start",
              textAlignVertical: "top",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 2,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: "#ddd",
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: contents.width,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: styles.darkGreyColor,
              fontWeight: "700",
            }}
          >
            구매자가 본인의 여건에 맞는 스케쥴인지 확인 할 수 있는 정보
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TargetText;
