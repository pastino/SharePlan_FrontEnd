import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Moment from "moment";
import { extendMoment } from "moment-range";
import styles from "../../../../styles";
import contents from "../../../../contents";
import ExpoIcon from "../../../../components/ExpoIcon";

const GoalCardView = ({
  category,
  detailCategory,
  cardPrivate,
  value,
  selectDay,
  dDay,
  cardColor,
  me,
  goalInformations,
  goalHistories,
  createdAt,
  complete,
  completeDate,
}) => {
  const color =
    cardColor === styles.Wine
      ? styles.subWine
      : cardColor === styles.Sky
      ? styles.subPink
      : cardColor === styles.Yellow
      ? styles.subYellow
      : cardColor === styles.Green
      ? styles.subGreen
      : cardColor === styles.Blue
      ? styles.Bluey
      : cardColor === styles.Indigo
      ? styles.subWine
      : null;

  const small = false;
  const division = "me";
  const moment = extendMoment(Moment);

  const completeDay = Moment(completeDate).format("YYYY.M.D");

  return (
    <View>
      <View
        style={{
          width: 350,
          borderRadius: small ? 10 : 15,
          backgroundColor: cardColor,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <View style={{ flexDirection: "row", width: small ? 240 : 350 }}>
          <View
            style={{ marginLeft: 10, marginTop: 7, alignItems: "flex-start" }}
          >
            <Text
              style={{
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                fontSize: small ? 5 : 7,
              }}
            >
              {category} &nbsp; > &nbsp; {detailCategory}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: small ? 5 : 7,
          }}
        >
          <Text
            style={{
              fontSize: small ? 10 : 13,
              width: small ? 195 : 270,
              fontWeight: "700",
              color:
                cardColor === styles.Sky || cardColor === styles.Yellow
                  ? "black"
                  : "white",
              textAlign: "center",
            }}
          >
            {value}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: small ? 7 : 12,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              marginLeft: contents.width / 8,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                fontWeight: "700",
                fontSize: small ? 7 : 13,
              }}
            >
              시작일
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                fontWeight: "500",
                fontSize: small ? 7 : 13,
              }}
            >
              {moment(createdAt).format("YYYY. M. D")}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: small ? 2 : 2,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              marginLeft: contents.width / 8,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                fontWeight: "700",
                fontSize: small ? 7 : 13,
              }}
            >
              목표일
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  cardColor === styles.Sky || cardColor === styles.Yellow
                    ? "black"
                    : "white",
                fontWeight: "500",
                fontSize: small ? 7 : 13,
              }}
            >
              {selectDay}
            </Text>
            {complete ? null : (
              <View style={{ alignItems: "flex-end" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: small ? 40 : 50,
                    height: small ? 17 : 25,
                    backgroundColor: color,
                    borderRadius: 5,
                    marginLeft: 10,
                  }}
                >
                  {dDay >= 0 ? (
                    <Text
                      style={{
                        color: "white",
                        fontSize: small ? 8 : 10,
                      }}
                    >
                      D - &nbsp;{dDay}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontSize: small ? 8 : 10,
                      }}
                    >
                      D + &nbsp;{dDay * -1}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: small ? 5 : 8,
          }}
        >
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Text
              style={{
                marginLeft: contents.width / 8,
                fontWeight: "700",
                color: styles.lightGreyColor,
                fontSize: small ? 7 : 13,
              }}
            >
              Information
            </Text>
            <Text
              style={{
                color: styles.lightGreyColor,
                marginLeft: 10,
                fontSize: small ? 7 : 13,
              }}
            >
              {goalInformations && goalInformations.information !== undefined
                ? goalInformations.information.length
                : 0}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Text
              style={{
                color: styles.lightGreyColor,
                fontWeight: "700",
                fontSize: small ? 7 : 13,
              }}
            >
              History
            </Text>
            <Text
              style={{
                color: styles.lightGreyColor,
                marginLeft: 10,
                fontSize: small ? 7 : 13,
              }}
            >
              {goalHistories && goalHistories.history !== undefined
                ? goalHistories.history.length
                : 0}
            </Text>
          </View>
        </View>
        {complete ? (
          <View
            style={{
              position: "absolute",
              right: 30,
              bottom: 70,
              width: 50,
              height: 50,
              borderWidth: 3,
              borderColor: styles.darkGreyColor,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: styles.darkGreyColor, fontWeight: "700" }}>
              완료
            </Text>
            <View style={{ position: "absolute", top: -17, right: -2 }}>
              <ExpoIcon name={"check"} size={37} color={styles.darkGreyColor} />
            </View>
            <View style={{ position: "absolute", bottom: -17, right: -52 }}>
              <Text
                style={{
                  width: 100,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                  fontSize: 10,
                }}
              >
                {completeDay}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{ height: small ? 12 : 30 }}></View>
        <View
          style={{
            position: "absolute",
            bottom: -7,
            flexDirection: "row",
            width: 350,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              marginBottom: 7,
              justifyContent: "flex-end",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {division === "me" ? (
              <Text
                style={{
                  color: cardPrivate ? "white" : styles.darkGreyColor,
                  fontSize: 10,
                  marginTop: 7,
                }}
              >
                {cardPrivate ? "공개" : "비공개"}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              marginRight: 15,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={
                  me && me.avatar
                    ? { uri: me && me.avatar }
                    : require("../../../../assets/noAvatar.png")
                }
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                }}
                resizeMode={"cover"}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color:
                      cardColor === styles.Sky || cardColor === styles.Yellow
                        ? "black"
                        : "white",
                    fontSize: 12,
                    marginLeft: 10,
                    fontWeight: "700",
                  }}
                >
                  {division === "me"
                    ? me && me.nickname
                    : user && user.nickname}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoalCardView;
