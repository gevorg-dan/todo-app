import { combineReducers } from "redux";
import visibilityFiltersReducer from "./visibilityFiltersReducer";
import tasks from "./tasks";

export default combineReducers({
  tasks,
  visibilityFilters: visibilityFiltersReducer
});
