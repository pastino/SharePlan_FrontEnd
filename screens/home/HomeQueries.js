import { gql } from "apollo-boost";

export const SEE_ME = gql`
  {
    me {
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
        historyPubCount
        historyCount
        downloadCount
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
        }
        memo
        user {
          id
        }
        toDoList
        complete
        color
        index
        originToDoId
        goal {
          id
          goalText
        }
      }
      following {
        id
        avatar
        nickname
        dateOfBirth
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
        postPrivate
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

        likes {
          id
        }
        comments {
          id
        }
        createdAt
        updatedAt
      }
      likes {
        id
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
      rooms {
        id
        participants {
          id
        }
        messages {
          id
        }
      }
      feedOrdering
      createdAt
      updatedAt
    }
  }
`;

export const FEED_ORDERING = gql`
  {
    seeFeedOrdering {
      feedOrdering
    }
  }
`;

export const SEE_FEED = gql`
  {
    seeFeed {
      id
      user {
        id
        avatar
        nickname
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
      detailPlans {
        id
      }
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

      category
      viewCounts
      goalCommentsCount
      goalReppliesCount
      detailCategory
      cardColor
      password
      cardPrivate
      complete
      completeDate
      createdAt
      updatedAt
    }
  }
`;

export const SEE_MAIN_FEED = gql`
  query seeMainFeed(
    $pageNumber: Int!
    $items: Int!
    $filtering: String!
    $ordering: String!
  ) {
    seeMainFeed(
      pageNumber: $pageNumber
      items: $items
      filtering: $filtering
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

export const ORDERING_BASIC_SETTING = gql`
  mutation feedOrderingSettting($ordering: String!) {
    feedOrderingSettting(ordering: $ordering)
  }
`;

export const CREATE_GOAL = gql`
  mutation createGoal(
    $goalText: String!
    $category: String!
    $detailCategory: String!
    $cardColor: String!
    $startDate: String!
    $dDay: String
    $cardPrivate: Boolean!
  ) {
    createGoal(
      goalText: $goalText
      category: $category
      detailCategory: $detailCategory
      cardColor: $cardColor
      startDate: $startDate
      dDay: $dDay
      cardPrivate: $cardPrivate
    ) {
      id
      goalText
      category
      detailCategory
      cardColor
      startDate
      dDay
      cardPrivate
      goalInformations {
        id
      }
      goalHistories {
        id
      }
      detailPlans {
        id
      }
    }
  }
`;

export const CREATE_GOAL_TEST = gql`
  mutation createGoal(
    $goalText: String!
    $category: String
    $detailCategory: String!
    $cardColor: String!
    $startDate: String!
    $dDay: String!
    $cardPrivate: Boolean!
    $keyword: String!
    $division: String
    $stagePlanText: [String!]
    $startingDay: [String!]
    $endDay: [String!]
  ) {
    createGoal(
      goalText: $goalText
      category: $category
      detailCategory: $detailCategory
      cardColor: $cardColor
      startDate: $startDate
      dDay: $dDay
      cardPrivate: $cardPrivate
      keyword: $keyword
      division: $division
      stagePlanText: $stagePlanText
      startingDay: $startingDay
      endDay: $endDay
    )
  }
`;

export const EDIT_GOAL_CARD = gql`
  mutation editGoalCard(
    $goalId: String!
    $goalText: String
    $dDay: String
    $startDate: String
    $keyWord: String
    $category: String
    $detailCategory: String
    $cardColor: String
    $cardPrivate: Boolean
  ) {
    editGoalCard(
      goalId: $goalId
      goalText: $goalText
      dDay: $dDay
      startDate: $startDate
      keyWord: $keyWord
      category: $category
      detailCategory: $detailCategory
      cardColor: $cardColor
      cardPrivate: $cardPrivate
    ) {
      id
      goalText
      startDate
      dDay
      category
      keyWord
      detailCategory
      cardColor
      cardPrivate
    }
  }
