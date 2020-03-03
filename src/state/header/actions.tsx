import { compose, assocPath } from "ramda";

import { Action, LoadingState } from "state/store";

import { State } from "./state";

export enum SelectStatus {
  SHOW_ACTIVE = "SHOW_ACTIVE",
  SHOW_FINISHED = "SHOW_FINISHED",
  SHOW_CANCELED = "SHOW_CANCELED",
  SHOW_ALL = "SHOW_ALL"
}
export enum SelectDates {
  SHOW_TODAY = "SHOW_TODAY",
  SHOW_TOMORROW = "SHOW_TOMORROW",
  SHOW_WEEK = "SHOW_WEEK",
  SHOW_NEXT_WEEK = "SHOW_NEXT_WEEK",
  SHOW_MONTH = "SHOW_MONTH",
  SHOW_NEXT_MONTH = "SHOW_NEXT_MONTH",
  SHOW_All = "SHOW_All"
}

export interface FiltersStateInterface extends LoadingState {
  visibilityFilters: {
    filterByDate: SelectDates;
    filterByStatus: SelectStatus;
  };
}

export type SetFilterByDate = { filter: SelectDates };
export type SetFilterByStatus = { filter: SelectStatus };

export const setFilterByDate = new Action<State>().create(
  {
    setFilterByDateAction: (state, payload: SetFilterByDate) => {
      const { filter } = payload;
      return compose(assocPath(["visibilityFilters", "filterByDate"], filter))(
        state
      ) as State;
    }
  },
  (actions, payload: SetFilterByDate) => {
    actions.setFilterByDateAction(payload);
  }
);

export const setFilterByStatus = new Action<State>().create(
  {
    setFilterByStatusAction: (state, payload: SetFilterByStatus) => {
      const { filter } = payload;
      return compose(
        assocPath(["visibilityFilters", "filterByStatus"], filter)
      )(state) as State;
    }
  },
  (actions, payload: SetFilterByStatus) => {
    actions.setFilterByStatusAction(payload);
  }
);
