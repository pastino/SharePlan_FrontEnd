import React, { useState } from "react";
import { View, Text, Image, TextInput, ToastAndroid } from "react-native";
import contents from "../../../../../contents";
import styles from "../../../../../styles";
import NumberFormat from "react-number-format";

const SalePrice = ({ priceValue, setPriceValue }) => {
  const onChnage = (text) => {
    if (text.length > 8) {
      ToastAndroid.show(
        "금액은 백단위를 초과할 수 없습니다.",
        ToastAndroid.SHORT
      );
    } else if (
      text.length === 2 &&
      text.split("")[0] === String(0) &&
      text.split("")[1] === String(0)
    ) {
      setPriceValue(0);
    } else if (
      text.length === 2 &&
      text.split("")[0] === String(0) &&
      text.split("")[1] !== String(0)
    ) {
      setPriceValue(text.split("")[1]);
    } else {
      setPriceValue(text);
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: contents.width,
          height: 70,
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          flexDirection: "row",
          paddingLeft: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700" }}>판매금액</Text>
        <View
          style={{
            width: contents.width,
            marginLeft: 70,
            flexDirection: "row",
          }}
        >
          <NumberFormat
            value={priceValue}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"₩  "}
            renderText={(formattedValue) => (
              <TextInput
                value={formattedValue}
                onChangeText={onChnage}
                keyboardType={"number-pad"}
                style={{
                  width: contents.width / 2.5,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: styles.darkGreyColor,
                  textAlign: "right",
                  paddingRight: 10,
                }}
              />
            )}
          />
          <Text style={{ marginTop: 10 }}>원</Text>
        </View>
        {/* <View
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
            판매자 소개 / 목표달성 스케쥴 리스트에 대한 설명
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default SalePrice;
