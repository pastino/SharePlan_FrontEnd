import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import contents from "../contents";

export default () => (
  <ScrollView>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: contents.height / 1.2
      }}
    >
      <ActivityIndicator color={styles.blackColor} />
    </View>
  </ScrollView>
);
