import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "../../../styles";
import contents from "../../../contents";

const ColorView = ({
  color,
  colorText,
  setSelectedColor,
  setColorModalVisible,
  colorModalVisible,
}) => {
  return (
    <>
      <View
        style={{
          height: 50,
          borderBottomColor:
            colorText === "골드" ? null : styles.lightGreyColor,
          borderBottomWidth: colorText === "골드" ? null : 1,
          width: 300,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedColor(colorText);
            setColorModalVisible(!colorModalVisible);
          }}
        >
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: color,
                width: 10,
                height: 30,
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                color: color,
                marginLeft: 20,
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              {colorText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const ColorModal = ({
  colorModalVisible,
  setColorModalVisible,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <Modal
      isVisible={colorModalVisible}
      onBackdropPress={() => setColorModalVisible(!colorModalVisible)}
      onRequestClose={() => setColorModalVisible(!colorModalVisible)}
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
            backgroundColor: "white",
            alignItems: "center",
            width: 300,

            height: "auto",
          }}
        >
          <View
            style={{
              width: 300,
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: styles.lightGreyColor,
            }}
          >
            <Text style={{ fontWeight: "700", textAlign: "center" }}>
              텍스트 칼라
            </Text>
          </View>
          <ColorView
            color={"black"}
            colorText={"블랙(기본)"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextWine}
            colorText={"레드 와인"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.BlueText}
            colorText={"블루"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextForestGreen}
            colorText={"포레스트 그린"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextOrangeYellow}
            colorText={"오렌지 옐로우"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextLavendar}
            colorText={"라벤더"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextMidiumPupple}
            colorText={"미디엄 퍼플"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextSkyBlue}
            colorText={"스카이 블루"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
          <ColorView
            color={styles.TextGold}
            colorText={"골드"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorModalVisible={colorModalVisible}
            setColorModalVisible={setColorModalVisible}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ColorModal;
