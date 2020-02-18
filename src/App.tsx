import React, { useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import { TaskInterface, TaskStatus } from "./Interfaces";
import Main from "./modules/Main/Index";
import Header from "./modules/Header/Index";
import { colors } from "colors";
import {
  addTask,
  deleteTask,
  editTask,
  setFilterByDate,
  setFilterByStatus,
  toggleTask
} from "./actions";
import { useStore } from "react-redux";
import { SelectDates, SelectStatus } from "./reducers/visibilityFiltersReducer";

require("moment/locale/ru");

function getFilteredTasksByDate(tasks: TaskInterface[], filter: SelectDates) {
  const dateFilterFunctionMap = {
    [SelectDates.SHOW_TODAY](taskDate: Moment) {
      return taskDate.isBetween(moment().subtract(1, "day"), moment());
    },
    [SelectDates.SHOW_TOMORROW](taskDate: Moment) {
      return taskDate.isBetween(moment(), moment().add(1, "days"));
    },
    [SelectDates.SHOW_WEEK](taskDate: Moment) {
      return taskDate.isBetween(
        moment().subtract(1, "day"),
        moment().add(7, "days"),
        "days"
      );
    },
    [SelectDates.SHOW_NEXT_WEEK](taskDate: Moment) {
      return taskDate.isBetween(
        moment().add(6, "days"),
        moment().add(2, "week"),
        "days"
      );
    },
    [SelectDates.SHOW_MONTH](taskDate: Moment) {
      return taskDate.isBetween(
        moment().subtract(1, "day"),
        moment()
          .add(1, "month")
          .add(1, "day"),
        "days"
      );
    },
    [SelectDates.SHOW_NEXT_MONTH](taskDate: Moment) {
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
    [SelectDates.SHOW_All](taskDate: Moment) {
      return true;
    }
  };

  return tasks.filter(task => {
    if (dateFilterFunctionMap[filter](task.date)) {
      return task;
    }
  });
}

function getFilteredTasksByStatus(
  tasks: TaskInterface[],
  filter: SelectStatus
): TaskInterface[] {
  switch (filter) {
    case SelectStatus.SHOW_ACTIVE:
      return tasks.filter(task =>
        task.status === TaskStatus.active ? task : null
      );
    case SelectStatus.SHOW_CANCELED:
      return tasks.filter(task =>
        task.status === TaskStatus.canceled ? task : null
      );
    case SelectStatus.SHOW_FINISHED:
      return tasks.filter(task =>
        task.status === TaskStatus.finished ? task : null
      );
    case SelectStatus.SHOW_ALL:
      return tasks;
  }
}

function App(props: { className?: string }) {
  const store = useStore();
  const tasks = store.getState().tasks;
  const visibilityFilters = store.getState().visibilityFilters;
  const dispatch = store.dispatch;
  const [isRerender, setIsRerender] = useState<boolean>(false);
  const sortedByDateTaskArr = [...tasks].sort((a, b) => a.date.diff(b.date));
  const filteredTasksByStatus = getFilteredTasksByStatus(
    sortedByDateTaskArr,
    visibilityFilters.filterByStatus
  );
  const filteredTasksByDate = getFilteredTasksByDate(
    filteredTasksByStatus,
    visibilityFilters.filterByDate
  );

  return (
    <div className={props.className}>
      <Header
        currentDate={visibilityFilters.filterByDate}
        currentStatus={visibilityFilters.filterByStatus}
        setFilterByDate={(filter: string) => {
          dispatch(setFilterByDate(filter));
          setIsRerender(!isRerender);
        }}
        setFilterByStatus={(filter: string) => {
          dispatch(setFilterByStatus(filter));
          setIsRerender(!isRerender);
        }}
      />
      <Main
        sortedTaskArr={filteredTasksByDate}
        addNewTask={(title: string, desc: string, date: Moment) => {
          dispatch(addTask(title, desc, date));
          setIsRerender(!isRerender);
        }}
        toggleTask={(id: number, newStatus: TaskStatus) => {
          dispatch(toggleTask(id, newStatus));
          setIsRerender(!isRerender);
        }}
        editTask={(id: number, title: string, desc: string, date: Moment) => {
          dispatch(editTask(id, title, desc, date));
          setIsRerender(!isRerender);
        }}
        deleteTask={(id: number) => {
          dispatch(deleteTask(id));
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
