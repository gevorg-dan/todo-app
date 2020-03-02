import { StoreContext } from "state/store";

import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  TasksStateInterface
} from "./requests";

export interface State extends TasksStateInterface {}

const initialState: State = {
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  tasks: []
};

export const mainModule = new StoreContext(initialState, {
  getTasks,
  createTask,
  updateTask,
  deleteTask
});
