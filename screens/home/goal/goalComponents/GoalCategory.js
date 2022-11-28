import React, { useState } from "react";
import styled from "styled-components";
import { View, Image, Text } from "react-native";
import contents from "../../../../contents";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ExpoIcon from "../../../../components/ExpoIcon";
import styles from "../../../../styles";

const BigCategoryList = [
  {
    text: "자기계발",
    image: {
      uri:
        "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%83%81%EC%9C%84+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/selfDevelop.jpg",
    },
    description: "독서, 외국어, 몸만들기, 습관, 자격증취득, 취미 등",
  },
  {
    text: "경제",
    image: {
      uri:
        "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%83%81%EC%9C%84+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/economy.jpg",
    },
    description: "취업, 사업/창업, 적금, 부업, 은퇴 등",
  },
  {
    text: "건강",
    image: {
      uri:
        "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%83%81%EC%9C%84+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/healthSecond.jpg",
    },
    description: "금연, 절주 등",
  },
  {
    text: "사랑",
    image: {
      uri:
        "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%83%81%EC%9C%84+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/love.jpg",
    },
    description: "결혼, 이성친구, 효도 등",
  },
  {
    text: "여행",
    image: {
      uri:
        "https://infectsoul.s3.ap-northeast-2.amazonaws.com/%EB%AA%A9%ED%91%9C%EC%B9%B4%EB%93%9C+%EC%83%81%EC%84%B8%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%83%81%EC%9C%84+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/trip.jpg",
    },
    description: "세계일주, 순례길, 워킹홀리데이 등",
  },

  // {
  //   text: "1%의 도전",
  //   image: require("../../../../assets/category/bigChallenge.jpg"),
  //   description: `남들은 미쳤다고 하는 1%의 도전. ${"\n"}  우리는 당신을 응원합니다.`
  // }
];

const CategoryGrid = styled.View``;
const CategoryText = styled.Text`
  font-weight: 700;
`;

const NextText = styled.Text`
  font-weight: 700;
`;

const BigCategory = ({ setSelectItem, selectItem }) => {
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
        {BigCategoryList.map((list) => (
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
              >
                <Text style={{ fontSize: 8, textAlign: "center" }}>
                  {list.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View
          style={{
            width: contents.width / 2.5,
            height: contents.height / 4,
            borderRadius: 10,
            marginTop: 10,
            alignItems: "center",
          }}
        ></View>
      </View>
    </ScrollView>
  );
};

export default BigCategory;
