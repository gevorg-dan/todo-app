import moment, { Moment } from "moment";
import { compose, assocPath, without } from "ramda";

import { Action, LoadingState } from "state/store";
import { State } from "./state";

import { TaskInterface, TaskStatus } from "Interfaces";

export interface TasksStateInterface extends LoadingState {
  tasks: TaskInterface[];
}

export type AddTaskActionType = { title: string; desc: string; date: Moment };
export type DeleteTaskActionType = { id: number };
export type ToggleTaskActionType = { id: number; newStatus: TaskStatus };
export type EditTaskActionType = {
  id: number;
  title: string;
  desc: string;
  date: Moment;
};

const generateId = () => +new Date();
const getIndexById = (tasks: TaskInterface[], id: number) =>
  tasks.findIndex(task => task.id === id);

export const addTask = new Action<State>().create(
  {
    addTaskAction: (state, payload: AddTaskActionType) => {
      const { title, desc, date } = payload;
      const id = generateId();

      return compose(
        assocPath(["tasks", state.tasks.length], {
          id,
          title,
          desc,
          date,
          createdDate: moment(),
          status: TaskStatus.active
        })
      )(state) as State;
    }
  },
  (actions, payload: AddTaskActionType) => {
    actions.addTaskAction(payload);
  }
);

export const editTask = new Action<State>().create(
  {
    editTaskAction: (state, payload: EditTaskActionType) => {
      const { id, title, desc, date } = payload;
      const indexForUpdate = getIndexById(state.tasks, id);
      return compose(
        assocPath(["tasks", indexForUpdate], {
          ...state.tasks[indexForUpdate],
          title,
          desc,
          date
        })
      )(state) as State;
    }
  },
  (actions, payload: EditTaskActionType) => {
    actions.editTaskAction(payload);
  }
);

export const toggleTaskStatus = new Action<State>().create(
  {
    toggleTaskStatusAction: (state, payload: ToggleTaskActionType) => {
      const { id, newStatus } = payload;
      const indexForUpdate = getIndexById(state.tasks, id);
      return compose(
        assocPath(["tasks", indexForUpdate], {
          ...state.tasks[indexForUpdate],
          status: newStatus
        })
      )(state) as State;
    }
  },
  (actions, payload: ToggleTaskActionType) => {
    actions.toggleTaskStatusAction(payload);
  }
);

export const deleteTask = new Action<State>().create(
  {
    deleteTaskAction: (state, payload: DeleteTaskActionType) => {
      const { id } = payload;
      const indexForDelete = getIndexById(state.tasks, id);
      return compose(
        assocPath(
          ["tasks"],
          without([state.tasks[indexForDelete]], state.tasks)
        )
      )(state) as State;
    }
  },
  (actions, payload: DeleteTaskActionType) => {
    actions.deleteTaskAction(payload);
  }
);
