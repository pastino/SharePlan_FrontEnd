import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import styles from "../../../../styles";
import contents from "../../../../contents";
import ExpoIcon from "../../../../components/ExpoIcon";

const HistoryView = ({ item, navigation, goalHistories, division, me }) => {
  const startDate = item.startDate;
  const startTime = item.startTime;
  const endDate = item.endDate;
  const endTime = item.endTime;
  const strDate = item.strTime;
  const complete = item.complete;

  const history =
    division === "me"
      ? item.posts
      : item.posts.filter((post) => post.postPrivate === true);

  const splitStart = startDate.split("-");
  const diffStart = moment([splitStart[0], splitStart[1] - 1, splitStart[2]]);
  const splitEnd = endDate.split("-");
  const diffEnd = moment([splitEnd[0], splitEnd[1] - 1, splitEnd[2]]);
  const splitStr = strDate ? strDate.split("-") : null;
  const diffStr = splitStr
    ? moment([splitStr[0], splitStr[1] - 1, splitStr[2]])
    : null;

  const diffTotalDay = diffEnd.diff(diffStart, "days") + 1;
  const diffStrDay = diffStr ? diffStr.diff(diffStart, "days") + 1 : null;

  const beforeConfirmData =
    startDate >= moment(new Date()).format("YYYY-MM-DD") ? true : false;

  const beforeStartConfirm =
    beforeConfirmData === true && startTime
      ? startTime > moment(new Date()).format("HH:mm")
        ? true
        : false
      : null;

  const test = new Date();
  const ttt = startTime !== null ? startTime.split(":")[0] : null;
  const ttttt = startTime !== null ? startTime.split(":")[1] : null;

  const mm = moment([
    test.getFullYear(),
    test.getMonth(),
    test.getDate(),
    ttt,
    ttttt,
  ]);

  const a = moment(mm);

  const b = moment();

  const minuteCreated = a.diff(b, "minutes") + 1; // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  const ccc = endTime !== null ? endTime.split(":")[0] : "24";
  const ccccc = endTime !== null ? endTime.split(":")[1] : "00";
  const cc = moment([splitEnd[0], splitEnd[1] - 1, splitEnd[2], ccc, ccccc]);

  const c = moment(cc);
  const d = moment();

  const cMinuteCreated = c.diff(d, "minutes"); // 44700
  const cGourCreated = c.diff(d, "hours"); // 745
  const cDayCreated = c.diff(d, "days"); // 31
  const cWeekCreated = c.diff(d, "weeks"); // 4
  const cMonthCreated = c.diff(d, "months");
  const cYearCreated = c.diff(d, "years");

  const color = item.color;
  const memo = item.memo;

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
              meData: me,
              division,
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
              paddingRight: 10,
              paddingTop: 10,
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
            <View
              style={{
                paddingBottom: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <ExpoIcon
                  name={"bullseye-arrow"}
                  color={styles.darkGreyColor}
                  size={17}
                />

                <Text
                  style={{
                    paddingLeft: 7,
                    fontSize: 10,
                    fontWeight: "700",
                    color: styles.darkGreyColor,
                  }}
                >
                  {item && item.goal !== null
                    ? item && item.goal && item.goal.goalText
                    : "㆒"}
                </Text>
              </View>
              {complete === true ? null : (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {beforeStartConfirm ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <ExpoIcon
                        name={"clock-start"}
                        size={17}
                        color={styles.BlueText}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 10,
                            color: styles.BlueText,
                            fontWeight: "700",
                          }}
                        >
                          {minuteCreated < 60
                            ? `${minuteCreated}분 전`
                            : minuteCreated === 60 || minuteCreated === 61
                            ? "1시간 전"
                            : hourCreated < 24
                            ? `${hourCreated}시간 전`
                            : dayCreated < 7
                            ? `${dayCreated}일 전`
                            : weekCreated < 5
                            ? `${weekCreated}주 전`
                            : monthCreated < 12
                            ? `${monthCreated}개월 전`
                            : `${yearCreated}년 전`}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 7,
                            color: styles.darkGreyColor,
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                        >
                          Start
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <ExpoIcon
                        name={"clock-end"}
                        size={17}
                        color={
                          cMinuteCreated < 0
                            ? styles.TextWine
                            : styles.TextForestGreen
                        }
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 10,
                            color:
                              cMinuteCreated < 0
                                ? styles.TextWine
                                : styles.TextForestGreen,
                            fontWeight: "700",
                          }}
                        >
                          {cMinuteCreated < 0
                            ? cMinuteCreated > -60
                              ? `${cMinuteCreated * -1}분 지남`
                              : cMinuteCreated === 60 || cMinuteCreated === 61
                              ? "1시간 지남"
                              : cGourCreated > -24
                              ? `${cGourCreated * -1}시간 지남`
                              : cDayCreated > -7
                              ? `${cDayCreated * -1}일 지남`
                              : cWeekCreated > -5
                              ? `${cWeekCreated * -1}주 지남`
                              : cMonthCreated > -12
                              ? `${cMonthCreated * -1}개월 지남`
                              : `${cYearCreated * -1}년 지남`
                            : cMinuteCreated < 60
                            ? `${cMinuteCreated}분 전`
                            : cMinuteCreated === 60 || cMinuteCreated === 61
                            ? "1시간 전"
                            : cGourCreated < 24
                            ? `${cGourCreated}시간 전`
                            : cDayCreated < 7
                            ? `${cDayCreated}일 전`
                            : cWeekCreated < 5
                            ? `${cWeekCreated}주 전`
                            : cMonthCreated < 12
                            ? `${cMonthCreated}개월 전`
                            : `${cYearCreated}년 전`}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 7,
                            color: styles.darkGreyColor,
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                        >
                          {cMinuteCreated < 0 ? "Over" : "End"}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={{ width: contents.width / 1.3 }}>
              <Text
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  color:
                    item.id < 1 || complete === true
                      ? styles.darkGreyColor
                      : color === "블랙(기본)"
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
                  fontWeight: "700",
                  textDecorationLine: complete === true ? "line-through" : null,
                }}
              >
                {item.toDoList}
              </Text>
            </View>
            {history &&
              history.map((obj) => (
                <View
                  key={obj.id}
                  style={{
                    flexDirection: "row",
                    paddingLeft: 20,
                    paddingTop: 15,

                    alignItems: "center",
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <ExpoIcon name={"book-open"} size={17} />
                    <Text style={{ fontSize: 6, fontWeight: "700" }}>
                      히스토리
                    </Text>
                  </View>
                  <Text style={{ fontSize: 10, marginLeft: 10 }}>
                    {obj.title}
                  </Text>
                </View>
              ))}
            {division === "download" ? (
              <View style={{ marginBottom: 7 }} />
            ) : startDate === endDate ? (
              <View style={{}}>
                <Text></Text>
              </View>
            ) : (
              <View
                style={{
                  width: contents.width / 1.3,
                  paddingTop: 20,
                }}
              >
                <View
                  style={{
                    width:
                      (contents.width / 1.31) * (diffStrDay / diffTotalDay),
                    height: 2,
                    backgroundColor: styles.darkGreyColor,
                    borderBottomRightRadius:
                      diffStrDay === diffTotalDay ? 10 : null,
                    borderBottomLeftRadius: 10,
                  }}
                ></View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default HistoryView;
