import { StoreContext } from "state/store";

import {
  SelectStatus,
  SelectDates,
  FiltersStateInterface,
  setFilterByStatus,
  setFilterByDate
} from "./actions";

export interface State extends FiltersStateInterface {}

const initialState: State = {
  loading: false,
  error: null,
  visibilityFilters: {
    filterByStatus: SelectStatus.SHOW_ACTIVE,
    filterByDate: SelectDates.SHOW_All
  }
};

export const headerModule = new StoreContext(initialState, {
  setFilterByDate,
  setFilterByStatus
});
