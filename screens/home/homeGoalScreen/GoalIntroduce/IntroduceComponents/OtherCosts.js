import React, { useState } from "react";
import { View, Text, Image, TextInput, ToastAndroid } from "react-native";
import contents from "../../../../../contents";
import styles from "../../../../../styles";
import NumberFormat from "react-number-format";

const OtherCosts = ({ otherCostsValue, setOtherCostsValue }) => {
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
      setOtherCostsValue(0);
    } else if (
      text.length === 2 &&
      text.split("")[0] === String(0) &&
      text.split("")[1] !== String(0)
    ) {
      setOtherCostsValue(text.split("")[1]);
    } else {
      setOtherCostsValue(text);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        borderBottomColor: styles.lightGreyColor,
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: contents.width,
          height: 70,

          flexDirection: "row",
          paddingLeft: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700" }}>기타비용</Text>
        <View
          style={{
            width: contents.width,
            marginLeft: 70,
            flexDirection: "row",
          }}
        >
          <NumberFormat
            value={otherCostsValue}
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
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: contents.width,
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: styles.darkGreyColor,
            fontWeight: "700",
          }}
        >
          [ 구매자 참고용 ]
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: styles.darkGreyColor,
            fontWeight: "700",
          }}
        >
          Ex.) 강의 구입비용, 비행기 티켓비용, 기타 필요물품
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: styles.darkGreyColor,
            fontWeight: "700",
          }}
        >
          구입비용 등의 총 합계금액 (정확하지 않을 시 예상금액 기입)
        </Text>
      </View>
    </View>
  );
};

export default OtherCosts;
