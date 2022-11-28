import React, { useState } from "react";
import styled from "styled-components";
import GoalsList from "../home/homeGoalScreen/GoalsList/GoalsList";
import { View, Text, ActivityIndicator } from "react-native";
import moment from "moment";
import PostDateView from "../../components/PostDateView";
import styles from "../../styles";

const Post = ({
  goalText,
  dDay,
  category,
  cardColor,
  detailCategory,
  goalInformations,
  goalHistories,
  user,
  navigation,
  id,
  createdAt,
  me,
  cardPrivate,
  updatedAt,
  posts,
  startDate,
  complete,
  completeDate,
  filtering,
  excellents,
  favorites,
  luckies,
  loading,
  ordering,
  goalCommentsCount,
  goalReppliesCount,
  viewCounts,
  sale,
  salePrice,
  mainImage,
  introduceText,
  target,
  otherCosts,
  otherCostsDesc,
  historyPubCount,
  dayToDoesCount,
  dayToDoComCount,
  downloadCount,
}) => {
  const publicPost = posts && posts.filter((post) => post.postPrivate === true);

  const postDate = publicPost && publicPost.map((post) => post.createdAt);

  const latestCreatedAt =
    publicPost && publicPost.length === 0
      ? new Date(0, 0, 0)
      : postDate &&
        postDate.reduce(function (previous, current) {
          return previous > current ? previous : current;
        });

  const latestPostDate = parseInt(
    moment(latestCreatedAt).format("YYYYMDHHMMSS")
  );

  const latestPost =
    publicPost &&
    publicPost.filter(
      (post) =>
        parseInt(moment(post.createdAt).format("YYYYMDHHMMSS")) ===
        latestPostDate
    ) &&
    publicPost.filter(
      (post) =>
        parseInt(moment(post.createdAt).format("YYYYMDHHMMSS")) ===
        latestPostDate
    )[0];

  return (
    <View style={{ backgroundColor: "white", paddingTop: 10 }}>
      {latestPost !== undefined ? (
        <View style={{ flexDirection: "row" }}>
          <PostDateView item={latestPost} />
          <View>
            <Text
              style={{
                marginLeft: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
                fontWeight: "700",
              }}
            >
              {latestPost && latestPost.assortment}를 업데이트 하였습니다.
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              marginLeft: 7,
              fontSize: 10,
              color: styles.darkGreyColor,
              fontWeight: "700",
            }}
          >
            아직 업로드된 게시물이 없습니다.
          </Text>
        </View>
      )}
      <GoalsList
        goalText={goalText}
        dDay={dDay}
        category={category}
        detailCategory={detailCategory}
        cardColor={cardColor}
        id={id}
        user={user}
        navigation={navigation}
        goalInformations={goalInformations}
        goalHistories={goalHistories}
        division={"feed"}
        me={me}
        createdAt={createdAt}
        cardPrivate={cardPrivate}
        startDate={startDate}
        complete={complete}
        completeDate={completeDate}
        filtering={filtering}
        excellents={excellents}
        favorites={favorites}
        luckies={luckies}
        loading={loading}
        ordering={ordering}
        goalCommentsCount={goalCommentsCount}
        goalReppliesCount={goalReppliesCount}
        viewCounts={viewCounts}
        sale={sale}
        salePrice={salePrice}
        mainImage={mainImage}
        introduceText={introduceText}
        target={target}
        otherCosts={otherCosts}
        otherCostsDesc={otherCostsDesc}
        historyPubCount={historyPubCount}
        dayToDoesCount={dayToDoesCount}
        dayToDoComCount={dayToDoComCount}
        downloadCount={downloadCount}
      />
    </View>
  );
};

export default Post;
