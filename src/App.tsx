import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";

import Header from "./modules/Header/Index";
import Main from "./modules/Main/Index";

import { headerModule } from "./state/header/state";
import { mainModule } from "./state/main/state";
import { SelectDates, SelectStatus } from "./state/header/actions";

import { StoreContext } from "./state/store";

import { TaskInterface, TaskStatus } from "./Interfaces";

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

function App(props: { className?: string }) {
  const { className } = props;
  const tasksState = mainModule.getState();
  const filtersState = headerModule.getState();
  const {
    tasks,
    loading,
    createLoading,
    deleteLoading,
    updateLoading,
    getTasks,
    createTask,
    deleteTask,
    updateTask
  } = tasksState;
  const {
    visibilityFilters,
    setFilterByDate,
    setFilterByStatus
  } = filtersState;

  useEffect(() => getTasks(), []);
  console.log(tasksState);

  const visibilityTasksMemo = useMemo(
    () =>
      getFilteredTasksByDate(
        getFilteredTasksByStatus(tasks, visibilityFilters.filterByStatus),
        visibilityFilters.filterByDate
      ),
    [tasks, visibilityFilters.filterByDate, visibilityFilters.filterByStatus]
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
        createLoading={createLoading}
        deleteLoading={deleteLoading}
        updateLoading={updateLoading}
        tasksLoading={loading}
        createTask={createTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

const WrappedApp = StoreContext.connectContexts(
  [
    [mainModule, "main"],
    [headerModule, "header"]
  ],
  App
);

export default styled(WrappedApp)`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px 150px;
`;
