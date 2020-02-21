import { TaskInterface, TaskStatus } from "../Interfaces";
import moment, { Moment } from "moment";
import { TASKS } from "tasksData";
import { Action } from "redux";

export enum ActionsForTasks {
  DELETE,
  EDIT,
  TOGGLE_STATUS,
  ADD_TASK
}

export type TasksActions =
  | AddTaskActionType
  | DeleteTaskActionType
  | ToggleTaskActionType
  | EditTaskActionType;

type AddTaskActionType = {
  type: ActionsForTasks.ADD_TASK;
  payload: { title: string; desc: string; date: Moment };
};
type DeleteTaskActionType = {
  type: ActionsForTasks.DELETE;
  payload: { id: number };
};
type ToggleTaskActionType = {
  type: ActionsForTasks.TOGGLE_STATUS;
  payload: { id: number; newStatus: TaskStatus };
};
type EditTaskActionType = {
  type: ActionsForTasks.EDIT;
  payload: {
    id: number;
    title: string;
    desc: string;
    date: Moment;
  };
};

const tasksActionsMap = {
  [ActionsForTasks.ADD_TASK]: (
    state: TaskInterface[],
    action: AddTaskActionType
  ) => {
    const { title, desc, date } = action.payload;
    const id = +new Date();
    return [
      ...state,
      {
        id,
        title,
        desc,
        date,
        createdDate: moment(),
        status: TaskStatus.active
      }
    ];
  },
  [ActionsForTasks.EDIT]: (
    state: TaskInterface[],
    action: EditTaskActionType
  ) => {
    const { id, title, desc, date } = action.payload;
    return state.map(task => {
      return task.id === id ? { ...task, title, desc, date } : task;
    });
  },
  [ActionsForTasks.TOGGLE_STATUS]: (
    state: TaskInterface[],
    action: ToggleTaskActionType
  ) => {
    const { id, newStatus } = action.payload;
    return state.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    });
  },
  [ActionsForTasks.DELETE]: (
    state: TaskInterface[],
    action: DeleteTaskActionType
  ) => {
    const deleteIndex = state.findIndex(task => task.id === action.payload.id);
    state.splice(deleteIndex, 1);
    return [...state];
  }
};

const tasksReducer = (
  state: TaskInterface[] = TASKS,
  action: TasksActions
): TaskInterface[] => {
  switch (action.type) {
    case ActionsForTasks.ADD_TASK:
      return tasksActionsMap[action.type](state, action);
    case ActionsForTasks.DELETE:
      return tasksActionsMap[action.type](state, action);
    case ActionsForTasks.TOGGLE_STATUS:
      return tasksActionsMap[action.type](state, action);
    case ActionsForTasks.EDIT:
      return tasksActionsMap[action.type](state, action);
    default:
      return state;
  }
};

export default tasksReducer;
