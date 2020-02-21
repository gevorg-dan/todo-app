import { TaskStatus } from "../Interfaces";
import { Moment } from "moment";
import { ActionsForTasks } from "../reducers/tasksReducer";
import {
  ActionsForFilters,
  SelectDates,
  SelectStatus
} from "../reducers/visibilityFiltersReducer";

export const addTaskAction = (title: string, desc: string, date: Moment) => ({
  type: ActionsForTasks.ADD_TASK,
  payload: { title, desc, date }
});

export const editTaskAction = (
  id: number,
  title: string,
  desc: string,
  date: Moment
) => ({
  type: ActionsForTasks.EDIT,
  payload: { id, title, desc, date }
});

export const deleteTaskAction = (id: number) => ({
  type: ActionsForTasks.DELETE,
  payload: { id }
});

export const toggleTaskStatusAction = (id: number, newStatus: TaskStatus) => ({
  type: ActionsForTasks.TOGGLE_STATUS,
  payload: { id, newStatus }
});

export const setFilterByStatusAction = (filter: SelectStatus) => ({
  type: ActionsForFilters.SET_FILTER_BY_STATUS,
  payload: { filter }
});

export const setFilterByDateAction = (filter: SelectDates) => ({
  type: ActionsForFilters.SET_FILTER_BY_DATE,
  payload: { filter }
});
