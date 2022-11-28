import React, { useState } from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
import HomeGoalHistory from "./HomeGoalHistory";
import DownloadView from "./Download/DownloadView";
import styles from "../../../styles";
import { useQuery } from "react-apollo-hooks";
import { SEE_TODO_OF_GOAL } from "../HomeQueries";

const GoalViewDiv = ({ navigation }) => {
  const id = navigation.getParam("id");
  const division = navigation.getParam("division");
  const goalText = navigation.getParam("goalText");
  const user = navigation.getParam("user");
  const me = navigation.getParam("me");
  const goalInformations = navigation.getParam("goalInformations");
  const goalHistories = navigation.getParam("goalHistories");
  const createdHistoryDateNum = navigation.getParam("createdHistoryDateNum");
  const selectDay = navigation.getParam("selectDay");
  const dDay = navigation.getParam("dDay");
  const startDate = navigation.getParam("startDate");
  const originDDay = navigation.getParam("originDDay");
  const sale = navigation.getParam("sale");
  const salePrice = navigation.getParam("salePrice");
  const mainImage = navigation.getParam("mainImage");
  const introduceText = navigation.getParam("introduceText");
  const target = navigation.getParam("target");
  const otherCosts = navigation.getParam("otherCosts");
  const otherCostsDesc = navigation.getParam("otherCostsDesc");
  const category = navigation.getParam("category");
  const detailCategory = navigation.getParam("detailCategory");
  const historyPubCount = navigation.getParam("historyPubCount");

  const { data, loading } = useQuery(SEE_TODO_OF_GOAL, {
    variables: {
      goalId: id,
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      {sale === "승인" || division === "goalSaleConfirm" ? (
        <ScrollableTabView
          initialPage={0}
          onChangeTab={() => {
            null;
          }}
          style={{ backgroundColor: "white" }}
          tabBarActiveTextColor={styles.MainColor}
          tabBarUnderlineStyle={{
            backgroundColor: styles.MainColor,
            height: 3,
          }}
        >
          <HomeGoalHistory
            tabLabel="History"
            id={id}
            division={division}
            goalText={goalText}
            user={user}
            me={me}
            goalInformations={goalInformations}
            goalHistories={goalHistories}
            createdHistoryDateNum={createdHistoryDateNum}
            selectDay={selectDay}
            dDay={dDay}
            startDate={startDate}
            originDDay={originDDay}
            sale={sale}
            salePrice={salePrice}
            mainImage={mainImage}
            introduceText={introduceText}
            target={target}
            otherCosts={otherCosts}
            otherCostsDesc={otherCostsDesc}
            data={data}
            loading={loading}
            navigation={navigation}
          />

          <DownloadView
            tabLabel="정보"
            id={id}
            division={division}
            goalText={goalText}
            user={user}
            me={me}
            goalInformations={goalInformations}
            goalHistories={goalHistories}
            createdHistoryDateNum={createdHistoryDateNum}
            selectDay={selectDay}
            dDay={dDay}
            startDate={startDate}
            originDDay={originDDay}
            sale={sale}
            salePrice={salePrice}
            mainImage={mainImage}
            introduceText={introduceText}
            target={target}
            otherCosts={otherCosts}
            otherCostsDesc={otherCostsDesc}
            category={category}
            detailCategory={detailCategory}
            data={data}
            loading={loading}
            navigation={navigation}
            historyPubCount={historyPubCount}
          />
        </ScrollableTabView>
      ) : (
        <HomeGoalHistory
          tabLabel="History"
          id={id}
          division={division}
          goalText={goalText}
          user={user}
          me={me}
          goalInformations={goalInformations}
          goalHistories={goalHistories}
          createdHistoryDateNum={createdHistoryDateNum}
          selectDay={selectDay}
          dDay={dDay}
          startDate={startDate}
          originDDay={originDDay}
          sale={sale}
          salePrice={salePrice}
          mainImage={mainImage}
          introduceText={introduceText}
          target={target}
          otherCosts={otherCosts}
          otherCostsDesc={otherCostsDesc}
          data={data}
          loading={loading}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default GoalViewDiv;
