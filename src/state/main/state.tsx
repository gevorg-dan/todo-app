import { StoreContext } from "state/store";

import {
  addTask,
  editTask,
  toggleTaskStatus,
  deleteTask,
  TasksStateInterface
} from "./actions";

import { TASKS } from "tasksData";

export interface State extends TasksStateInterface {}

const initialState: State = {
  loading: false,
  error: null,
  tasks: TASKS
};

export const mainModule = new StoreContext(initialState, {
  addTask,
  editTask,
  toggleTaskStatus,
  deleteTask
});
