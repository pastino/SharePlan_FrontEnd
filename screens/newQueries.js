import { gql } from "apollo-boost";

export const SEE_ME_BASIC_DATA = gql`
  {
    seeMeBasicData {
      id
      avatar
      dateOfBirth
      nickname
      gender
      userId
      postCounts
      goalCounts
    }
  }
`;

export const SEE_HOME_GOAL = gql`
  {
    seeHomeGoal {
      id
      user {
        avatar
        dateOfBirth
        gender
        id
        nickname
        postCounts
        goalCounts
      }
      goalText
      startDate
      dDay
      category
      detailCategory
      excellents {
        id
        nickname
        avatar
      }
      favorites {
        id
        nickname
        avatar
      }
      luckies {
        id
        nickname
        avatar
      }
      viewCounts
      keyWord
      goalCommentsCount
      goalReppliesCount
      excellentCounts
      luckyCounts
      favoriteCounts
      downloadCount
      cardColor
      cardPrivate
      complete
      completeDate
      sale
      salePrice
      mainImage
      introduceText
      target
      otherCosts
      otherCostsDesc
      dayToDoesCount
      dayToDoComCount
      historyCount
      historyPubCount
      purchase
      createdAt
      updatedAt
    }
  }
`;

export const SEE_HISTORY_ID = gql`
  query seeHistoryid($goalId: String!) {
    seeHistoryid(goalId: $goalId)
  }
`;

export const SEE_GOAL_EXECELLENT = gql`
  query seeGoalExcellenct($goalId: String!) {
    seeGoalExcellenct(goalId: $goalId) {
      excellents {
        id
        avatar
        nickname
      }
    }
  }
`;

export const SEE_GOAL_FAVORITE = gql`
  query seeGoalFavorite($goalId: String!) {
    seeGoalFavorite(goalId: $goalId) {
      favorites {
        id
        avatar
        nickname
      }
    }
  }
`;

export const SEE_GOAL_LUCKY = gql`
  query seeGoalLucky($goalId: String!) {
    seeGoalLucky(goalId: $goalId) {
      luckies {
        id
        avatar
        nickname
      }
    }
  }
`;

export const SEE_HISTORY = gql`
  query seeHistory($pageNumber: Int!, $items: Int!) {
    seeHistory(pageNumber: $pageNumber, items: $items) {
      id
      title
      caption
      postPrivate
      user {
        id
        nickname
        avatar
      }
      files {
        id
        url
        postRatio
      }
      likes {
        id
        nickname
        avatar
      }
      goal {
        id
      }
      dayTodo {
        id
      }

      likeCount
      assortment
      goalInformation {
        id
      }
      goalHistory {
        id
      }
      comments {
        id
        text
        user {
          id
          nickname
          avatar
        }
        createdAt
        updatedAt
        repply {
          id
          text
          user {
            id
            nickname
            avatar
          }
          createdAt
          updatedAt
        }
      }
      commentCounts
      repplyCounts
      createdAt
      updatedAt
    }
  }
`;

export const TOGGLE_LIKES = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId) {
      id
      avatar
      nickname
    }
  }
`;

export const SEE_PICK_HISTORY = gql`
  query seePickHistory($postId: String!) {
    seePickHistory(postId: $postId) {
      id
      title
      caption
      postPrivate
      user {
        id
        nickname
        avatar
      }
      files {
        id
        url
        postRatio
      }
      likes {
        id
        nickname
        avatar
      }
      goal {
        id
      }
      dayTodo {
        id
      }

      likeCount
      assortment
      goalInformation {
        id
      }
      goalHistory {
        id
      }
      comments {
        id
        text
        user {
          id
          nickname
          avatar
        }
        createdAt
        updatedAt
        repply {
          id
          text
          user {
            id
            nickname
            avatar
          }
          createdAt
          updatedAt
        }
      }
      commentCounts
      repplyCounts
      createdAt
      updatedAt
    }
  }
`;
