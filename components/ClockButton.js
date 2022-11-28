import React, { useEffect, useState } from "react";
import styled from "styled-components";
import contents from "../contents";
import { TouchableOpacity } from "react-native-gesture-handler";
import Proptypes from "prop-types";
import { ActivityIndicator, Image, View } from "react-native";
import styles from "../styles";

const Text = styled.Text`
  color: white;
  font-size: 20px;
  font-family: "flower";
  color: black;
`;

const ClockButton = ({
  inactive,
  loading = false,
  onPress,
  wakeUpClock,
  queryLoading,
  homeText,
}) => {
  return (
    <TouchableOpacity disabled={inactive || loading} onPress={onPress}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 57,
          height: 57,
          borderRadius: homeText === "기상 인증하기" || wakeUpClock ? 15 : null,
          borderWidth: homeText === "기상 인증하기" || wakeUpClock ? 1 : null,
        }}
      >
        {/* {loading || queryLoading ? (
          <ActivityIndicator color={"black"} />
        ) : wakeUpClock === undefined ? (
          homeText === "기상 인증하기" ? (
            <>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {homeText}
              </Text>
              <Text style={{ fontSize: 7, marginTop: 3, color: styles.Indigo }}>
                Click
              </Text>
            </>
          ) : (
            <Image
              resizeMode={"contain"}
              source={require("../assets/hongicLogo.png")}
              style={{
                width: 57,
                height: 57,
              }}
            />
          )
        ) : wakeUpClock === 4 ? (
          <Image
            source={require("../assets/4wake.png")}
            resizeMode={"contain"}
            style={{
              width: 57,
              height: 57,
            }}
          />
        ) : wakeUpClock === 5 ? (
          <Image
            source={require("../assets/5wakeup.png")}
            resizeMode={"contain"}
            style={{
              width: 57,
              height: 57,
            }}
          />
        ) : wakeUpClock === 6 ? (
          <Image
            source={require("../assets/6wakeup.png")}
            resizeMode={"contain"}
            style={{
              width: 57,
              height: 57,
            }}
          />
        ) : wakeUpClock === 7 ? (
          <Image
            source={require("../assets/7wakeup.png")}
            resizeMode={"contain"}
            style={{
              width: 57,
              height: 57,
            }}
          />
        ) : null} */}
      </View>
    </TouchableOpacity>
  );
};

ClockButton.propTypes = {
  loading: Proptypes.bool,
  onPress: Proptypes.func.isRequired,
};

export default ClockButton;