`;

export const UPDATE_GOAL_SALE_INFO = gql`
  mutation saleResist(
    $salePrice: Int!
    $mainImage: String!
    $introduceText: String!
    $goalId: String!
    $sale: String!
    $target: String!
    $otherCosts: Int!
    $otherCostsDesc: String
    $alramToken: String
  ) {
    saleResist(
      salePrice: $salePrice
      mainImage: $mainImage
      introduceText: $introduceText
      goalId: $goalId
      sale: $sale
      target: $target
      otherCosts: $otherCosts
      otherCostsDesc: $otherCostsDesc
      alramToken: $alramToken
    )
  }
`;

export const GOAL_SALE_CANCLE = gql`
  mutation saleCancle($goalId: String!) {
    saleCancle(goalId: $goalId)
  }
`;

export const DELETE_GOAL_CARD = gql`
  mutation deleteGoalCard($goalId: String!) {
    deleteGoalCard(goalId: $goalId)
  }
`;

export const COMPLETE_GOAL_CARD = gql`
  mutation completeGoalCard($goalId: String!) {
    completeGoalCard(goalId: $goalId)
  }
`;

export const COMPLETE_CANCLE_GOAL = gql`
  mutation completeCancleGoal($goalId: String!) {
    completeCancleGoal(goalId: $goalId)
  }
`;

export const SEE_DAYTODO = gql`
  {
    dayToDoes {
      id
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
        categoryId
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
        sale
      }
      posts {
        id
        title
      }
    }
  }
`;

export const SEE_TODO_OF_GOAL = gql`
  query seeToDoOfGoal($goalId: String!) {
    seeToDoOfGoal(goalId: $goalId) {
      id
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
      }
      posts {
        id
        title
        postPrivate
      }
    }
  }
`;

export const CREATE_DAYTODO = gql`
  mutation createDayToDo(
    $toDoList: String!
    $color: String!
    $startDate: String!
    $startTime: String
    $endDate: String!
    $endTime: String
    $alrams: [Int!]
    $categoryId: [Int!]
    $memo: String
    $goalId: String
    $today: String!
  ) {
    createDayToDo(
      toDoList: $toDoList
      color: $color
      startDate: $startDate
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
      alrams: $alrams
      categoryId: $categoryId
      memo: $memo
      goalId: $goalId
      today: $today
    ) {
      id
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
        categoryId
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
        sale
      }
      posts {
        id
        title
      }
    }
  }
`;

export const EDIT_TODO = gql`
  mutation editToDo(
    $id: String!
    $toDoList: String!
    $color: String!
    $startDate: String!
    $startTime: String
    $endDate: String!
    $endTime: String
    $deleteAlrams: [String!]
    $createAlrams: [Int!]
    $memo: String
    $goalId: String
    $categoryId: [Int!]
    $categoryTime: [Int!]
  ) {
    editToDo(
      id: $id
      toDoList: $toDoList
      color: $color
      startDate: $startDate
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
      deleteAlrams: $deleteAlrams
      createAlrams: $createAlrams
      memo: $memo
      goalId: $goalId
      categoryId: $categoryId
      categoryTime: $categoryTime
    ) {
      id
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
        categoryId
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
        sale
      }
      posts {
        id
        title
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteToDo($id: String!) {
    deleteToDo(id: $id) {
      id
    }
  }
`;

export const COMPLETE_TODO = gql`
  mutation completeToDo($toDoId: String!, $complete: Boolean!) {
    completeToDo(toDoId: $toDoId, complete: $complete) {
      id
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
        sale
      }
      posts {
        id
        title
      }
    }
  }
`;

export const ORDERING_DAYTODO = gql`
  mutation orderingToDO($toDoId: [String!]!) {
    orderingToDO(toDoId: $toDoId)
  }
`;

export const SCHEDULE_CHANGE_TODO = gql`
  mutation scheduleChangeToDo($dayToDoId: String!, $monthDay: String!) {
    scheduleChangeToDo(dayToDoId: $dayToDoId, monthDay: $monthDay) {
      id
      monthDay
      user {
        id
      }
      toDoList
      complete
      importEvent
      index
      originToDoId
      goal {
        id
        goalText
      }
    }
  }
`;

export const WAKE_UP_CLOCK = gql`
  mutation wakeUpClock(
    $wakeUpTime: Int!
    $todayYear: Int!
    $todayMonth: Int!
    $todayDate: Int!
  ) {
    wakeUpClock(
      wakeUpTime: $wakeUpTime
      todayYear: $todayYear
      todayMonth: $todayMonth
      todayDate: $todayDate
    ) {
      id
      wakeUpTime
      todayYear
      todayMonth
      todayDate
    }
  }
`;

export const SEE_CLOCK = gql`
  {
    seeClock {
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
  }
`;

export const SEE_GOAL = gql`
  query($goalId: String!) {
    seeGoal(goalId: $goalId) {
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
      }
      goalInformations {
        id

        information {
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
            nickname
            avatar
          }

          likeCount
          assortment
          postPrivate
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
            repply {
              id
            }
          }
          commentCounts
          repplyCounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
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
            nickname
            avatar
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
            repply {
              id
            }
          }
          commentCounts
          repplyCounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      detailPlans {
        id
      }
      complete
      completeDate
      createdAt
      updatedAt
    }
  }
