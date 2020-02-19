import React from "react";
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
import { connect } from "react-redux";
import {
  FiltersActions,
  SelectDates,
  SelectStatus,
  StateForFilterInterface
} from "./reducers/visibilityFiltersReducer";
import { TasksActions } from "./reducers/tasksReducer";

require("moment/locale/ru");

const dateFilterMap = {
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

function getFilteredTasksByDate(
  tasks: TaskInterface[],
  filter: SelectDates
): TaskInterface[] {
  return tasks.filter(task => {
    return dateFilterMap[filter](task.date);
  });
}
function getFilteredTasksByStatus(
  tasks: TaskInterface[],
  filter: SelectStatus
): TaskInterface[] {
  switch (filter) {
    case SelectStatus.SHOW_ACTIVE:
      return tasks.filter(task => task.status === TaskStatus.active);
    case SelectStatus.SHOW_CANCELED:
      return tasks.filter(task => task.status === TaskStatus.canceled);
    case SelectStatus.SHOW_FINISHED:
      return tasks.filter(task => task.status === TaskStatus.finished);
    case SelectStatus.SHOW_ALL:
      return tasks;
  }
}

function App(props: {
  tasks: TaskInterface[];
  visibilityFilters: StateForFilterInterface;
  className?: string;
  dispatch: (action: any) => any;
}) {
  const { tasks, visibilityFilters, dispatch, className } = props;
  const visibilityTasks = getFilteredTasksByDate(
    getFilteredTasksByStatus(tasks, visibilityFilters.filterByStatus),
    visibilityFilters.filterByDate
  );

  return (
    <div className={className}>
      <Header
        currentDate={visibilityFilters.filterByDate}
        currentStatus={visibilityFilters.filterByStatus}
        setFilterByDate={(filter: string) => {
          dispatch(setFilterByDate(filter));
        }}
        setFilterByStatus={(filter: string) => {
          dispatch(setFilterByStatus(filter));
        }}
      />
      <Main
        sortedTaskArr={visibilityTasks}
        addNewTask={(title: string, desc: string, date: Moment) => {
          dispatch(addTask(title, desc, date));
        }}
        toggleTask={(id: number, newStatus: TaskStatus) => {
          dispatch(toggleTask(id, newStatus));
        }}
        editTask={(id: number, title: string, desc: string, date: Moment) => {
          dispatch(editTask(id, title, desc, date));
        }}
        deleteTask={(id: number) => {
          dispatch(deleteTask(id));
        }}
      />
    </div>
  );
}

const StyledApp = styled(App)`
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

const mapStateToProps = (state: {
  tasks: TaskInterface[];
  visibilityFilters: StateForFilterInterface;
}) => {
  return {
    tasks: [...state.tasks].sort((a, b) => a.date.diff(b.date)),
    visibilityFilters: state.visibilityFilters
  };
};

const mapDispatchToProps = (
  dispatch: (action: TasksActions | FiltersActions) => any
) => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StyledApp);
