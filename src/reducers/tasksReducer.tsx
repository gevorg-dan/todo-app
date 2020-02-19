import { TaskInterface, TaskStatus } from "../Interfaces";
import moment, { Moment } from "moment";
require("moment/locale/ru");

export enum ActionsForTasks {
  DELETE = "DELETE",
  EDIT = "EDIT",
  TOGGLE = "TOGGLE",
  ADD_TASK = "ADD_TASK"
}

const TASKS: TaskInterface[] = [
  {
    id: 0,
    title: "Купить молоко",
    desc: "Купить молоко, потому что оно закончилось, СРОЧНО!!!",
    date: moment("09022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.finished
  },
  {
    id: 1,
    title: "Съесть бутерброд",
    desc: "Съесть бутерброд перед школой.",
    date: moment("02022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 2,
    title: "Сходить в школу",
    desc: "Сначала в школу, а потом сразу домой.",
    date: moment("18022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 3,
    title: "убрать гараж",
    desc: "Вынести старые вещи из гаража, освободить место, для машины.",
    date: moment("09022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.canceled
  },
  {
    id: 4,
    title: "Нарисовать картину",
    desc: "Необходимо сделать домашнее задание в художественную школу.",
    date: moment("15022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 5,
    title: "Вынести мусор",
    desc: "Не забыть!!! А то весь дом провонял...",
    date: moment("13022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  }
];

export type TasksActions =
  | AddTaskActionType
  | DeleteTaskActionType
  | ToggleTaskActionType
  | EditTaskActionType;

type AddTaskActionType = {
  type: ActionsForTasks.ADD_TASK;
  title: string;
  desc: string;
  date: Moment;
  nextId: number;
};
type DeleteTaskActionType = { type: ActionsForTasks.DELETE; id: number };
type ToggleTaskActionType = {
  type: ActionsForTasks.TOGGLE;
  id: number;
  newStatus: TaskStatus;
};
type EditTaskActionType = {
  type: ActionsForTasks.EDIT;
  id: number;
  title: string;
  desc: string;
  date: Moment;
};

const tasksActionsMap = {
  [ActionsForTasks.ADD_TASK]: (
    state: TaskInterface[],
    action: AddTaskActionType
  ) => {
    return [
      ...state,
      {
        id: action.nextId,
        title: action.title,
        desc: action.desc,
        date: action.date,
        createdDate: moment(),
        status: TaskStatus.active
      }
    ];
  },
  [ActionsForTasks.EDIT]: (
    state: TaskInterface[],
    action: EditTaskActionType
  ) => {
    return state.map(task => {
      return task.id === action.id
        ? { ...task, title: action.title, desc: action.desc, date: action.date }
        : task;
    });
  },
  [ActionsForTasks.TOGGLE]: (
    state: TaskInterface[],
    action: ToggleTaskActionType
  ) => {
    return state.map(task => {
      if (task.id === action.id) {
        return { ...task, status: action.newStatus };
      }
      return task;
    });
  },
  [ActionsForTasks.DELETE]: (
    state: TaskInterface[],
    action: DeleteTaskActionType
  ) => {
    return state.filter(task => {
      if (task.id !== action.id) {
        return task;
      }
    });
  }
};

const tasksReducer = (
  state: TaskInterface[] = TASKS,
  action: TasksActions
): TaskInterface[] => {
  const nextId = +new Date();

  switch (action.type) {
    case ActionsForTasks.ADD_TASK:
      return tasksActionsMap[action.type](state, { ...action, nextId });
    case ActionsForTasks.DELETE:
      return tasksActionsMap[action.type](state, action);
    case ActionsForTasks.TOGGLE:
      return tasksActionsMap[action.type](state, action);
    case ActionsForTasks.EDIT:
      return tasksActionsMap[action.type](state, action);
    default:
      return state;
  }
};

export default tasksReducer;