`;

export const GOAL_SELECT_VIEW = gql`
  query goalSelectView {
    goalSelectView {
      id
      goalText
      startDate
      dDay
      sale
    }
  }
`;

export const UPLOAD_POST = gql`
  mutation upload(
    $caption: String!
    $files: [String!]
    $title: String!
    $assortment: String!
    $goalInformationId: String!
    $postPrivate: Boolean!
    $goalId: String!
  ) {
    upload(
      caption: $caption
      files: $files
      title: $title
      assortment: $assortment
      goalInformationId: $goalInformationId
      postPrivate: $postPrivate
      goalId: $goalId
    ) {
      id
      caption
      files {
        id
      }
      title
      assortment
      postPrivate
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $caption: String
    $title: String
    $postPrivate: Boolean
    $files: [String!]
    $postRatio: [Float!]
    $toDoId: String
    $goalId: String
  ) {
    editPost(
      id: $id
      caption: $caption
      title: $title
      postPrivate: $postPrivate
      files: $files
      postRatio: $postRatio
      toDoId: $toDoId
      goalId: $goalId
    ) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String!, $goalId: String!, $toDoId: String!) {
    deletePost(id: $id, goalId: $goalId, toDoId: $toDoId) {
      id
    }
  }
`;

export const UPLOAD_HISTORY_POST = gql`
  mutation historyUpload(
    $caption: String!
    $files: [String!]
    $postRatio: [Float!]
    $title: String!
    $assortment: String!
    $goalHistoryId: String!
    $postPrivate: Boolean!
    $goalId: String!
    $toDoId: String
  ) {
    historyUpload(
      caption: $caption
      files: $files
      postRatio: $postRatio
      title: $title
      assortment: $assortment
      goalHistoryId: $goalHistoryId
      postPrivate: $postPrivate
      goalId: $goalId
      toDoId: $toDoId
    ) {
      id
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
        categoryId
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
        sale
      }
      posts {
        id
        title
      }
    }
  }
