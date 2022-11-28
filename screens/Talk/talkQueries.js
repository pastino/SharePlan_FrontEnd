import { gql } from "apollo-boost";

export const TALK_CREATE = gql`
  mutation talkCreate($talkText: String!, $division: String!) {
    talkCreate(talkText: $talkText, division: $division)
  }
`;

export const TALK_DELETE = gql`
  mutation talkDelete($talkId: String!) {
    talkDelete(talkId: $talkId)
  }
`;

export const TALK_MODIFY = gql`
  mutation talkModify($talkId: String!, $talkText: String!) {
    talkModify(talkId: $talkId, talkText: $talkText)
  }
`;

export const TALK_COMMENT_CREATE = gql`
  mutation createTalkComment($text: String!, $talkId: String!) {
    createTalkComment(text: $text, talkId: $talkId) {
      id
      talk {
        id
      }
      text
      talkRepplies {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const TALK_COMMENT_EDIT = gql`
  mutation editTalkComment($talkCommentId: String!, $text: String!) {
    editTalkComment(talkCommentId: $talkCommentId, text: $text)
  }
`;

export const TALK_COMMENT_DELETE = gql`
  mutation deleteTalkComment($talkCommentId: String!) {
    deleteTalkComment(talkCommentId: $talkCommentId)
  }
`;

export const TALK_REPPLY_CREATE = gql`
  mutation createTalkRepply(
    $text: String!
    $talkCommentId: String!
    $talkId: String!
  ) {
    createTalkRepply(
      text: $text
      talkCommentId: $talkCommentId
      talkId: $talkId
    ) {
      id
      user {
        id
        nickname
        avatar
      }
      talkComment {
        id
      }
      talk {
        id
      }
      text
      createdAt
      updatedAt
    }
  }
`;

export const TALK_REPPLY_EDIT = gql`
  mutation editTalkRepply($talkRepplyId: String!, $text: String!) {
    editTalkRepply(talkRepplyId: $talkRepplyId, text: $text)
  }
`;

export const TALK_REPPLY_DELETE = gql`
  mutation deleteTalkRepply($talkRepplyId: String!) {
    deleteTalkRepply(talkRepplyId: $talkRepplyId)
  }
`;

export const SEE_TALK = gql`
  query seeTalk($pageNumber: Int!, $items: Int!) {
    seeTalk(pageNumber: $pageNumber, items: $items) {
      id
      user {
        id
        nickname
        avatar
        clocks {
          id
          todayYear
          todayMonth
          todayDate
          wakeUpTime
        }
      }
      talkCommentCounts
      talkRepplyCounts
      talkComments {
        id
        user {
          id
          nickname
          avatar
        }
        talk {
          id
        }
        text
        talkRepplies {
          id
          user {
            id
            nickname
            avatar
          }
          talkComment {
            id
          }
          text
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      talkText
      division
      createdAt
      updatedAt
    }
  }
`;
