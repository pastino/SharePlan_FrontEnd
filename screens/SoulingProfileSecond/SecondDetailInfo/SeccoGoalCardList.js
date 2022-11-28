import React from "react";
import { View } from "react-native";
import GoalCard from "../../home/goal/goalComponents/GoalCard";
import { extendMoment } from "moment-range";
import Moment from "moment";

const SecondGoalCardList = ({
  value,
  selectDay,
  originDDay,
  cardColor,
  goalInformations,
  goalHistories,
  user,
  division,
  startDate,
  createdAt,
  updatedAt,
  navigation,
  id,
  goalDDay,
  category,
  detailCategory,
  excellents,
  favorites,
  luckies,
  loading,
  ordering,
  me,
  commentCounts,
  repplyCounts,
  dayToDoesCount,
  dayToDoComCount,
  historyCount,
  historyPubCount,
  downloadCount,
  goalCommentsCount,
  goalReppliesCount,
}) => {
  console.log(historyCount, historyPubCount, downloadCount);
  const date = new Date(goalDDay);
  const moment = extendMoment(Moment);
  const start = new Date();
  const end = new Date(date);
  const range1 = moment.range(start, end);
  const range2 = range1.snapTo("day");
  const dDay = range2.diff("days");
  return (
    <View>
      <GoalCard
        value={value}
        selectDay={selectDay}
        category={category}
        detailCategory={detailCategory}
        originDDay={originDDay}
        cardColor={cardColor}
        goalInformations={goalInformations}
        goalHistories={goalHistories}
        user={user}
        division={division}
        createdAt={createdAt}
        updatedAt={updatedAt}
        navigation={navigation}
        id={id}
        dDay={dDay}
        settingsView={true}
        filtering={"전체"}
        ordering={"추천"}
        excellents={excellents}
        favorites={favorites}
        luckies={luckies}
        communityDivision={"seeUser"}
        me={me}
        commentCounts={commentCounts}
        repplyCounts={repplyCounts}
        startDate={startDate}
        historyCount={historyCount}
        historyPubCount={historyPubCount}
        downloadCount={downloadCount}
        dayToDoesCount={dayToDoesCount}
        dayToDoComCount={dayToDoComCount}
        goalCommentsCount={goalCommentsCount}
        goalReppliesCount={goalReppliesCount}
      />
    </View>
  );
};

export default SecondGoalCardList;
