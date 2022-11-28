import { gql } from "apollo-boost";

export const SEARCH_CARD = gql`
  query searchCard(
    $term: String!
    $tab: String!
    $items: Int!
    $pageNumber: Int!
    $ordering: String!
  ) {
    searchCard(
      term: $term
      tab: $tab
      items: $items
      pageNumber: $pageNumber
      ordering: $ordering
    ) {
      id
      user {
        id
        avatar
        nickname
      }
      posts {
        id
        createdAt
        postPrivate
        assortment
      }
      goalText
      dDay
      startDate
      goalInformations {
        id
        information {
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
          }
          likes {
            id
            nickname
          }

          likeCount
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
      goalHistories {
        id
        history {
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
          }
          likes {
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
      historyPubCount
      downloadCount
      detailPlans {
        id
      }
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
      dayToDoesCount
      dayToDoComCount
      viewCounts
      goalCommentsCount
      goalReppliesCount
      cardColor
      password
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
      createdAt
      updatedAt
    }
  }
`;
