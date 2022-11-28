import React, { useEffect } from "react";
import styled from "styled-components";
import { View } from "react-native";
import Modal from "react-native-modal";
import Button from "react-native-button";
import ModalInput from "./ModalInput";
import contents from "../../../../contents";
import ExpoIcon from "../../../../components/ExpoIcon";

const ModalView = styled.View`
  width: 320px;
  height: 280px;
`;

const ModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 20px;
`;

const ModalHeaderText = styled.Text`
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const InputModal = ({
  headerText,
  isVisible,
  onPressHandle,
  input,
  month,
  day,
  isImportWhether,
  setIsImportWhether,
  mutation,
  value,
  setValue,
  placeholder,
  onBackdropPress,
  onRequestClose,
  buttonText,
}) => {
  useEffect(() => {
    setIsImportWhether("검정");
  }, []);
  return (
    <Modal
      isVisible={isVisible}
      transparent={true}
      onBackdropPress={onBackdropPress}
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalView
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            height: 300,
            width: 320,
          }}
        >
          <ModalHeader>
            <ModalHeaderText>{headerText}</ModalHeaderText>
            <Button onPress={() => onPressHandle()}>
              <ExpoIcon name={"close"} />
            </Button>
          </ModalHeader>
          <ModalInput
            onPressHandle={onPressHandle}
            input={input}
            month={month}
            day={day}
            isImportWhether={isImportWhether}
            setIsImportWhether={setIsImportWhether}
            mutation={mutation}
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            buttonText={buttonText}
          />
        </ModalView>
      </View>
    </Modal>
  );
};

export default InputModal;
