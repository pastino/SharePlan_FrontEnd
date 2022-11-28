import React from "react";
import { View, Text } from "react-native";
import GoalsList from "../home/homeGoalScreen/GoalsList/GoalsList";
import contents from "../../contents";
import styles from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "react-apollo-hooks";
import { SALE_CONFIRM, GOAL_SALE_CONFIRM } from "../home/HomeQueries";

const ConfirmGoalListData = ({
  goalText,
  dDay,
  category,
  detailCategory,
  cardColor,
  id,
  user,
  navigation,
  goalInformations,
  goalHistories,
  division,
  me,
  createdAt,
  cardPrivate,
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
  setConfirmLoading,
  userId,
}) => {
  const [saleConfirmMutation] = useMutation(SALE_CONFIRM, {
    refetchQueries: () => [{ query: GOAL_SALE_CONFIRM, variables: { userId } }],
    awaitRefetchQueries: true,
  });

  const saleConfirmHandle = async ({ confirm }) => {
    setConfirmLoading(true);
    await saleConfirmMutation({
      variables: {
        goalId: id,
        saleConfirm: confirm,
      },
    });
    setConfirmLoading(false);
  };

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={
            () => navigation.navigate("RejectReasonText", { userId, id })
            // saleConfirmHandle({ confirm: "반려" })
          }
        >
          <View
            style={{
              width: 70,
              height: 40,
              borderRadius: 10,
              backgroundColor: styles.Wine,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>반려</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saleConfirmHandle({ confirm: "승인" })}
        >
          <View
            style={{
              width: 70,
              height: 40,
              borderRadius: 10,
              backgroundColor: styles.MainColor,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>승인</Text>
          </View>
        </TouchableOpacity>
      </View>
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
        division={"goalSaleConfirm"}
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
      />
    </View>
  );
};

export default ConfirmGoalListData;
