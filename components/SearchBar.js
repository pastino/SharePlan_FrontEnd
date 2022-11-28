import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import contents from "../contents";
import styles from "../styles";
import ExpoIcon from "./ExpoIcon";

const SearchBar = ({ onChange, value, onSubmit, setValue, setShouldFetch }) => {
  return (
    <View
      style={{
        width: contents.width / 1.35,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TextInput
        returnKeyType={"search"}
        onChangeText={onChange}
        value={value}
        onEndEditing={onSubmit}
        placeholder={"검색"}
        style={{
          width: contents.width / 1.4,
          height: 40,
          backgroundColor: styles.lightGreyColor,
          borderRadius: 10,
          paddingLeft: 10,
          paddingRight: 50
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          zIndex: 1
        }}
        onPress={() => {
          setValue("");
          setShouldFetch(false);
        }}
      >
        <ExpoIcon
          name={"close-circle"}
          size={25}
          color={styles.darkGreyColor}
        />
      </TouchableOpacity>
    </View>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
