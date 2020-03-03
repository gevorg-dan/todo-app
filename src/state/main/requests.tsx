import moment from "moment";
import { assocPath, compose, without } from "ramda";

import { createRequest, METHODS } from "libs/createRequest";

import { Action, LoadingState } from "state/store";
import { State } from "./state";

import { TaskInterface, TaskStatus } from "Interfaces";

export interface TasksStateInterface
  extends LoadingState,
    LoadingState<"createLoading", "createError">,
    LoadingState<"updateLoading", "updateError">,
    LoadingState<"deleteLoading", "deleteError"> {
  tasks: TaskInterface[];
}
interface ServerTasksInterface {
  id: number;
  title: string;
  desc: string;
  date: string;
  createdDate: string;
  status: "active" | "finished" | "canceled";
}

export const dateFormat = "DD.MM.YYYY";

export type CreateTaskActionType = {
  title: string;
  desc: string;
  date: string;
};
interface CreateTaskActionTypeWithId extends CreateTaskActionType {
  id: number;
}
export type DeleteTaskActionType = { id: number };
export type UpdateTaskActionType = {
  id: number;
  title?: string;
  desc?: string;
  date: string;
  status: string;
};

const getIndexById = (tasks: TaskInterface[], id: number) =>
  tasks.findIndex(task => task.id === id);

const createTaskApi = createRequest("api/create", METHODS.POST);

export const createTask = new Action<State>().create(
  {
    start: state =>
      compose(
        assocPath(["createLoading"], true),
        assocPath(["createError"], null)
      )(state) as State,
    success: (state, payload: CreateTaskActionTypeWithId) => {
      const { id, title, desc, date } = payload;
      const createdTask = {
        id,
        title,
        desc,
        date: moment(date, dateFormat),
        createdDate: moment(),
        status: TaskStatus.active
      };
      return compose(
        assocPath(["createLoading"], false),
        assocPath(["tasks", state.tasks.length], createdTask)
      )(state) as State;
    },
    error: (state, error) => {
      return compose(
        assocPath(["createLoading"], false),
        assocPath(["createError"], error.errorMessage)
      )(state) as State;
    }
  },
  (actions, payload: CreateTaskActionType) => {
    actions.start();
    createTaskApi(payload).then(res => {
      actions.success({ ...payload, id: res.id });
    }, actions.error);
  }
);

const updateTaskApi = createRequest("api/update", METHODS.POST);

export const updateTask = new Action<State>().create(
  {
    start: state => {
      return compose(
        assocPath(["updateLoading"], true),
        assocPath(["updateError"], null)
      )(state) as State;
    },
    success: (state, payload: UpdateTaskActionType) => {
      const decodedPayload = {
        ...payload,
        date: moment(payload.date, dateFormat),
        status: TaskStatus[payload.status]
      };
      const { id, ...propsToUpdate } = decodedPayload;
      const indexToUpdate = getIndexById(state.tasks, id);
      return compose(
        assocPath(["updateLoading"], false),
        assocPath(["tasks", indexToUpdate], {
          ...state.tasks[indexToUpdate],
          ...propsToUpdate
        })
      )(state) as State;
    },
    error: (state, error) => {
      return compose(
        assocPath(["updateLoading"], false),
        assocPath(["updateError"], error.errorMessage)
      )(state) as State;
    }
  },
  (actions, payload: UpdateTaskActionType) => {
    actions.start();
    updateTaskApi(payload).then(() => actions.success(payload), actions.error);
  }
);

const deleteTaskApi = createRequest("api/delete", METHODS.POST);

export const deleteTask = new Action<State>().create(
  {
    start: state =>
      compose(
        assocPath(["deleteLoading"], true),
        assocPath(["deleteError"], null)
      )(state) as State,
    success: (state, payload: DeleteTaskActionType) => {
      const { id } = payload;
      const indexForDelete = getIndexById(state.tasks, id);
      return compose(
        assocPath(["deleteLoading"], false),
        assocPath(
          ["tasks"],
          without([state.tasks[indexForDelete]], state.tasks)
        )
      )(state) as State;
    },
    error: (state, error) => {
      return compose(
        assocPath(["deleteLoading"], false),
        assocPath(["deleteError"], error.errorMessage)
      )(state) as State;
    }
  },
  (actions, payload: DeleteTaskActionType) => {
    actions.start();
    deleteTaskApi(payload).then(() => actions.success(payload), actions.error);
  }
);

const getTasksApi = createRequest("/api", METHODS.GET);

export const getTasks = new Action<State>().create(
  {
    start: state =>
      compose(
        assocPath(["loading"], true),
        assocPath(["error"], null)
      )(state) as State,
    success: (state, payload) => {
      return compose(
        assocPath(["tasks"], payload),
        assocPath(["loading"], false),
        assocPath(["error"], "")
      )(state) as State;
    },
    error: (state, error) => {
      return compose(
        assocPath(["loading"], false),
        assocPath(["error"], error.errorMessage)
      )(state) as State;
    }
  },
  actions => {
    actions.start();
    getTasksApi()
      .then((res: ServerTasksInterface[]): TaskInterface[] | void =>
        res.map(task => ({
          ...task,
          date: moment(task.date, dateFormat),
          createdDate: moment(task.createdDate, dateFormat),
          status: TaskStatus[task.status]
        }))
      )
      .then(actions.success, actions.error);
  }
);
