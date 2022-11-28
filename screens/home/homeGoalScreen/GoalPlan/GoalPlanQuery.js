import { gql } from "apollo-boost";

export const GOAL_STAGE_PLAN_CREATE = gql`
  mutation StagePlan(
    $stagePlanText: [String!]!
    $startingDay: [String!]!
    $endDay: [String!]!
    $goalId: String!
  ) {
    StagePlan(
      stagePlanText: $stagePlanText
      startingDay: $startingDay
      endDay: $endDay
      goalId: $goalId
    )
  }
`;

export const SEE_GOAL_STAGE_PLAN = gql`
  query seePlan($goalId: String!) {
    seePlan(goalId: $goalId) {
      detailPlans {
        id
        stagePlanText
        startingDay
        endDay
      }
    }
  }
`;

export const CREATE_TODO_PLAN = gql`
  mutation toDoPlanCreate(
    $goalId: String!
    $monthDay: [String!]!
    $toDoList: String!
    $importEvent: String!
  ) {
    toDoPlanCreate(
      goalId: $goalId
      monthDay: $monthDay
      toDoList: $toDoList
      importEvent: $importEvent
    ) {
      id
      monthDay
      toDoList
      complete
      importEvent
      index
      goal {
        id
      }
    }
  }
`;

export const SEE_GOAL_TODO_PLAN = gql`
  query seePlanToDo($goalId: String!) {
    seePlanToDo(goalId: $goalId) {
      id
      monthDay
      toDoList
      complete
      importEvent
      index
      goal {
        id
      }
    }
  }
`;

export const SEE_GOAL_FULL_STAGE_PLAN = gql`
  {
    seeFullPlan {
      id
      goalText
      dDay
      keyWord
      createdAt
      detailPlans {
        id
        startingDay
        endDay
        stagePlanText
      }
    }
  }
`;

export const EDIT_GOAL_STAGE_PLAN = gql`
  mutation modifyStagePlan(
    $goalId: String
    $stagePlanText: [String]!
    $startingDay: [String]!
    $endDay: [String]!
    $updatePlanNumber: Int
    $stagePlan: Int
    $updatePlanId: [String!]
    $deletePlanId: [String!]
    $modifyDivision: String!
  ) {
    modifyStagePlan(
      goalId: $goalId
      stagePlanText: $stagePlanText
      startingDay: $startingDay
      endDay: $endDay
      updatePlanNumber: $updatePlanNumber
      stagePlan: $stagePlan
      updatePlanId: $updatePlanId
      deletePlanId: $deletePlanId
      modifyDivision: $modifyDivision
    )
  }
`;
