import React from "react";
import { View, Modal, Text } from "react-native";
import styles from "../../styles";
import contents from "../../contents";
import Textarea from "react-native-textarea";
import ModalButton from "../GoalButton";

const EditModal = ({
  isLoading,
  isVisible,
  setIsvisible,
  onPress,
  value,
  onChange,
}) => {
  return (
    <Modal
      isVisible={false}
      onBackdropPress={() => (isLoading ? null : setIsvisible(!isVisible))}
      onRequestClose={() => (isLoading ? null : setIsvisible(!isVisible))}
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            backgroundColor: styles.BlueSky,
            alignItems: "center",
            width: 300,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "700" }}>댓글 수정</Text>
          </View>
          <Textarea
            autoFocus={true}
            defaultValue={value}
            onChangeText={onChange}
            containerStyle={{
              height: contents.height / 5,
              width: contents.width / 1.65,
              padding: 5,
              backgroundColor: styles.moreLightGrey,
              borderRadius: 10,
            }}
            style={{
              textAlignVertical: "top", // hack android
              height: contents.height / 2.3,
              fontSize: 14,
              color: "#333",
              padding: 10,
            }}
            placeholderTextColor={"#c7c7c7"}
            underlineColorAndroid={"transparent"}
            editable={!isLoading}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ marginRight: 10 }}>
              <ModalButton
                text={"취소"}
                onPress={() => setIsvisible(!isVisible)}
                backColor={"white"}
                textColor={"black"}
                disabled={isLoading}
              />
            </View>
            <View>
              <ModalButton
                text={"수정"}
                onPress={() => onPress}
                backColor={"white"}
                textColor={"black"}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
