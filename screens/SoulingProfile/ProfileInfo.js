import React, { Fragment } from "react";
import contents from "../../contents";
import styles from "../../styles";
import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SoulerList from "./DetailInfo/SoulerList";
import moment from "moment";
import GoalCardList from "./DetailInfo/GoalCardList";

const ProfileInfo = ({
  user,
  selectTap,
  setSelectTap,
  followers,
  following,
  navigation,
  createdAt,
  division,
  refreshing,
  onRefresh,
  me,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 80,
          width: contents.width,
          backgroundColor: styles.moreLightGrey,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectTap(1)}
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginBottom: 3,
                textAlign: "center",
                color:
                  selectTap === 1 ? styles.MainColor : styles.darkGreyColor,
              }}
            >
              {division === "myProfile"
                ? user && user.goals && user.goals.length
                : user.goals &&
                  user.goals.filter((goal) => goal.cardPrivate === true) &&
                  user.goals.filter((goal) => goal.cardPrivate === true).length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color:
                  selectTap === 1 ? styles.MainColor : styles.darkGreyColor,
                borderBottomWidth: selectTap === 1 ? 1 : null,
                borderBottomColor: selectTap === 1 ? styles.MainColor : null,
              }}
            >
              목표카드
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectTap(2)}
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginBottom: 3,
                textAlign: "center",
                color:
                  selectTap === 2 ? styles.MainColor : styles.darkGreyColor,
              }}
            >
              0
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color:
                  selectTap === 2 ? styles.MainColor : styles.darkGreyColor,
                borderBottomWidth: selectTap === 2 ? 1 : null,
                borderBottomColor: selectTap === 2 ? styles.MainColor : null,
              }}
            >
              습관기록
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectTap(3)}
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginBottom: 3,
                textAlign: "center",
                color:
                  selectTap === 3 ? styles.MainColor : styles.darkGreyColor,
              }}
            >
              {following && following.length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color:
                  selectTap === 3 ? styles.MainColor : styles.darkGreyColor,
                borderBottomWidth: selectTap === 3 ? 1 : null,
                borderBottomColor: selectTap === 3 ? styles.MainColor : null,
              }}
            >
              롤모델(-ing)
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectTap(4)}
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginBottom: 3,
                textAlign: "center",
                color:
                  selectTap === 4 ? styles.MainColor : styles.darkGreyColor,
              }}
            >
              {followers && followers.length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color:
                  selectTap === 4 ? styles.MainColor : styles.darkGreyColor,
                borderBottomWidth: selectTap === 4 ? 1 : null,
                borderBottomColor: selectTap === 4 ? styles.MainColor : null,
              }}
            >
              롤모델(-er)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          division === "myProfile" ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      >
        {selectTap === 1 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 10 }}>
              비공개 목표카드는 다른사람에게 공개되지 않습니다.
            </Text>
            {division === "myProfile"
              ? user &&
                user.goals &&
                user.goals.map((goal) => (
                  <Fragment key={goal.id}>
                    <View
                      style={{
                        width: contents.width,
                        borderBottomWidth: 1,
                        borderBottomColor: styles.lightGreyColor,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <GoalCardList
                        cardPrivate={goal.cardPrivate}
                        value={goal.goalText}
                        category={goal.category}
                        detailCategory={goal.detailCategory}
                        selectDay={moment(goal.dDay).format("YYYY. M. D")}
                        startDate={goal.startDate}
                        originDDay={goal.dDay}
                        cardColor={goal.cardColor}
                        goalInformations={goal.goalInformations}
                        goalHistories={goal.goalHistories}
                        user={user}
                        division={"me"}
                        createdAt={goal.createdAt}
                        updatedAt={goal.updatedAt}
                        navigation={navigation}
                        id={goal.id}
                        goalDDay={goal.dDay}
                        complete={goal.complete}
                        completeDate={goal.completeDate}
                        excellents={goal.excellents}
                        favorites={goal.favorites}
                        luckies={goal.luckies}
                        me={me}
                        viewCounts={goal.viewCounts}
                        goalCommentsCount={goal.goalCommentsCount}
                        goalReppliesCount={goal.goalReppliesCount}
                        historyCount={goal.historyCount}
                        historyPubCount={goal.historyPubCount}
                        downloadCount={goal.downloadCount}
                        sale={goal.sale}
                        salePrice={goal.salePrice}
                        mainImage={goal.mainImage}
                        introduceText={goal.introduceText}
                        target={goal.target}
                        otherCosts={goal.otherCosts}
                        otherCostsDesc={goal.otherCostsDesc}
                        dayToDoesCount={goal.dayToDoesCount}
                      />
                    </View>
                  </Fragment>
                ))
              : user &&
                user.goals &&
                user.goals.filter((goal) => goal.cardPrivate === true) &&
                user.goals
                  .filter((goal) => goal.cardPrivate === true)
                  .map((goal) => (
                    <Fragment key={goal.id}>
                      <View
                        style={{
                          width: contents.width,
                          borderBottomWidth: 1,
                          borderBottomColor: styles.lightGreyColor,
                          justifyContent: "center",
                          alignItems: "center",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <GoalCardList
                          cardPrivate={goal.cardPrivate}
                          category={goal.category}
                          detailCategory={goal.detailCategory}
                          value={goal.goalText}
                          selectDay={moment(goal.dDay).format("YYYY. M. D")}
                          startDate={goal.startDate}
                          originDDay={goal.dDay}
                          cardColor={goal.cardColor}
                          goalInformations={goal.goalInformations}
                          goalHistories={goal.goalHistories}
                          user={user}
                          division={"feed"}
                          createdAt={goal.createdAt}
                          updatedAt={goal.updatedAt}
                          navigation={navigation}
                          id={goal.id}
                          goalDDay={goal.dDay}
                          complete={goal.complete}
                          completeDate={goal.completeDate}
                          excellents={goal.excellents}
                          favorites={goal.favorites}
                          luckies={goal.luckies}
                          me={me}
                          viewCounts={goal.viewCounts}
                          goalCommentsCount={goal.goalCommentsCount}
                          goalReppliesCount={goal.goalReppliesCount}
                          historyCount={goal.historyCount}
                          historyPubCount={goal.historyPubCount}
                          downloadCount={goal.downloadCount}
                          sale={goal.sale}
                          salePrice={goal.salePrice}
                          mainImage={goal.mainImage}
                          introduceText={goal.introduceText}
                          target={goal.target}
                          otherCosts={goal.otherCosts}
                          otherCostsDesc={goal.otherCostsDesc}
                          dayToDoesCount={goal.dayToDoesCount}
                        />
                      </View>
                    </Fragment>
                  ))}
          </View>
        ) : selectTap === 2 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: contents.height / 2.3,
            }}
          >
            <Text>서비스 준비중입니다.</Text>
          </View>
        ) : selectTap === 3 ? (
          <View>
            {following &&
              following.map((following) => (
                <Fragment key={following.id}>
                  <SoulerList {...following} navigation={navigation} me={me} />
                </Fragment>
              ))}
          </View>
        ) : selectTap === 4 ? (
          <View>
            {followers &&
              followers.map((follower) => (
                <Fragment key={follower.id}>
                  <SoulerList {...follower} navigation={navigation} me={me} />
                </Fragment>
              ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileInfo;