`;

export const SEE_COMMENT = gql`
  query seeComments($postId: String!) {
    seeComments(postId: $postId) {
      id
      text
      user {
        id
        nickname
        avatar
      }
      repply {
        id
        text
        user {
          id
          avatar
          nickname
        }
        comment {
          id
        }
        createdAt
        updatedAt
      }

      createdAt
      updatedAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $postId: String!) {
    addComment(text: $text, postId: $postId) {
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
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: String!, $text: String!) {
    updateComment(commentId: $commentId, text: $text)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`;

export const TOGGLE_LIKES = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const SEE_LIKES = gql`
  query seeLike($postId: String!) {
    seeLike(postId: $postId) {
      id
      nickname
      avatar
    }
  }
`;

export const CREATE_REPPLY = gql`
  mutation createRepply($text: String!, $commentId: String!, $postId: String!) {
    createRepply(text: $text, commentId: $commentId, postId: $postId) {
      id
      text
      user {
        id
        avatar
        nickname
      }
      comment {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_REPPLY = gql`
  mutation editRepply($repplyId: String!, $text: String!) {
    editRepply(repplyId: $repplyId, text: $text)
  }
`;

export const DELETE_REPPLY = gql`
  mutation deleteRepply($repplyId: String!) {
    deleteRepply(repplyId: $repplyId)
  }
`;

export const CREATE_GOAL_COMMENT = gql`
  mutation createGoalComment($text: String!, $goalId: String!) {
    createGoalComment(text: $text, goalId: $goalId) {
      id
    }
  }
`;

export const SEE_GOAL_COMMENT = gql`
  query seeGoalComment($goalId: String!, $pageNumber: Int!, $items: Int!) {
    seeGoalComment(goalId: $goalId, pageNumber: $pageNumber, items: $items) {
      id
      text
      user {
        id
        nickname
        avatar
      }
      goal {
        id
      }
      repply {
        id
        text
        user {
          id
          avatar
          nickname
        }
        comment {
          id
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const SEE_GOAL_COMMENT_REPPLY_COUNT = gql`
  query goalCommentCount($goalId: String!) {
    goalCommentCount(goalId: $goalId) {
      goalCommentsCount
      goalReppliesCount
    }
  }
`;

export const DELETE_GOAL_COMMENT = gql`
  mutation deleteGoalComment($commentId: String!) {
    deleteGoalComment(commentId: $commentId)
  }
`;

export const EDIT_GOAL_COMMENT = gql`
  mutation editGoalComment($commentId: String!, $text: String!) {
    editGoalComment(commentId: $commentId, text: $text)
  }
`;

export const CREATE_GOAL_REPPLY = gql`
  mutation createGoalRepply(
    $text: String!
    $commentId: String!
    $goalId: String!
  ) {
    createGoalRepply(text: $text, commentId: $commentId, goalId: $goalId) {
      id
      text
      user {
        id
        avatar
        nickname
      }
      comment {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_GOAL_REPPLY = gql`
  mutation deleteGoalRepply($repplyId: String!) {
    deleteGoalRepply(repplyId: $repplyId)
  }
`;

export const EDIT_GOAL_REPPLY = gql`
  mutation editGoalRepply($repplyId: String!, $text: String!) {
    editGoalRepply(repplyId: $repplyId, text: $text)
  }
`;

export const GOAL_VIEW_COUNTS = gql`
  mutation goalViewCounts($goalId: String!) {
    goalViewCounts(goalId: $goalId) {
      viewCounts
    }
  }
`;

export const SEE_MY_GOAL = gql`
  {
    seeMyGoalList {
      id
      goalText
      keyWord
      cardPrivate
      startDate
      dDay
      sale
      complete
      detailPlans {
        id
        stagePlanText
        startingDay
        endDay
      }
    }
  }
`;

export const GOAL_SALE_CONFIRM = gql`
  query seeGoalConfirm($userId: String!) {
    seeGoalConfirm(userId: $userId) {
      id
      user {
        id
        avatar
        nickname
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
      detailPlans {
        id
      }
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

      category
      viewCounts
      goalCommentsCount
      goalReppliesCount
      detailCategory
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

export const SALE_CONFIRM = gql`
  mutation saleConfirm(
    $goalId: String!
    $saleConfirm: String!
    $saleRejectText: String
  ) {
    saleConfirm(
      goalId: $goalId
      saleConfirm: $saleConfirm
      saleRejectText: $saleRejectText
    )
  }
`;

export const SEE_SALE_INFO = gql`
  query seeSaleInfo($goalId: String!) {
    seeSaleInfo(goalId: $goalId) {
      sale
      salePrice
      target
      mainImage
      introduceText
      otherCosts
      otherCostsDesc
      saleRejectText
      category
      detailCategory
    }
  }
`;

export const SEE_TODO_POSTS = gql`
  query seeToDoPost($toDoId: String!) {
    seeToDoPost(toDoId: $toDoId) {
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
        avatar
        nickname
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
