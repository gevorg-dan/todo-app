import { combineReducers } from "redux";
import { TasksInterface, TaskStatus } from "../Interfaces";
import moment from "moment";

export enum ReducerActions {
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  EDIT = "EDIT",
  TOGGLE = "TOGGLE",
  ADD_TASK = "ADD_TASK"
}

const TASKS: TasksInterface[] = [
  {
    id: 0,
    title: "Купить молоко",
    desc: "Купить молоко, потому что оно закончилось, СРОЧНО!!!",
    date: moment("20200209", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.finished
  },
  {
    id: 1,
    title: "Съесть бутерброд",
    desc: "Съесть бутерброд перед школой.",
    date: moment("20200202", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 2,
    title: "Сходить в школу",
    desc: "Сначала в школу, а потом сразу домой.",
    date: moment("20200218", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 3,
    title: "убрать гараж",
    desc: "Вынести старые вещи из гаража, освободить место, для машины.",
    date: moment("20200209", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.canceled
  },
  {
    id: 4,
    title: "Нарисовать картину",
    desc: "Необходимо сделать домашнее задание в художественную школу.",
    date: moment("20200215", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 5,
    title: "Вынести мусор",
    desc: "Не забыть!!! А то весь дом провонял...",
    date: moment("20200213", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  }
];

const tasks = (
  state: TasksInterface[] = TASKS,
  action: {
    type: ReducerActions;
    newState?: TasksInterface;
    id?: number;
    newStatus?: TaskStatus;
  }
) => {
  const { type, newState, id, newStatus } = action;
  const nextId = state[state.length - 1].id + 1;
  if (type === ReducerActions.EDIT) {
    return state.map(task => {
      return task.id === newState.id ? newState : task;
    });
  }

  if (type === ReducerActions.DELETE) {
    return state.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });
  }

  if (type === ReducerActions.TOGGLE) {
    return state.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    });
  }

  if (type === ReducerActions.ADD_TASK) {
    return [
      ...state,
      {
        id: nextId,
        ...newState
      }
    ];
  }
  return state;
};

export default combineReducers({
  tasks
});
