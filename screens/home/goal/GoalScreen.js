import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import contents from "../../../contents";
import Swiper from "react-native-swiper";
import styles from "../../../styles";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME } from "../HomeQueries";

const GoalView = styled.View`
  margin-top: ${contents.height / 32};
`;

const GoalText = styled.Text`
  color: ${props => props.theme.blackColor};
  font-size: 17px;
  font-family: "flower";
`;

const GoalScreen = ({ goal }) => {
  const { loading, data: seeMe, refetch } = useQuery(SEE_ME, {
    fetchPolicy: "network-only"
  });
  return (
    <>
      {seeMe && seeMe.me && seeMe.me.goals !== null ? (
        <Swiper
          dotColor={styles.lightGreyColor}
          activeDotColor={"#ccf1ff"}
          paginationStyle={{
            bottom: -2,
            left: contents.width / 1.5
          }}
          showsPagination={true}
        >
          {seeMe &&
            seeMe.me &&
            seeMe.me.goals &&
            seeMe.me.goals.map(goal => (
              <Fragment key={Math.random().toString()}>
                <GoalView>
                  <GoalText style={{ textAlign: "center" }}>
                    {goal.goalText}
                  </GoalText>
                </GoalView>
              </Fragment>
            ))}
        </Swiper>
      ) : null}
    </>
  );
};

GoalScreen.propTypes = {
  goalTexts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      goalText: PropTypes.string.isRequired
    })
  ),
  onPress: PropTypes.func
};

export default GoalScreen;
