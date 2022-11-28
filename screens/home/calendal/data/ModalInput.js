import React, { useState } from "react";
import styled from "styled-components";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Text } from "react-native";
import { ToastAndroid } from "react-native";
import PropTypes from "prop-types";
import ExpoIcon from "../../../../components/ExpoIcon";
import ModalButton from "../../../../components/ModalButton";
import contents from "../../../../contents";
import styles from "../../../../styles";

const View = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalInput = ({
  onPressHandle,
  buttonText,
  input,
  mutation,
  value,
  setValue,
  placeholder,
  isImportWhether,
  setIsImportWhether,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (text) => setValue(text);
  const saveHandle = async () => {
    if (value.length === 0) {
      ToastAndroid.show(placeholder, ToastAndroid.SHORT);
    } else {
      onPressHandle();
      setValue("");
      setIsImportWhether("검정");
      await mutation();
    }
  };
  return (
    <View>
      {isLoading ? <ActivityIndicator size="large" color="black" /> : null}
      <TextInput
        ref={input}
        style={{
          width: 250,
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          paddingLeft: 10,
        }}
        multiline={true}
        autoFocus={true}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
      <View
        style={{
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "700" }}>중요도</Text>
        <View style={{ marginLeft: 10, flexDirection: "row", marginTop: 7 }}>
          <TouchableOpacity
            style={{ marginRight: 7 }}
            onPress={() => setIsImportWhether("빨강")}
          >
            <View
              style={{
                width: 50,
                height: 30,
                backgroundColor: styles.Wine,
                borderRadius: 5,
              }}
            />
            {isImportWhether === "빨강" ? (
              <View style={{ position: "absolute", right: 15, top: 4 }}>
                <ExpoIcon
                  name={"checkbox-marked-circle"}
                  color={"white"}
                  size={20}
                />
              </View>
            ) : null}
            <Text style={{ textAlign: "center", fontSize: 10 }}>상</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 7 }}
            onPress={() => setIsImportWhether("파랑")}
          >
            <View
              style={{
                width: 50,
                height: 30,
                backgroundColor: styles.BlueText,
                borderRadius: 5,
              }}
            />
            {isImportWhether === "파랑" ? (
              <View style={{ position: "absolute", right: 15, top: 4 }}>
                <ExpoIcon
                  name={"checkbox-marked-circle"}
                  color={"white"}
                  size={20}
                />
              </View>
            ) : null}
            <Text style={{ textAlign: "center", fontSize: 10 }}>중</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsImportWhether("검정")}>
            <View
              style={{
                width: 50,
                height: 30,
                backgroundColor: "black",
                borderRadius: 5,
              }}
            />
            {isImportWhether === "검정" ? (
              <View style={{ position: "absolute", right: 15, top: 4 }}>
                <ExpoIcon
                  name={"checkbox-marked-circle"}
                  color={"white"}
                  size={20}
                />
              </View>
            ) : null}
            <Text style={{ textAlign: "center", fontSize: 10 }}>하</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <ModalButton
          text={buttonText}
          onPress={saveHandle}
          backColor={styles.MainColor}
          textColor={"white"}
        />
      </View>
    </View>
  );
};

ModalInput.propTypes = {
  onPressHandle: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  mutation: PropTypes.func,
  value: PropTypes.string,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default ModalInput;
