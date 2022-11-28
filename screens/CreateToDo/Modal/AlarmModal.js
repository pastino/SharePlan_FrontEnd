import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "../../../styles";

const AlarmModal = ({
  alarmModalVisible,
  setAlarmModalVisible,
  alarmTimeArray,
  alarmView,
  setAlarmTimeArray,
  selectedAlarmHandle,
  confirmAlarm,
}) => {
  const cancleAlarmModal = () => {
    setAlarmModalVisible(!alarmModalVisible);
    setAlarmTimeArray([]);
  };

  useEffect(() => {
    setAlarmTimeArray(alarmView);
  }, [alarmModalVisible]);

  return (
    <Modal
      isVisible={alarmModalVisible}
      onBackdropPress={() => cancleAlarmModal()}
      onRequestClose={() => cancleAlarmModal()}
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
            justifyContent: "space-between",
            width: 300,
            height: "auto",
          }}
        >
          <View
            style={{
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>알림설정</Text>
          </View>
          <View
            style={{
              borderTopColor: styles.lightGreyColor,
              borderTopWidth: 1,
              width: 300,
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: 30,
              marginTop: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                width: 270,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {alarmTimeArray
                .map((alarm) => alarm.time)
                .sort((a, b) => a - b)
                .map((time) => (
                  <View key={Math.random().toString()} style={{}}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: styles.Wine,
                        fontWeight: "700",
                      }}
                    >
                      {time === 1
                        ? "1분 전,"
                        : time === 5
                        ? "5분 전,"
                        : time === 15
                        ? "15분 전,"
                        : time === 30
                        ? "30분전,"
                        : time === 60
                        ? "1시간 전,"
                        : time === 60 * 24
                        ? "1일 전,"
                        : null}{" "}
                    </Text>
                  </View>
                ))}
              {alarmTimeArray.length > 0 ? (
                <Text style={{ textAlign: "center" }}>
                  푸쉬알림이 도착합니다.
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: styles.darkGreyColor,
                  }}
                >
                  알림이 없습니다.
                </Text>
              )}
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  selectedAlarmHandle({
                    select: 1,
                    categoryId: Math.random().toString(),
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 35,
                    borderWidth: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(1)
                      ? 2
                      : 1,
                    borderColor: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(1)
                      ? "black"
                      : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(1)
                        ? "black"
                        : styles.darkGreyColor,
                      fontWeight: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(1)
                        ? "700"
                        : null,
                    }}
                  >
                    1분전
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  selectedAlarmHandle({
                    select: 5,
                    categoryId: Math.random().toString(),
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 35,
                    borderWidth: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(5)
                      ? 2
                      : 1,
                    borderColor: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(5)
                      ? "black"
                      : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(5)
                        ? "black"
                        : styles.darkGreyColor,
                      fontWeight: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(5)
                        ? "700"
                        : null,
                    }}
                  >
                    5분전
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  selectedAlarmHandle({
                    select: 15,
                    categoryId: Math.random().toString(),
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 35,
                    borderWidth: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(15)
                      ? 2
                      : 1,
                    borderColor: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(15)
                      ? "black"
                      : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(15)
                        ? "black"
                        : styles.darkGreyColor,
                      fontWeight: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(15)
                        ? "700"
                        : null,
                    }}
                  >
                    15분전
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  selectedAlarmHandle({
                    select: 30,
                    categoryId: Math.random().toString(),
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 35,
                    borderWidth: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(30)
                      ? 2
                      : 1,
                    borderColor: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(30)
                      ? "black"
                      : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(30)
                        ? "black"
                        : styles.darkGreyColor,
                      fontWeight: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(30)
                        ? "700"
                        : null,
                    }}
                  >
                    30분전
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  selectedAlarmHandle({
                    select: 60,
                    categoryId: Math.random().toString(),
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 35,
                    borderWidth: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(60)
                      ? 2
                      : 1,
                    borderColor: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(60)
                      ? "black"
                      : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(60)
                        ? "black"
                        : styles.darkGreyColor,
                      fontWeight: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(60)
                        ? "700"
                        : null,
                    }}
                  >
                    1시간 전
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  selectedAlarmHandle({
                    select: 60 * 24,
                    categoryId: Math.random().toString(),
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 35,
                    borderWidth: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(60 * 24)
                      ? 2
                      : 1,
                    borderColor: alarmTimeArray
                      .map((alarm) => alarm.time)
                      .includes(60 * 24)
                      ? "black"
                      : styles.darkGreyColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(60 * 24)
                        ? "black"
                        : styles.darkGreyColor,
                      fontWeight: alarmTimeArray
                        .map((alarm) => alarm.time)
                        .includes(60 * 24)
                        ? "700"
                        : null,
                    }}
                  >
                    1일전
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              height: 50,
              borderTopWidth: 1,
              borderTopColor: styles.lightGreyColor,
            }}
          >
            <TouchableOpacity onPress={() => cancleAlarmModal()}>
              <View
                style={{
                  width: 150,
                  height: 50,
                  borderRightColor: styles.lightGreyColor,
                  borderRightWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>취소</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                confirmAlarm();
                setAlarmModalVisible(!alarmModalVisible);
              }}
            >
              <View
                style={{
                  width: 150,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>확인</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlarmModal;
