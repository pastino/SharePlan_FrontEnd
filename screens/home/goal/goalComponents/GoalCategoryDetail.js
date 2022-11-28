import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import contents from "../../../../contents";
import styles from "../../../../styles";
import ExpoIcon from "../../../../components/ExpoIcon";

const DetailCategoryList = [
  {
    title: "자기계발",
    list: [
      {
        text: "독서",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/reading.jpg",
        },
      },
      {
        text: "학습/학업",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/language.jpg",
        },
      },
      {
        text: "글쓰기",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/writing.jpg",
        },
      },
      {
        text: "자격증 취득",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/license.jpg",
        },
      },
      {
        text: "운동",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/fitness.jpg",
        },
      },
      {
        text: "습관 만들기",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/goodHabbit.jpg",
        },
      },
      {
        text: "취미",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9E%90%EA%B8%B0%EA%B3%84%EB%B0%9C/hobby.jpg",
        },
      },
    ],
  },
  {
    title: "경제",
    list: [
      {
        text: "취업",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B2%BD%EC%A0%9C/jobSearching.jpg",
        },
      },
      {
        text: "사업/창업",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B2%BD%EC%A0%9C/business.jpg",
        },
      },
      {
        text: "부업",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B2%BD%EC%A0%9C/sideline.jpg",
        },
      },
      {
        text: "적금",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B2%BD%EC%A0%9C/savingMoney.jpg",
        },
      },
      {
        text: "목돈 만들기",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B2%BD%EC%A0%9C/savings.jpg",
        },
      },
      {
        text: "은퇴",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B2%BD%EC%A0%9C/retirement.jpg",
        },
      },
    ],
  },
  {
    title: "건강",
    list: [
      {
        text: "금연",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B1%B4%EA%B0%95/noSmoking.jpg",
        },
      },
      {
        text: "절주",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B1%B4%EA%B0%95/alcoholism.jpg",
        },
      },
    ],
  },
  {
    title: "사랑",
    list: [
      {
        text: "결혼",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%82%AC%EB%9E%91/marriage.jpg",
        },
      },
      {
        text: "이성친구",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%82%AC%EB%9E%91/girlFriend.jpg",
        },
      },
      {
        text: "효도",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%82%AC%EB%9E%91/filialPiety.jpg",
        },
      },
      {
        text: "인간관계",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%82%AC%EB%9E%91/friendShip.jpg",
        },
      },
    ],
  },
  {
    title: "여행",
    list: [
      {
        text: "세계일주",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%97%AC%ED%96%89/roundWolrd.jpg",
        },
      },
      {
        text: "순례길",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%97%AC%ED%96%89/backpacking.jpg",
        },
      },
      {
        text: "워킹홀리데이",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%97%AC%ED%96%89/workingHoliday.jpg",
        },
      },
      {
        text: "배낭여행",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%97%AC%ED%96%89/backTrevel.jpg",
        },
      },
      {
        text: "자전거여행",
        image: {
          uri:
            "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%97%AC%ED%96%89/bikeTrevel.jpg",
        },
      },
    ],
  },
];

const CategoryGrid = styled.View``;
const CategoryText = styled.Text`
  font-weight: 700;
`;

const GoalCategoryDetail = ({ selectItem, setSelectItem, selectCategory }) => {
  const select = (text) => {
    setSelectItem(text);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {DetailCategoryList.filter(
          (list) => selectCategory === list.title
        )[0].list.map((list) => (
          <TouchableOpacity
            key={Math.random().toString()}
            onPress={() => select(list.text)}
          >
            <View
              style={{
                width: contents.width / 2.5,
                height: contents.height / 4,
                borderRadius: 10,
                backgroundColor: "white",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={list.image}
                resizeMode={"cover"}
                style={{
                  width: contents.width / 2.5,
                  height: contents.height / 6,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  opacity: selectItem === list.text ? 1 : 0.6,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  height: contents.height / 23,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                {selectItem === list.text ? (
                  <View style={{}}>
                    <ExpoIcon name={"check"} color={styles.MainColor} />
                  </View>
                ) : null}
                <CategoryText style={{ color: "black", fontSize: 12 }}>
                  {list.text}
                </CategoryText>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              ></View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => select("기타")}>
          <View
            style={{
              width: contents.width / 2.5,
              height: contents.height / 4,
              borderRadius: 10,
              backgroundColor: "white",
              margin: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: contents.width / 2.5,
                height: contents.height / 6,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: styles.darkGreyColor,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <Text
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  fontSize: 50,
                  marginBottom: 30,
                  color: "white",
                  // opacity: selectItem === list.text ? 1 : 0.6
                }}
              >
                ...
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                height: contents.height / 23,
                borderRadius: 10,
                padding: 10,
              }}
            >
              {selectItem === "기타" ? (
                <View style={{}}>
                  <ExpoIcon name={"check"} color={styles.MainColor} />
                </View>
              ) : null}
              <CategoryText style={{ color: "black", fontSize: 12 }}>
                기타
              </CategoryText>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            ></View>
          </View>
        </TouchableOpacity>
        {DetailCategoryList.filter((list) => selectCategory === list.title)[0]
          .list.length %
          2 ===
        0 ? (
          <View
            style={{
              width: contents.width / 2.5,
              height: contents.height / 4,
              borderRadius: 10,

              margin: 20,
              alignItems: "center",
            }}
          ></View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default GoalCategoryDetail;
