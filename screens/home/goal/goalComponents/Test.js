import React from "react";
import { TextInput } from "react-native";
import styles from "../../../../styles";

const MultiLine = ({ value, setValue, maxLength, setMaxLength, maxLines }) => {
  const onChangeText = (text) => {
    const lines = text.split("\n");
    if (lines.length <= (maxLines || 1)) {
      if (lines.length === 2) {
        const firstLineLength = 20 + lines[0].length;
        setMaxLength(firstLineLength);
      } else {
        setMaxLength(40);
      }
      setValue(text);
    }
  };

  return (
    <TextInput
      maxLength={maxLength}
      multiline={true}
      value={value}
      onChangeText={onChangeText}
      style={{
        width: 300,
        minHeight: 47,
        maxHeight: 47,
        backgroundColor: styles.lightGreyColor,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        paddingLeft: 10,
      }}
    />
  );
};

export default MultiLine;
