import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from "react-native";
import styles from "../../styles";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ExpoIcon from "../../components/ExpoIcon";
import ModalButton from "../../components/ModalButton";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";

const AgendaMutation = ({
  deleteReConfirmModal,
  setDeleteReConfirmModal,
  isLoading,
  deleteToDoMutation,
  frontdeleteHandle,
  frontScheduleChangeHandle,
  setTouchableId,
  touchableId,
  touchableStartDay,
  touchableEndDay,
  changeScheduleVisible,
  setChangeScheduleVisible,
  touchableToDoList,
  select,
  setSelect,

  touchableComplete,
  touchableImportEvent,
  touchableGoalText,
  touchableIndex,
  modifyModal,
  setModifyModal,
}) => {
  const toDoDelete = async () => {
    setDeleteReConfirmModal(!deleteReConfirmModal);
    frontdeleteHandle({
      id: touchableId,
      startDate: touchableStartDay,
      endDate: touchableEndDay,
    });
    await deleteToDoMutation();
  };

  const [value, setValue] = useState("");
  const onChange = (text) => {
    setValue(text);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const toDoyYear = select.getFullYear();
  const toDoMonth = select.getMonth();
  const doDoDay = select.getDate();

  const selectDay = `${toDoyYear}. ${toDoMonth + 1}. ${doDoDay}`;

  const showDatePicker = () => {
    setChangeScheduleVisible(!changeScheduleVisible);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const datePickerModalCancle = () => {
    setSelect(new Date());
    setChangeScheduleVisible(!changeScheduleVisible);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelect(date);
    setChangeScheduleVisible(!changeScheduleVisible);
  };

  return (
    <>
      <Modal
        isVisible={deleteReConfirmModal}
        onBackdropPress={() => setDeleteReConfirmModal(!deleteReConfirmModal)}
        onRequestClose={() => setDeleteReConfirmModal(!deleteReConfirmModal)}
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
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>정말로 삭제하겠습니까?</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setDeleteReConfirmModal(!deleteReConfirmModal)}
                disabled={isLoading}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>아니오</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => toDoDelete()}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <Loader /> : <Text>예</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={changeScheduleVisible}
        onBackdropPress={() => datePickerModalCancle()}
        onRequestClose={() => datePickerModalCancle()}
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
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 280,
                height: 70,
                marginTop: 17,
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                {touchableToDoList}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 270,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  paddingBottom: 25,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 200,
                        height: 50,
                        backgroundColor: "white",
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 10,
                        paddingLeft: 23,
                      }}
                    >
                      <Text>{selectDay}</Text>
                      <TouchableOpacity onPress={showDatePicker}>
                        <View>
                          <Text>
                            <ExpoIcon
                              name={"calendar-check"}
                              color={styles.MainColor}
                            />
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ModalButton
                      text={"변경완료"}
                      backColor={"white"}
                      textColor={"black"}
                      onPress={() => changeScheduleHandle()}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={modifyModal}
        onBackdropPress={() => setModifyModal(!modifyModal)}
        onRequestClose={() => setModifyModal(!modifyModal)}
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
              height: 400,
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  width: 250,
                  height: 50,
                  borderBottomWidth: 1,
                  borderBottomColor: styles.lightGreyColor,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setModifyModal(!modifyModal)}
                disabled={isLoading}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>아니오</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => toDoDelete()}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <Loader /> : <Text>예</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AgendaMutation;
