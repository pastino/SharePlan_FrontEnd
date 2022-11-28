import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import contents from "../../../../../contents";
import styles from "../../../../../styles";

const OtherCostsDesc = ({ otherCostsDescValue, setOtherCostsDescValue }) => {
  const onChnage = (text) => {
    setOtherCostsDescValue(text);
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
        <Text style={{ fontWeight: "700", padding: 10 }}>기타비용 설명</Text>
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
            value={otherCostsDescValue}
            onChangeText={onChnage}
            placeholder={
              "목표 달성을 위하여 스케쥴을 수행하는데 드는 비용  예) 강의비용 - 30,000원"
            }
            multiline={true}
            numberOfLines={4}
            style={{
              width: contents.width / 1.3,
              height: 150,
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
            상세히 기입하되, 정확하지 않을 시 예상금액 기입
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OtherCostsDesc;
