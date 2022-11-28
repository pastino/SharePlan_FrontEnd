import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import contents from "../../../../../contents";
import styles from "../../../../../styles";

const IntroduceText = ({ introduceValue, setIntroduceValue }) => {
  const onChnage = (text) => {
    setIntroduceValue(text);
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
        <Text style={{ fontWeight: "700", padding: 10 }}>소개글</Text>
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
            value={introduceValue}
            onChangeText={onChnage}
            placeholder={"욕설 및 적절하지 않은 단어는 피해주세요."}
            multiline={true}
            numberOfLines={4}
            style={{
              width: contents.width / 1.3,
              height: 200,
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
            목표달성 스케쥴 리스트에 대한 설명
          </Text>
        </View>
      </View>
    </View>
  );
};

export default IntroduceText;
