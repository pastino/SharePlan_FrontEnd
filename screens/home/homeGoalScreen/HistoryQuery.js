import gql from "graphql-tag";

export const DOWN_LOAD = gql`
  mutation download(
    $id: String!
    $toDoList: [String!]!
    $color: [String!]!
    $startDate: [String!]!
    $alrams: [[Int]]
    $alarmId: [[Int]]
    $startTime: [String]
    $endDate: [String!]!
    $endTime: [String]
    $memo: [String]
    $goalId: String
    $maxEndDate: String
    $goalText: String
    $goalStartDate: String
    $dDay: String
    $category: String
    $detailCategory: String
    $keyWord: String
    $cardColor: String
    $cardPrivate: Boolean
    $originToDoId: [String]
  ) {
    download(
      id: $id
      toDoList: $toDoList
      color: $color
      startDate: $startDate
      alrams: $alrams
      alarmId: $alarmId
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
      memo: $memo
      goalId: $goalId
      maxEndDate: $maxEndDate
      goalText: $goalText
      goalStartDate: $goalStartDate
      dDay: $dDay
      category: $category
      detailCategory: $detailCategory
      keyWord: $keyWord
      cardColor: $cardColor
      cardPrivate: $cardPrivate
      originToDoId: $originToDoId
    )
  }
`;

export const DOWN_LOAD_VIEW = gql`
  subscription downloadPercentage {
    downloadPercentage {
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
      goal {
        id
        goalText
      }
    }
  }
`;
