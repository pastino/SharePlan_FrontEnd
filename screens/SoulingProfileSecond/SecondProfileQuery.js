import { gql } from "apollo-boost";

export const SOULING = gql`
  mutation follow($id: String!) {
    follow(id: $id) {
      id
      nickname
      avatar
      gender
      dateOfBirth
      postCounts
      goalCounts
    }
  }
`;

export const UN_SOULING = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id) {
      id
    }
  }
`;

export const SEE_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      avatar
      dateOfBirth
      userId
      nickname
      gender
      bio
      postCounts
      goalCounts
      talks {
        id
        user {
          id
          nickname
          avatar
        }
        talkText
        division
        createdAt
        updatedAt
      }
      clocks {
        id
        user {
          id
          nickname
          avatar
        }
        todayYear
        todayMonth
        todayDate
        wakeUpTime
      }
      goals {
        id
        posts {
          id
        }
        user {
          id
          nickname
          avatar
        }
        goalText
        dDay
        startDate
        historyPubCount
        historyCount
        downloadCount
        dayToDoesCount
        dayToDoComCount
        goalInformations {
          id
          information {
            id
            title
            caption
            goal {
              id
            }
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
              repply {
                id
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
            goal {
              id
            }
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
            }
            commentCounts
            repplyCounts

            createdAt
            updatedAt
          }
        }
        detailPlans {
          id
          stagePlanText
          startingDay
          endDay
        }
        dayToDoesCount
        dayToDoComCount
        category
        keyWord
        viewCounts
        goalCommentsCount
        goalReppliesCount
        detailCategory
        cardColor
        password
        cardPrivate
        complete
        completeDate
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
        sale
        salePrice
        mainImage
        introduceText
        target
        otherCosts
        otherCostsDesc
        purchase
        createdAt
        updatedAt
      }
      dayToDoes {
        id
        startDate
        startTime
        endDate
        endTime
        alrams {
          id
          time
          dayToDo {
            id
          }
        }
        memo
        user {
          id
        }
        toDoList
        complete
        color
        index
        goal {
          id
          goalText
        }
      }
      following {
        id
        avatar
        dateOfBirth
        nickname
        gender
        postCounts
        goalCounts
      }
      followers {
        id
        avatar
        dateOfBirth
        nickname
        gender
        postCounts
        goalCounts
      }
      posts {
        id
        title
        caption
        assortment
        goalInformation {
          id
        }
        user {
          id
          avatar
          nickname
        }
        files {
          id
          url
        }
        comments {
          id
        }
        createdAt
        updatedAt
      }
      comments {
        id
        text
        user {
          id
        }
        post {
          id
        }
      }
      createdAt
      updatedAt
    }
  }
`;
