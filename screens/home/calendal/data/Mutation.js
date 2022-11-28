import { useMutation } from "react-apollo-hooks";
import {
  EDIT_TODO,
  DELETE_TODO,
  CREATE_DAYTODO,
  SEE_DAYTODO,
  SCHEDULE_CHANGE_TODO,
} from "../../HomeQueries";

export const CreateDayToDoMutation = ({
  value,
  data,
  goalId,
  showDate,
  showTime,
  ednShowDate,
  endShowTime,
  selectedColor,
  alarmTimeArray,
  memoValue,
}) => {
  // const monthDayToDoList =
  //   data &&
  //   data.dayToDoes &&
  //   data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay);

  // const biggestIndex = monthDayToDoList.reduce((prev, cur) =>
  //   prev.index > cur.index ? prev : cur
  // );

  // console.log(biggestIndex);

  const [createDayToDoMutation] = useMutation(CREATE_DAYTODO, {
    variables: {
      toDoList: value,
      color: selectedColor,
      startDate: showDate,
      startTime: showTime ? showTime : null,
      endDate: ednShowDate,
      endTime: endShowTime ? endShowTime : null,
      alrams: alarmTimeArray.length > 0 ? alarmTimeArray : null,
      memo: memoValue ? memoValue : null,
      goal: goalId ? goalId : null,
    },
    update: (proxy, { data: { createDayToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      data && data.dayToDoes && data.dayToDoes.push(createDayToDo);
      proxy.writeQuery({ query: SEE_DAYTODO, data });
    },
    optimisticResponse: {
      createDayToDo: {
        __typename: "DayToDo",
        id: Math.random().toString(),
        toDoList: value,
        color: selectedColor,
        complete: false,
        startDate: showDate,
        startTime: showTime ? showTime : null,
        endDate: ednShowDate,
        endTime: endShowTime ? endShowTime : null,
        alrams: alarmTimeArray.length > 0 ? alarmTimeArray : null,
        memo: memoValue ? memoValue : null,
        goal: goalId ? goalId : null,
        index: 1,
        // data &&
        // data.dayToDoes &&
        // data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay) &&
        // data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay).length !==
        //   0
        //   ? data &&
        //     data.dayToDoes &&
        //     data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay) &&
        //     data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay) &&
        //     data.dayToDoes.filter((toDo) => toDo.monthDay === monthDay)
        //       .length + 1
        //   : 1,
        user: {
          __typename: "User",
          id: Math.random().toString(),
        },
      },
    },
  });
  return createDayToDoMutation;
};

export const EditToDoListMutation = ({
  isCurrentList,
  value,
  isImportWhether,
  monthDay,
  data,
}) => {
  const [editToDoListMutation] = useMutation(EDIT_TODO, {
    variables: {
      id: isCurrentList.id,
      toDoList: value,
      importEvent: isImportWhether,
      complete: false,
    },
    update: (proxy, { data: { editToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      const newToDo = data && data.dayToDoes;
      newToDo.splice(
        newToDo.findIndex((obj) => obj.id === isCurrentList.id),
        1,
        editToDo
      );
      proxy.writeQuery({
        query: SEE_DAYTODO,
        data,
      });
    },
    optimisticResponse: {
      editToDo: {
        __typename: "DayToDo",
        id: isCurrentList.id,
        toDoList: value,
        importEvent: isImportWhether,
        complete: false,
        monthDay,
        goal:
          data &&
          data.dayToDoes &&
          data &&
          data.dayToDoes.filter((toDo) => toDo.id === isCurrentList.id) &&
          data &&
          data.dayToDoes.filter((toDo) => toDo.id === isCurrentList.id)[0] &&
          data &&
          data.dayToDoes.filter((toDo) => toDo.id === isCurrentList.id)[0]
            .goal === null
            ? null
            : {
                __typename: "Goal",
                id:
                  data &&
                  data.dayToDoes &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  ) &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0] &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal.id,
                goalText:
                  data &&
                  data.dayToDoes &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  ) &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0] &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal.goalText,
              },

        index: isCurrentList.index,
        user: {
          __typename: "User",
          id: Math.random().toString(),
        },
      },
    },
  });
  return editToDoListMutation;
};

export const DeleteToDoMutation = ({ isCurrentList }) => {
  const [deleteToDoMutation] = useMutation(DELETE_TODO, {
    variables: {
      id: isCurrentList.id,
    },
    update: (proxy, { data: { deleteToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      data &&
        data.dayToDoes &&
        data.dayToDoes.splice(
          data &&
            data.dayToDoes &&
            data.dayToDoes.findIndex((obj) => obj.id === isCurrentList.id),
          1
        );
      proxy.writeQuery({
        query: SEE_DAYTODO,
        data,
      });
    },
    optimisticResponse: {
      deleteToDo: {
        __typename: "DayToDo",
        id: isCurrentList.id,
      },
    },
  });
  return deleteToDoMutation;
};

export const ScheduleChangeToDoMutation = ({
  isCurrentList,
  changeMonthDay,
  isImportWhether,
  data,
}) => {
  const [scheduleChangeToDoMutation] = useMutation(SCHEDULE_CHANGE_TODO, {
    variables: {
      dayToDoId: isCurrentList.id,
      monthDay: changeMonthDay,
    },
    update: (proxy, { data: { scheduleChangeToDo } }) => {
      const data = proxy.readQuery({ query: SEE_DAYTODO });
      const newToDo = data && data.dayToDoes;
      newToDo.splice(
        newToDo.findIndex((obj) => obj.id === isCurrentList.id),
        1,
        scheduleChangeToDo
      );
      proxy.writeQuery({
        query: SEE_DAYTODO,
        data,
      });
    },
    optimisticResponse: {
      scheduleChangeToDo: {
        __typename: "DayToDo",
        id: isCurrentList.id,
        user: {
          __typename: "User",
          id: Math.random().toString(),
        },
        monthDay: changeMonthDay,
        toDoList: isCurrentList.toDoList,
        importEvent: isImportWhether,
        complete: false,
        goal:
          data &&
          data.dayToDoes &&
          data &&
          data.dayToDoes.filter((toDo) => toDo.id === isCurrentList.id) &&
          data &&
          data.dayToDoes.filter((toDo) => toDo.id === isCurrentList.id)[0] &&
          data &&
          data.dayToDoes.filter((toDo) => toDo.id === isCurrentList.id)[0]
            .goal === null
            ? null
            : {
                __typename: "Goal",
                id:
                  data &&
                  data.dayToDoes &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  ) &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0] &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal.id,
                goalText:
                  data &&
                  data.dayToDoes &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  ) &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0] &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal &&
                  data &&
                  data.dayToDoes.filter(
                    (toDo) => toDo.id === isCurrentList.id
                  )[0].goal.goalText,
              },
        index:
          data &&
          data.dayToDoes &&
          data.dayToDoes.filter((toDo) => toDo.monthDay === changeMonthDay) &&
          data.dayToDoes.filter((toDo) => toDo.monthDay === changeMonthDay)
            .length + 1,
      },
    },
  });
  return scheduleChangeToDoMutation;
};
