import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClockButton from "../../../components/ClockButton";
import { useMutation, useQuery } from "react-apollo-hooks";
import { WAKE_UP_CLOCK, SEE_CLOCK, SEE_ME } from "../HomeQueries";
import { SEE_TALK } from "../../Talk/talkQueries";
import { ToastAndroid } from "react-native";

const View = styled.View`
  display: flex;
  flex-direction: row;
`;

const ClockContainer = ({ clockData, onRefresh, setRefreshFake }) => {
  const [loading, setLoading] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [homeText, setHomeText] = useState("");
  const date = new Date();
  const hour = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const [wakeUpClockMutation] = useMutation(WAKE_UP_CLOCK, {
    variables: {
      wakeUpTime: hour,
      todayDate: day,
      todayMonth: month,
      todayYear: year,
    },
    refetchQueries: () => [{ query: SEE_CLOCK, SEE_TALK, SEE_ME }],
    awaitRefetchQueries: true,
  });

  const saveClock = async () => {
    const doubleCheckDate = new Date();
    const doubleCheckhour = doubleCheckDate.getHours();
    if (doubleCheckhour >= 4 && doubleCheckhour <= 7) {
      setLoading(true);
      const {
        data: { wakeUpClock },
      } = await wakeUpClockMutation();
      setLoading(false);
      if (onRefresh) {
        onRefresh();
      }
      setInactive(true);
    } else {
      ToastAndroid.show(
        "기상인증 시간이 아닙니다.(인증시간: 4 ~ 7시)",
        ToastAndroid.SHORT
      );
    }
  };

  const { data, loading: queryLoading } = useQuery(SEE_CLOCK, {
    fetchPolicy: "network-only",
  });

  const wakeUpClock =
    data &&
    data.seeClock &&
    data.seeClock.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    ) &&
    data.seeClock.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    )[0] &&
    data.seeClock.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    )[0].wakeUpTime;

  useEffect(() => {
    if (hour >= 4 && hour <= 7) {
      if (wakeUpClock) {
        setInactive(true);
      } else {
        setInactive(false);
        setHomeText("기상 인증하기");
      }
    } else if (!(hour >= 4 && hour <= 7)) {
      setInactive(true);
      setHomeText("InSo");
    }
  });

  return (
    <>
      <View>
        <ClockButton
          loading={loading}
          inactive={inactive}
          onPress={() => saveClock()}
          wakeUpClock={wakeUpClock}
          queryLoading={queryLoading}
          homeText={homeText}
        />
      </View>
    </>
  );
};

export default ClockContainer;
