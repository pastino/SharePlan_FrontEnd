import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import styles from "../../../../styles";
import contents from "../../../../contents";
import { useMutation } from "react-apollo-hooks";
import { ORDERING_DAYTODO, SEE_DAYTODO } from "../../HomeQueries";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ToDoListText from "./ToDoListText/ToDoListText.js";
import moment from "moment";

const ToDoListData = ({ completeFalse, meData, navigation, today }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data] = useState(completeFalse);
  const [changeConfirm, setChangeConfirm] = useState(false);
  const [touchable, setTouchable] = useState("");
  const [orderingDayToDoMutation] = useMutation(ORDERING_DAYTODO);

  // const dataIndex = data && data.map((toDo) => toDo.index);
  // const originIndex = completeFalse && completeFalse.map((toDo) => toDo.index);

  // const confirm = () => {
  //   if (dataIndex !== undefined || dataIndex.length !== 0) {
  //     for (let i = 0; i < dataIndex.length; i++) {
  //       if (dataIndex[i] != originIndex[i]) {
  //         setChangeConfirm(true);
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    setChangeConfirm(false);
  }, []);

  return (
    <View>
      {changeConfirm === true ? (
        <View
          style={{
            width: contents.width / 1.15,
            marginBottom: 10,
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 10 }}>순서 변동사항이 있습니다.</Text>
            <Text style={{ fontSize: 10 }}>
              변동완료 후 오른쪽 완료버튼을 꼭 눌러주세요.
            </Text>
          </View>
          <TouchableOpacity
            disabled={isLoading}
            onPress={async () => {
              const orderingData = [];
              for (let i = 0; i < data.length; i++) {
                orderingData.push(data[i].id);
              }
              setIsLoading(true);
              await orderingDayToDoMutation({
                variables: {
                  toDoId: orderingData,
                },
                refetchQueries: () => [{ query: SEE_DAYTODO }],
                awaitRefetchQueries: true,
              });
              setIsLoading(false);
              setChangeConfirm(false);
            }}
          >
            <View
              style={{
                width: 60,
                height: 30,
                backgroundColor: styles.MainColor,
                borderRadius: 7,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={"white"} size={20} />
              ) : (
                <Text style={{ fontSize: 10, color: "white" }}>변동완료</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : null}

      <View>
        <Text
          style={{
            marginLeft: 10,
            marginBottom: 10,
            fontSize: 17,
            fontWeight: "700",
            color:
              moment(today).format("YYYY-MM-DD") === completeFalse[0].strTime
                ? "black"
                : styles.darkGreyColor,
          }}
        >
          {moment(completeFalse[0].strTime).format("MM/DD (ddd)")}
        </Text>
      </View>
      {completeFalse &&
        completeFalse.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "column",
              width: contents.width,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {/* {isActive ? (
              <View
                style={{ position: "absolute", top: -7, left: 10, zIndex: 1 }}
              >
                <ExpoIcon
                  name={"checkbox-marked-circle"}
                  size={30}
                  color={styles.MainColor}
                />
              </View>
            ) : null} */}

            <TouchableWithoutFeedback
              onPress={() => {
                changeConfirm
                  ? ToastAndroid.show(
                      "순서변동을 먼저 완료해주세요.",
                      ToastAndroid.SHORT
                    )
                  : navigation.navigate("ToDoDetail", {
                      item,
                      division: "home",
                      meData,
                    });
                // listClickEvent({ id: item.id, item });
              }}
              disabled={item.id < 1 || isLoading ? true : false}
              style={{
                //   backgroundColor: isActive ? "blue" : item.backgroundColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width:
                    touchable === item.id
                      ? contents.width / 1.11
                      : contents.width / 1.15,
                  flexDirection: "column",
                  height: "auto",
                  minHeight: 57,
                  paddingRight: 10,
                  marginBottom: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                  backgroundColor: "white",
                }}
              >
                <ToDoListText item={item} touchable={touchable} today={today} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        ))}

      {/* <DraggableFlatList
        showsHorizontalScrollIndicator={false}
        scrollPercent={5}
        data={changeConfirm ? data : completeFalse}
        keyExtractor={(item, index) => item.id}
        onDragEnd={({ data }) => {
          setData(data);
        }}
        renderItem={({ item, index, drag, isActive }) => (
          <View
            style={{
              flexDirection: "column",
              width: contents.width,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {isActive ? (
              <View
                style={{ position: "absolute", top: -7, left: 10, zIndex: 1 }}
              >
                <ExpoIcon
                  name={"checkbox-marked-circle"}
                  size={30}
                  color={styles.MainColor}
                />
              </View>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                changeConfirm
                  ? ToastAndroid.show(
                      "순서변동을 먼저 완료해주세요.",
                      ToastAndroid.SHORT
                    )
                  : navigation.navigate("ToDoDetail", {
                      item,
                      division: "home",
                    });
                // listClickEvent({ id: item.id, item });
              }}
              disabled={item.id < 1 || isLoading ? true : false}
              delayLongPress={500}
              onLongPress={() => {
                drag();
              }}
              style={{
                //   backgroundColor: isActive ? "blue" : item.backgroundColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width:
                    touchable === item.id
                      ? contents.width / 1.11
                      : contents.width / 1.15,
                  flexDirection: "column",
                  height: "auto",
                  minHeight: 57,
                  paddingRight: 10,
                  marginBottom: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                  backgroundColor: "white",
                }}
              >
                <ToDoListText item={item} touchable={touchable} />
                {touchable === item.id ? (
                  <>
                    {item.memo !== null ? (
                      <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                          <ExpoIcon name={"note-outline"} size={20} />
                          <Text style={{ marginLeft: 10, fontWeight: "700" }}>
                            Memo
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                        >
                          <Text>{item.memo}</Text>
                        </View>
                      </View>
                    ) : null}

                    <View
                      style={{
                        width: contents.width / 1.15,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        paddingTop: 10,
                        borderTopWidth: 1,
                        borderTopColor: styles.lightGreyColor,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => deleteToDoConfirmVisible()}
                      >
                        <View
                          style={{ marginRight: 30, flexDirection: "column" }}
                        >
                          <ExpoIcon
                            name={"delete"}
                            size={37}
                            color={styles.MainColor}
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              marginTop: 5,
                              textAlign: "center",
                            }}
                          >
                            삭제
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("EditToDo", { item });
                          // setEditToDo(true);
                          // setValue(item.toDoList);
                          // setIsImportWhether(item.importEvent);
                        }}
                      >
                        <View
                          style={{ marginRight: 30, flexDirection: "column" }}
                        >
                          <ExpoIcon
                            name={"pencil"}
                            size={37}
                            color={styles.MainColor}
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              marginTop: 5,
                              textAlign: "center",
                            }}
                          >
                            수정
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          item.goal !== null
                            ? toDoComplete({ completeDivision: "detail" })
                            : toDoComplete({ completeDivision: "basic" });
                        }}
                      >
                        <View
                          style={{ flexDirection: "column", marginRight: 30 }}
                        >
                          <ExpoIcon
                            name={"check-decagram"}
                            size={40}
                            color={styles.MainColor}
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: "center",
                            }}
                          >
                            완료
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        )}
      /> */}
    </View>
  );
};

export default ToDoListData;
