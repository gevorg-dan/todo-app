import moment, { Moment } from "moment";

import { TASKS } from "tasksData";

import { Action } from "./TypeAction";
import { TaskInterface, TaskStatus } from "Interfaces";

export enum ActionsForTasks {
  DELETE = "DELETE",
  EDIT = "EDIT",
  TOGGLE_STATUS = "TOGGLE_STATUS",
  ADD_TASK = "ADD_TASK"
}

export type TasksActions =
  | AddTaskActionType
  | DeleteTaskActionType
  | ToggleTaskActionType
  | EditTaskActionType;

type AddTaskActionType = Action<
  ActionsForTasks.ADD_TASK,
  { title: string; desc: string; date: Moment }
>;
type DeleteTaskActionType = Action<ActionsForTasks.DELETE, { id: number }>;
type ToggleTaskActionType = Action<
  ActionsForTasks.TOGGLE_STATUS,
  { id: number; newStatus: TaskStatus }
>;
type EditTaskActionType = Action<
  ActionsForTasks.EDIT,
  {
    id: number;
    title: string;
    desc: string;
    date: Moment;
  }
>;

const generateId = () => +new Date();

const tasksActionsMap = {
  [ActionsForTasks.ADD_TASK]: (
    state: TaskInterface[],
    action: AddTaskActionType
  ) => {
    const { title, desc, date } = action.payload;
    const id = generateId();
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
    const editableIndex = state.findIndex(task => task.id === id);
    state[editableIndex] = { ...state[editableIndex], title, desc, date };
    return [...state];
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
    return [...state.slice(0, deleteIndex), ...state.slice(deleteIndex + 1)];
  }
};

const tasksReducer = (
  state: TaskInterface[] = TASKS,
  action: TasksActions
): TaskInterface[] => {
  state.sort((a, b) => a.date.diff(b.date));

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
