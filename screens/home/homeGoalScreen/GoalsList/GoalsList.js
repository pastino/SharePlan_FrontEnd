import React from "react";
import { View } from "react-native";
import contents from "../../../../contents";
import GoalCard from "../../goal/goalComponents/GoalCard";
import { extendMoment } from "moment-range";
import Moment from "moment";
import styles from "../../../../styles";

const GoalsList = ({
  goalText,
  dDay,
  user,
  category,
  detailCategory,
  cardColor,
  password,
  cardPrivate,
  id,
  me,
  goalInformations,
  goalHistories,
  navigation,
  division,
  sizeDivision,
  startDate,
  createdAt,
  updatedAt,
  complete,
  completeDate,
  filtering,
  excellents,
  favorites,
  luckies,
  loading,
  ordering,
  communityDivision,
  goalCommentsCount,
  goalReppliesCount,
  viewCounts,
  keyWord,
  sale,
  salePrice,
  mainImage,
  introduceText,
  target,
  otherCosts,
  otherCostsDesc,
  dayToDoesCount,
  dayToDoComCount,
  historyCount,
  historyPubCount,
  seeDayToDo,
  downloadCount,
  purchase,
}) => {
  const date = new Date(dDay);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const selectDay = `${year}. ${month + 1}. ${day}`;
  const moment = extendMoment(Moment);
  const start = new Date();
  const end = new Date(date);
  const range1 = moment.range(start, end);
  const range2 = range1.snapTo("day");
  const goalDDay = range2.diff("days");

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: sizeDivision === "small" ? null : "center",
        backgroundColor: "white",
        padding: 10,
        borderBottomColor:
          communityDivision === "seeFeed" ? null : styles.lightGreyColor,
        borderBottomWidth:
          communityDivision === "seeFeed" || division === "me" ? null : 1,
      }}
    >
      <GoalCard
        category={category}
        detailCategory={detailCategory}
        cardPrivate={cardPrivate}
        value={goalText}
        selectDay={selectDay}
        dDay={goalDDay}
        originDDay={dDay}
        cardColor={cardColor}
        me={me}
        goalInformations={goalInformations}
        goalHistories={goalHistories}
        sizeDivision={sizeDivision}
        user={user}
        division={division}
        startDate={startDate}
        createdAt={createdAt}
        updatedAt={updatedAt}
        navigation={navigation}
        id={id}
        complete={complete}
        completeDate={completeDate}
        filtering={filtering}
        excellents={excellents}
        favorites={favorites}
        luckies={luckies}
        loading={loading}
        ordering={ordering}
        communityDivision={communityDivision}
        goalCommentsCount={goalCommentsCount}
        goalReppliesCount={goalReppliesCount}
        viewCounts={viewCounts}
        keyWord={keyWord}
        sale={sale}
        salePrice={salePrice}
        mainImage={mainImage}
        introduceText={introduceText}
        target={target}
        otherCosts={otherCosts}
        otherCostsDesc={otherCostsDesc}
        dayToDoesCount={dayToDoesCount}
        dayToDoComCount={dayToDoComCount}
        historyCount={historyCount}
        historyPubCount={historyPubCount}
        seeDayToDo={seeDayToDo}
        downloadCount={downloadCount}
        purchase={purchase}
      />
    </View>
  );
};

export default GoalsList;
