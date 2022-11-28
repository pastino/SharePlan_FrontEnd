import React, { useState, Fragment } from "react";
import { View, Text } from "react-native";
import styles from "../../styles";
import contents from "../../contents";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import ExpoIcon from "../../components/ExpoIcon";

const AgendaView = ({ item, navigation }) => {
  const toDoList = item.toDoList;
  const startDate = item.startDate;
  const startTime = item.startTime;
  const endDate = item.endDate;
  const endTime = item.endTime;
  const color = item.color;
  const alrams = item.alrams;
  const memo = item.memo;

  const startDayArray = startDate.split("-");
  const itemDay = item.strTime;
  const itemDayArray = itemDay.split("-");
  const a = moment([itemDayArray[0], itemDayArray[1], itemDayArray[2]]);
  const b = moment([startDayArray[0], startDayArray[1], startDayArray[2]]);
  const diffDay = a.diff(b, "days");

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          width: contents.width / 1.2,
          marginTop: 10,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("ToDoDetail", {
              item,
            });
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: contents.width / 1.3,
              flexDirection: "column",
              height: "auto",
              minHeight: 57,
              padding: 10,
              marginBottom: 10,
              shadowColor:
                itemDay !== startDate && itemDay !== endDate ? null : "#000",
              shadowOffset:
                itemDay !== startDate && itemDay !== endDate
                  ? null
                  : { width: 0, height: 2 },
              shadowOpacity:
                itemDay !== startDate && itemDay !== endDate ? null : 0.8,
              shadowRadius:
                itemDay !== startDate && itemDay !== endDate ? null : 2,
              elevation:
                itemDay !== startDate && itemDay !== endDate ? null : 2,
              borderRadius:
                itemDay !== startDate && itemDay !== endDate ? null : 7,
              borderWidth:
                itemDay !== startDate && itemDay !== endDate ? null : 1,
              borderColor:
                itemDay !== startDate && itemDay !== endDate ? null : "#ddd",
              borderBottomWidth:
                itemDay !== startDate && itemDay !== endDate ? null : 0,
              backgroundColor:
                itemDay !== startDate && itemDay !== endDate
                  ? "#f1f1f1"
                  : "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent:
                  itemDay !== startDate && itemDay !== endDate
                    ? null
                    : "space-between",
              }}
            >
              {item.startDate === item.endDate ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: styles.darkGreyColor,
                  }}
                >
                  당일
                </Text>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  {itemDay === startDate ? (
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: styles.darkGreyColor,
                      }}
                    >
                      Start /{" "}
                    </Text>
                  ) : itemDay === endDate ? (
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: styles.darkGreyColor,
                      }}
                    >
                      End /{" "}
                    </Text>
                  ) : null}
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor,
                    }}
                  >
                    {diffDay + 1}일차
                  </Text>
                </View>
              )}
              {itemDay !== startDate && itemDay !== endDate ? (
                <Text
                  style={{
                    color: styles.darkGreyColor,
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 10,
                    marginLeft: 20,
                  }}
                >
                  {toDoList}
                </Text>
              ) : null}
              {itemDay !== startDate && itemDay !== endDate ? null : (
                <View style={{ flexDirection: "row" }}>
                  {alrams.length > 0 ? (
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <ExpoIcon
                          name={"alarm"}
                          color={styles.darkGreyColor}
                          size={17}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        {alrams.length > 3 ? (
                          <>
                            <View>
                              {alrams[0].time === 1 ||
                              alrams[0].time === 5 ||
                              alrams[0].time === 15 ||
                              alrams[0].time === 30 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                    marginLeft: 5,
                                  }}
                                >
                                  {alarm.time}분전
                                </Text>
                              ) : alrams[0].time === 60 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1시간전
                                </Text>
                              ) : alrams[0].time === 60 * 24 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1일전
                                </Text>
                              ) : null}
                            </View>
                            <View>
                              {alrams[1].time === 1 ||
                              alrams[1].time === 5 ||
                              alrams[1].time === 15 ||
                              alrams[1].time === 30 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                    marginLeft: 5,
                                  }}
                                >
                                  {alarm.time}분전
                                </Text>
                              ) : alrams[1].time === 60 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1시간전
                                </Text>
                              ) : alrams[1].time === 60 * 24 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1일전
                                </Text>
                              ) : null}
                            </View>
                            <View>
                              {alrams[2].time === 1 ||
                              alrams[2].time === 5 ||
                              alrams[2].time === 15 ||
                              alrams[2].time === 30 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                    marginLeft: 5,
                                  }}
                                >
                                  {alarm.time}분전
                                </Text>
                              ) : alrams[0].time === 60 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1시간전
                                </Text>
                              ) : alrams[0].time === 60 * 24 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1일전
                                </Text>
                              ) : null}
                            </View>
                            <Text>...</Text>
                          </>
                        ) : (
                          alrams.map((alarm) => (
                            <View key={Math.random().toString()}>
                              {alarm.time === 1 ||
                              alarm.time === 5 ||
                              alarm.time === 15 ||
                              alarm.time === 30 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                    marginLeft: 5,
                                  }}
                                >
                                  {alarm.time}분전
                                </Text>
                              ) : alarm.time === 60 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1시간전
                                </Text>
                              ) : alarm.time === 60 * 24 ? (
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: styles.darkGreyColor,
                                  }}
                                >
                                  1일전
                                </Text>
                              ) : null}
                            </View>
                          ))
                        )}
                      </View>
                    </View>
                  ) : null}

                  {startDate === endDate && startTime ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10,
                      }}
                    >
                      <ExpoIcon
                        name={"progress-clock"}
                        color={styles.darkGreyColor}
                        size={17}
                      />

                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.darkGreyColor,
                          marginLeft: 5,
                        }}
                      >
                        {startTime}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.darkGreyColor,
                          marginLeft: 5,
                        }}
                      >
                        ~
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.darkGreyColor,
                          marginLeft: 5,
                        }}
                      >
                        {endTime}
                      </Text>
                    </View>
                  ) : startDate !== endDate &&
                    startTime &&
                    itemDay === startDate ? (
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                      <ExpoIcon
                        name={"clock-start"}
                        color={styles.darkGreyColor}
                        size={17}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.darkGreyColor,
                          marginLeft: 5,
                        }}
                      >
                        {startTime}
                      </Text>
                    </View>
                  ) : startDate !== endDate &&
                    endTime &&
                    itemDay === endDate ? (
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                      <ExpoIcon
                        name={"clock-end"}
                        color={styles.darkGreyColor}
                        size={17}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.darkGreyColor,
                          marginLeft: 5,
                        }}
                      >
                        {endTime}
                      </Text>
                    </View>
                  ) : null}

                  {memo ? (
                    <View
                      style={{
                        marginLeft: 10,
                        paddingLeft: 7,
                        flexDirection: "row",
                        // borderLeftColor: styles.darkGreyColor,
                        // borderLeftWidth: 0.7,
                      }}
                    >
                      <ExpoIcon
                        name={"note-outline"}
                        color={styles.darkGreyColor}
                        size={17}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          color: styles.darkGreyColor,
                          marginLeft: 5,
                        }}
                      >
                        메모
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
            {itemDay !== startDate && itemDay !== endDate ? null : (
              <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                <Text
                  style={{
                    color:
                      color === "블랙(기본)"
                        ? "black"
                        : color === "레드 와인"
                        ? styles.TextWine
                        : color === "블루"
                        ? styles.BlueText
                        : color === "포레스트 그린"
                        ? styles.TextForestGreen
                        : color === "오렌지 옐로우"
                        ? styles.TextOrangeYellow
                        : color === "라벤더"
                        ? styles.TextLavendar
                        : color === "미디엄 퍼플"
                        ? styles.TextMidiumPupple
                        : color === "스카이 블루"
                        ? styles.TextSkyBlue
                        : color === "골드"
                        ? styles.TextGold
                        : null,
                    textDecorationLine:
                      item.complete === true ? "line-through" : null,
                    fontWeight:
                      item.importEvent || !item.importEvent ? "700" : null,
                    textAlign: "center",
                  }}
                >
                  {toDoList}
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default AgendaView;
