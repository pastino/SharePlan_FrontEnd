import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import contents from "../../../../contents";
import styles from "../../../../styles";
import PropTypes from "prop-types";

const Number = ({ number, indication }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        backgroundColor: "white",
        borderRadius: 20,
        backgroundColor:
          indication === number ? styles.MainColor : styles.lightGreyColor
      }}
    >
      <Text style={{ color: indication === number ? "white" : "black" }}>
        {number}
      </Text>
    </View>
  );
};

const Border = ({}) => {
  return (
    <View
      style={{
        width: contents.width / 10,
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: styles.lightGreyColor,
        marginLeft: 20,
        marginRight: 20
      }}
    ></View>
  );
};

const GoalCreateIndication = ({ indication }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          width: contents.width / 1.03,
          height: contents.height / 17,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 10
        }}
      >
        <Number number={1} indication={indication} />
        <Border />
        <Number number={2} indication={indication} />
        <Border />
        <Number number={3} indication={indication} />
        <Border />
        <Number number={4} indication={indication} />
      </View>
    </View>
  );
};

GoalCreateIndication.propTypes = {
  indication: PropTypes.number.isRequired
};

export default GoalCreateIndication;
