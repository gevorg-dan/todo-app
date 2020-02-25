import {ActionsForTasks, TasksActions} from "./tasksReducer";
import {ActionsForFilters, FiltersActions} from "./visibilityFiltersReducer";

export type Action<K, V> = {
  type: K;
  payload: V;
};