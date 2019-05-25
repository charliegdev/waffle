import { combineReducers } from "redux";
import tasksReducer, * as tasks from "./tasks";

export const reducer = combineReducers({
  tasks: tasksReducer
});

export default {
  tasks
};
