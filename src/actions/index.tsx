import { TaskInterface, TaskStatus } from "../Interfaces";
import moment, { Moment } from "moment";
import { ActionsForTasks } from "../reducers/tasks";
import {
  ActionsForFilters,
  SelectDates,
  SelectStatus
} from "../reducers/visibilityFiltersReducer";

export const addTask = (title: string, desc: string, date: Moment) => ({
  type: ActionsForTasks.ADD_TASK,
  title,
  desc,
  date,
  createdDate: moment("20200209", "YYYYMMDD"),
  status: TaskStatus.active
});

export const editTask = (
  id: number,
  title: string,
  desc: string,
  date: Moment
) => ({
  type: ActionsForTasks.EDIT,
  id,
  title,
  desc,
  date
});

export const deleteTask = (id: number) => ({
  type: ActionsForTasks.DELETE,
  id
});

export const toggleTask = (id: number, newStatus: TaskStatus) => ({
  type: ActionsForTasks.TOGGLE,
  id,
  newStatus
});

export const setFilterByStatus = (filter: string) => ({
  type: ActionsForFilters.SET_FILTER_BY_STATUS,
  filter: +filter
});

export const setFilterByDate = (filter: string) => ({
  type: ActionsForFilters.SET_FILTER_BY_DATE,
  filter: +filter
});
