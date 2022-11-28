import React from "react";
import Proptypes from "prop-types";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

const ModalButton = ({
  text,
  onPress,
  style,
  backColor,
  textColor,
  disabled = false,
  isLoading,
  width = 100,
  height = 50,
  color
}) => (
  <TouchableOpacity onPress={() => onPress()} disabled={disabled}>
    <View
      style={{
        width,
        height,
        backgroundColor: backColor,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={{ fontSize: 13, fontWeight: "700", color: textColor }}>
          {text}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

ModalButton.propTypes = {
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired
};

export default ModalButton;
