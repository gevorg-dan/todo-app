import React, { useEffect, useMemo, useReducer, useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import { TasksInterface, TaskStatus } from "./Interfaces";
import Main from "./modules/Main/Index";
import Header from "./modules/Header/Index";
import { colors } from "colors";
import { SelectDates, SelectStatus } from "./primitives/Select";
import { ReducerActions } from "./reducers";
import { CombinedState, createStore, Store } from "redux";
import { addTask, editTask, toggleTask } from "./actions";
import rootReducer from "./reducers";
import { useStore } from "react-redux";
require("moment/locale/ru");

function filterByDate(tasksArr: TasksInterface[], filterValue: SelectDates) {
  const dateFilterFunctionTable = {
    [SelectDates.today](taskDate: Moment) {
      return taskDate.isBetween(moment().subtract(1, "day"), moment());
    },
    [SelectDates.tomorrow](taskDate: Moment) {
      return taskDate.isBetween(moment(), moment().add(1, "days"));
    },
    [SelectDates.week](taskDate: Moment) {
      return taskDate.isBetween(
        moment().subtract(1, "day"),
        moment().add(7, "days"),
        "days"
      );
    },
    [SelectDates.nextWeek](taskDate: Moment) {
      return taskDate.isBetween(
        moment().add(6, "days"),
        moment().add(2, "week"),
        "days"
      );
    },
    [SelectDates.month](taskDate: Moment) {
      return taskDate.isBetween(
        moment().subtract(1, "day"),
        moment()
          .add(1, "month")
          .add(1, "day"),
        "days"
      );
    },
    [SelectDates.nextMonth](taskDate: Moment) {
      return taskDate.isBetween(
        moment()
          .add(1, "month")
          .subtract(1, "day"),
        moment()
          .add(2, "month")
          .add(1, "day"),
        "days"
      );
    },
    [SelectDates.all](taskDate: Moment) {
      return true;
    }
  };

  return tasksArr.filter(task => {
    if (dateFilterFunctionTable[filterValue](task.date)) {
      return task;
    }
  });
}

function App(props: { className?: string }) {
  const store = useStore();
  const tasks = store.getState().tasks;
  const dispatch = store.dispatch;
  const [isRerender, setIsRerender] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(SelectDates.all);
  const [selectedStatus, setSelectedStatus] = useState(SelectStatus.active);
  const sortedByDateTaskArr = [...tasks].sort((a, b) => a.date.diff(b.date));
  console.log(tasks);
  // TODO
  const filteredTasksByStatus: TasksInterface[] = sortedByDateTaskArr.filter(
    task => {
      const statusFilterTable = {
        [SelectStatus.active]: TaskStatus.active,
        [SelectStatus.finished]: TaskStatus.finished,
        [SelectStatus.canceled]: TaskStatus.canceled,
        [SelectStatus.all]: task.status
      };

      if (task.status === statusFilterTable[selectedStatus]) {
        return task;
      }
    }
  );
  const filteredTasksByDate: TasksInterface[] = filterByDate(
    filteredTasksByStatus,
    selectedDate
  );

  return (
    <div className={props.className}>
      {/*<Header*/}
      {/*  selectedDate={selectedDate}*/}
      {/*  setSelectedDate={(newDate: SelectDates) => setSelectedDate(newDate)}*/}
      {/*  selectedStatus={selectedStatus}*/}
      {/*  setSelectedStatus={(newStatus: SelectStatus) =>*/}
      {/*    setSelectedStatus(newStatus)*/}
      {/*  }*/}
      {/*/>*/}
      <Main
        sortedTaskArr={sortedByDateTaskArr}
        addNewTask={(newTask: TasksInterface) => {
          dispatch(addTask(newTask));
          setIsRerender(!isRerender);
        }}
        toggleTask={(task: TasksInterface, newStatus: TaskStatus) => {
          dispatch(toggleTask(task, newStatus));
          setIsRerender(!isRerender);
        }}
        editTask={(updatedTask: TasksInterface) => {
          dispatch(editTask(updatedTask));
          setIsRerender(!isRerender);
        }}
        deleteTask={(id: number) => {
          dispatch({
            type: ReducerActions.DELETE,
            id
          });
          setIsRerender(!isRerender);
        }}
      />
    </div>
  );
}

export default styled(App)`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px 150px;

  textarea {
    resize: none;
    width: 55%;
    color: ${colors.dark};
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    padding: 10px;
    background-color: inherit;
    overflow: hidden;
    height: 95px;
    :hover {
      border-color: ${colors.darkGray};
    }
    :focus {
      padding: 9px;
      outline: none;
      border: 2px solid rgb(25, 118, 210);
      box-sizing: border-box;
    }
  }

  input[type="date"] {
    position: relative;
    border: none;
    border-bottom: 1px solid ${colors.gray};
    padding: 18px 0 3px;
    transition: all 0.4s ease;
    background-color: inherit;
    :after {
      position: absolute;
      content: "Выберите дату";
      color: ${colors.gray};
      font-size: 0.63rem;
      left: 0;
      top: 0;
    }
    :hover {
      border-bottom: 2px solid ${colors.darkGray};
      padding-bottom: 2px;
    }
    :focus {
      outline: none;
      padding-bottom: 2px;
      border-bottom: 2px solid rgb(25, 118, 210);
      :after {
        color: rgb(25, 118, 210);
      }
    }
  }
`;
