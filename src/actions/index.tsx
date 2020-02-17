import { TasksInterface, TaskStatus } from "../Interfaces";
import moment from "moment";
import { ReducerActions } from "../reducers";

// let nextTodoId = 0;
export const addTask = ({ title, desc, date }: TasksInterface) => ({
  type: ReducerActions.ADD_TASK,
  newState: {
    title,
    desc,
    date,
    createdDate: moment("20200209", "YYYYMMDD"),
    status: TaskStatus.active
  }
});

export const editTask = (newState: TasksInterface) => ({
  type: ReducerActions.EDIT,
  newState
});

export const deleteTask = ({ id }: TasksInterface) => ({
  type: ReducerActions.DELETE,
  id
});

export const toggleTask = ({ id }: TasksInterface, newStatus: TaskStatus) => ({
  type: ReducerActions.TOGGLE,
  id,
  newStatus
});

export const setVisibilityFilter = (filter: string) => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

export enum VisibilityFilters {
  SHOW_ACTIVE = "SHOW_ACTIVE",
  SHOW_COMPLETED = "SHOW_COMPLETED",
  SHOW_CANCELED = "SHOW_CANCELED",
  SHOW_ALL = "SHOW_ALL"
}

export enum VisibilityFiltersByDate {
  SHOW_TODAY = "SHOW_TODAY",
  SHOW_TOMORROW = "SHOW_TOMORROW",
  SHOW_WEEK = "SHOW_WEEK",
  SHOW_NEXTWEEK = "SHOW_NEXTWEEK",
  SHOW_MONTH = "SHOW_MONTH",
  SHOW_NEXTMONT = "SHOW_NEXTMONT",
  SHOW_ALL = "SHOW_ALL"
}
