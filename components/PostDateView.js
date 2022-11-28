import React from "react";
import moment from "moment";
import { View, Text } from "react-native";
import styles from "../styles";

const PostDateView = ({ item, division }) => {
  const createdAt = item && item.createdAt;
  const c = moment();
  const d = moment(createdAt);

  const repplyMinuteCreated = c.diff(d, "minutes"); // 44700
  const repplyHourCreated = c.diff(d, "hours"); // 745
  const repplyDayCreated = c.diff(d, "days"); // 31
  const repplyWeekCreated = c.diff(d, "weeks"); // 4
  const repplyMonthCreated = c.diff(d, "months");
  const repplyYearCreated = c.diff(d, "years");

  return (
    <View>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 10,
          color: styles.darkGreyColor,
          fontWeight: "700",
        }}
      >
        {division === "history"
          ? repplyMinuteCreated < 60
            ? `${repplyMinuteCreated}분 전`
            : repplyHourCreated < 24
            ? `${repplyHourCreated}시간 전`
            : null
          : repplyMinuteCreated < 60
          ? `${repplyMinuteCreated}분 전`
          : repplyHourCreated < 24
          ? `${repplyHourCreated}시간 전`
          : repplyDayCreated < 7
          ? `${repplyDayCreated}일 전`
          : repplyWeekCreated < 5
          ? `${repplyWeekCreated}주 전`
          : repplyMonthCreated < 12
          ? `${repplyMonthCreated}개월 전`
          : `${repplyYearCreated}년 전`}
      </Text>
    </View>
  );
};

export default PostDateView;
