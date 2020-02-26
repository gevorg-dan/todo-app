import { Action } from "./TypeAction";

export enum ActionsForFilters {
  SET_FILTER_BY_STATUS = "SET_FILTER_BY_STATUS",
  SET_FILTER_BY_DATE = "SET_FILTER_BY_DATE"
}
export type FiltersActions = SetFilterByStatus | SetFilterByDate;

type SetFilterByStatus = Action<
  ActionsForFilters.SET_FILTER_BY_STATUS,
  {
    filter: SelectStatus;
  }
>;
type SetFilterByDate = Action<
  ActionsForFilters.SET_FILTER_BY_DATE,
  {
    filter: SelectDates;
  }
>;

export interface StateForFilterInterface {
  filterByStatus: SelectStatus;
  filterByDate: SelectDates;
}

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

const filtersActionsMap = {
  [ActionsForFilters.SET_FILTER_BY_STATUS]: (
    state: StateForFilterInterface,
    action: SetFilterByStatus
  ) => {
    return { ...state, filterByStatus: action.payload.filter };
  },
  [ActionsForFilters.SET_FILTER_BY_DATE]: (
    state: StateForFilterInterface,
    action: SetFilterByDate
  ) => {
    return { ...state, filterByDate: action.payload.filter };
  }
};

const visibilityFiltersReducer = (
  state: StateForFilterInterface = {
    filterByStatus: SelectStatus.SHOW_ACTIVE,
    filterByDate: SelectDates.SHOW_All
  },
  action: FiltersActions
): StateForFilterInterface => {
  switch (action.type) {
    case ActionsForFilters.SET_FILTER_BY_STATUS:
      return filtersActionsMap[action.type](state, action);
    case ActionsForFilters.SET_FILTER_BY_DATE:
      return filtersActionsMap[action.type](state, action);
    default:
      return state;
  }
};

export default visibilityFiltersReducer;
