import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import contents from "../../../../contents";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import styles from "../../../../styles";
import moment from "moment";

const DownloadView = ({
  id,
  navigation,
  division,
  goalText,
  user,
  me,
  goalInformations,
  goalHistories,
  createdHistoryDateNum,
  selectDay,
  dDay,
  startDate,
  originDDay,
  sale,
  salePrice,
  mainImage,
  introduceText,
  target,
  otherCosts,
  otherCostsDesc,
  category,
  detailCategory,
  data,
  loading,
  historyPubCount,
}) => {
  const toDoes = data && data.seeToDoOfGoal;
  const toDoLength = data ? toDoes.length : null;

  const startDateArray =
    toDoes && toDoes.map((toDo) => new Date(toDo.startDate).getTime());
  const endDateArray =
    toDoes && toDoes.map((toDo) => new Date(toDo.endDate).getTime());

  const minStartDate =
    startDateArray !== undefined &&
    startDateArray &&
    startDateArray.length !== 0
      ? startDateArray.reduce(function (previous, current) {
          return previous > current ? current : previous;
        })
      : null;

  const maxEndDate =
    endDateArray !== undefined && endDateArray && endDateArray.length !== 0
      ? endDateArray.reduce(function (previous, current) {
          return previous > current ? previous : current;
        })
      : null;

  const schedulePeriod = moment(maxEndDate).diff(minStartDate, `days`) + 1;

  return loading ? (
    <ActivityIndicator />
  ) : (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View>
            <Image
              source={{ uri: mainImage }}
              style={{
                width: contents.width,
                height: contents.width / 1.5,
              }}
              resizeMode={"cover"}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: styles.darkGreyColor,
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              {category} > {detailCategory}
            </Text>
            <Text style={{ marginTop: 10, fontWeight: "700" }}>{goalText}</Text>
            {/* <Text style={{ marginTop: 20, fontWeight: "700" }}>금액</Text>
            <Text>
              {salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
            </Text>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: "700" }}>기타비용</Text>
              <Text>
                {otherCosts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
              </Text>
            </View>
            {otherCosts > 0 ? (
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: "700" }}>기타비용 설명</Text>
                <Text style={{}}>{otherCostsDesc}</Text>
              </View>
            ) : null} */}
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: "700" }}>목표기간</Text>
              <Text style={{ marginTop: 10 }}>{schedulePeriod} 일</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: "700" }}>스케쥴</Text>
              <Text style={{ marginTop: 10 }}>{toDoLength} 건</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: "700", marginTop: 10 }}>
                History(스케줄 상세정보)
              </Text>
              <Text style={{}}>{historyPubCount} </Text>
            </View>
            {/* <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: "700" }}>대상</Text>
              <Text style={{}}>{target}</Text>
            </View> */}

            <Text style={{ fontWeight: "700", marginTop: 20 }}>설명</Text>
            <Text style={{ marginTop: 10 }}>{introduceText}</Text>
            <Text style={{ fontWeight: "700", marginTop: 20 }}>
              공유자 정보
            </Text>
            {division === "me" ? (
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={
                    me && me.avatar
                      ? { uri: me && me.avatar }
                      : require("../../../../assets/noAvatar.png")
                  }
                  style={{ width: 60, height: 60 }}
                  resizeMode={"contain"}
                />
                <Text style={{ marginTop: 5, marginLeft: 5 }}>
                  {me && me.nickname}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={
                    user && user.avatar
                      ? { uri: user && user.avatar }
                      : require("../../../../assets/noAvatar.png")
                  }
                  style={{ width: 60, height: 60, borderRadius: 40 }}
                  resizeMode={"contain"}
                />
                <Text style={{ marginTop: 5, marginLeft: 5 }}>
                  {user && user.nickname}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {division === "me" ? null : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: contents.width,
            height: 60,
            borderTopWidth: 1,
            borderTopColor: styles.lightGreyColor,
            backgroundColor: styles.lightGreyColor,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <TouchableWithoutFeedback onPress={() => null}>
              <View
                style={{
                  width: contents.width / 3,
                  height: 50,
                  borderRadius: 10,
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: styles.TextLavendar,
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>문의</Text>
              </View>
            </TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback
              style={{}}
              onPress={() =>
                navigation.navigate("GoalCreateView", {
                  id,
                  selectCategory: category,
                  selectItem: detailCategory,
                  division: "download",
                  toDoes,
                  schedulePeriod,
                })
              }

              // onPress={() => navigation.navigate("NewGoalCreateView", { toDoes })}
            >
              <View
                style={{
                  width: contents.width / 1.05,
                  height: 50,
                  borderRadius: 10,

                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: styles.TextSkyBlue,
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>
                  스케쥴 다운로드 받기
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </>
  );
};

export default DownloadView;
