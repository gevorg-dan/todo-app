import React, { useMemo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment, { Moment } from "moment";

import Header from "./modules/Header/Index";
import Main from "./modules/Main/Index";

import { colors } from "colors";

import {
  addTaskAction,
  deleteTaskAction,
  editTaskAction,
  setFilterByDateAction,
  setFilterByStatusAction,
  toggleTaskStatusAction
} from "./state/actions";
import {
  SelectDates,
  SelectStatus,
  StateForFilterInterface
} from "./state/reducers/visibilityFiltersReducer";

import { TaskInterface, TaskStatus } from "./Interfaces";
import { Dispatch } from "redux";

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
  [SelectDates.SHOW_All]() {
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
  className?: string;
  tasks: TaskInterface[];
  visibilityFilters: StateForFilterInterface;
  setFilterByDate: (filter: SelectDates) => void;
  setFilterByStatus: (filter: SelectStatus) => void;
  addNewTask: (title: string, desc: string, date: Moment) => void;
  toggleTaskStatus: (id: number, newStatus: TaskStatus) => void;
  editTask: (id: number, title: string, desc: string, date: Moment) => void;
  deleteTask: (id: number) => void;
}) {
  const {
    className,
    tasks,
    visibilityFilters,
    setFilterByDate,
    setFilterByStatus,
    addNewTask,
    toggleTaskStatus,
    editTask,
    deleteTask
  } = props;

  const visibilityTasksMemo = useMemo(
    () =>
      getFilteredTasksByDate(
        getFilteredTasksByStatus(tasks, visibilityFilters.filterByStatus),
        visibilityFilters.filterByDate
      ),
    [tasks]
  );

  return (
    <div className={className}>
      <Header
        currentDate={visibilityFilters.filterByDate}
        currentStatus={visibilityFilters.filterByStatus}
        setFilterByDate={setFilterByDate}
        setFilterByStatus={setFilterByStatus}
      />
      <Main
        tasks={visibilityTasksMemo}
        addNewTask={addNewTask}
        toggleTaskStatus={toggleTaskStatus}
        editTask={editTask}
        deleteTask={deleteTask}
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
`;

const mapStateToProps = (state: {
  tasks: TaskInterface[];
  visibilityFilters: StateForFilterInterface;
}) => {
  return {
    tasks: [...state.tasks],
    visibilityFilters: state.visibilityFilters
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilterByDate: (filter: SelectDates) =>
    dispatch(setFilterByDateAction(filter)),
  setFilterByStatus: (filter: SelectStatus) =>
    dispatch(setFilterByStatusAction(filter)),
  addNewTask: (title: string, desc: string, date: Moment) =>
    dispatch(addTaskAction(title, desc, date)),
  toggleTaskStatus: (id: number, newStatus: TaskStatus) =>
    dispatch(toggleTaskStatusAction(id, newStatus)),
  editTask: (id: number, title: string, desc: string, date: Moment) =>
    dispatch(editTaskAction(id, title, desc, date)),
  deleteTask: (id: number) => dispatch(deleteTaskAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledApp);
