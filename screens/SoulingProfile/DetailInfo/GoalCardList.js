import React from "react";
import { View } from "react-native";
import GoalCard from "../../home/goal/goalComponents/GoalCard";
import { extendMoment } from "moment-range";
import Moment from "moment";

const GoalCardList = ({
  value,
  selectDay,
  startDate,
  originDDay,
  cardColor,
  goalInformations,
  goalHistories,
  user,
  division,
  createdAt,
  updatedAt,
  navigation,
  id,
  goalDDay,
  category,
  detailCategory,
  complete,
  completeDate,
  excellents,
  favorites,
  luckies,
  me,
  viewCounts,
  goalCommentsCount,
  goalReppliesCount,
  sale,
  salePrice,
  mainImage,
  introduceText,
  target,
  otherCosts,
  otherCostsDesc,
  dayToDoesCount,
  historyCount,
  historyPubCount,
  downloadCount,
}) => {
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
        startDate={startDate}
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
        complete={complete}
        completeDate={completeDate}
        excellents={excellents}
        favorites={favorites}
        luckies={luckies}
        me={me}
        communityDivision={"seeUser"}
        viewCounts={viewCounts}
        goalCommentsCount={goalCommentsCount}
        goalReppliesCount={goalReppliesCount}
        sale={sale}
        salePrice={salePrice}
        mainImage={mainImage}
        introduceText={introduceText}
        target={target}
        otherCosts={otherCosts}
        otherCostsDesc={otherCostsDesc}
        dayToDoesCount={dayToDoesCount}
        historyCount={historyCount}
        historyPubCount={historyPubCount}
        downloadCount={downloadCount}
      />
    </View>
  );
};

export default GoalCardList;
