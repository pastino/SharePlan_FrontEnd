import { gql } from "apollo-boost";

export const EXCELLENT_TOGGLE = gql`
  mutation execellentToggle($goalId: String!, $filter: Boolean!) {
    execellentToggle(goalId: $goalId, filter: $filter) {
      id
      nickname
      avatar
    }
  }
`;

export const FAVORITE_TOGGLE = gql`
  mutation favoriteToggle($goalId: String!, $filter: Boolean!) {
    favoriteToggle(goalId: $goalId, filter: $filter) {
      id
      nickname
      avatar
    }
  }
`;

export const LUCKY_TOGGLE = gql`
  mutation luckyToggle($goalId: String!, $filter: Boolean!) {
    luckyToggle(goalId: $goalId, filter: $filter) {
      id
      nickname
      avatar
    }
  }
`;
