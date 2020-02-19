import { combineReducers } from "redux";
import visibilityFiltersReducer from "./visibilityFiltersReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  tasks: tasksReducer,
  visibilityFilters: visibilityFiltersReducer
});
