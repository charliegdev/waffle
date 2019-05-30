/**
 * Using the **Redux duck pattern** by *Erik Rasmussen*:
 * https://github.com/erikras/ducks-modular-redux
 */
import axios from "axios";

import { status } from "../../constants";

/**
 * **Actions**
 */
const ACCEPT = "waffle/tasks/ACCEPT"; // Fired when a Task is dropped in a TaskLane.
const CREATE = "waffle/tasks/CREATE";
const CREATE_SUCCESS = "waffle/task/CREATE_SUCCESS";

const DELETE = "waffle/tasks/DELETE";

// This could be applied to all network call, such as FETCH, UPDATE and DELETE.
const FAILED = "waffle/tasks/FAILED";

const FETCH = "waffle/tasks/FETCH";
const FETCH_SUCCESS = "waffle/tasks/FETCH_SUCCESS";

const UPDATE = "waffle/tasks/UPDATE";

/**
 * **Typedefs**
 */
/**
 * @typedef {Object} Task
 * @property {boolean} dragging
 * @property {number} id
 * @property {string} description
 * @property {string} status
 * @property {string} title
 */

/**
 * @typedef {Object} Action
 * @property {string} type - The type of an action, such as 'waffle/tasks/CREATE'
 * @property {Object=} payload
 */

/**
 * @typedef {Object} State
 * @property {Object} error
 * @property {Task[]} list
 * @property {boolean} loading // Would use this to determine whether to show a spinner or loading bar, but don't bother now.
 */

/**
 * **Slice reducers**
 */
/**
 * Find the task with "DRAGGED" status, and change it to the new status.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const acceptTaskReducer = (state, action) => ({
  ...state,
  list: state.list.map(task => (task.id === action.payload.id ? action.payload : task))
});

/**
 * Create a new task and put it at the end of the existing list of tasks.
 * @param {State} state
 * @returns {State}
 */
const createTaskReducer = state => ({
  ...state,
  error: null,
  loading: true
});

const createTaskSuccessReducer = (state, action) => ({
  ...state,
  list: [...state.list, action.payload]
});

/**
 * Check if the current task has the same id as the id in payload. If yes, remove it.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const deleteTaskReducer = (state, action) => ({
  ...state,
  list: state.list.filter(task => task.id !== action.payload.id)
});

/**
 * If there is an error from the network call, store that in Redux.
 * @param {State} state
 * @param {Action} action
 * @return {State}
 */
const failedReducer = (state, action) => ({
  ...state,
  error: action.payload
});

/**
 * When FETCH starts, show the spinner and remove all existing errors (if any)
 * @param {State} state
 * @return {State}
 */
const fetchReducer = state => ({
  ...state,
  error: null,
  loading: true
});

/**
 * When fetch succeeds, put that data into the store, and stop the spinner.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const fetchSuccessReducer = (state, action) => ({
  ...state,
  error: null,
  list: action.payload,
  loading: false
});

/**
 * Check if the current task has the same id as the task specified in the payload. If yes, use the one in the payload.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const updateTaskReducer = (state, action) => ({
  ...state,
  list: state.list.map(task => (task.id === action.payload.id ? action.payload : task))
});

/**
 * @type {State}
 */
const emptyState = {
  error: null,
  list: [],
  loading: false
};

/**
 * **Root reducer** for the **tasks module**
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default (state = emptyState, action) => {
  switch (action.type) {
    case ACCEPT:
      return acceptTaskReducer(state, action);
    case CREATE:
      return createTaskReducer(state);
    case CREATE_SUCCESS:
      return createTaskSuccessReducer(state, action);
    case DELETE:
      return deleteTaskReducer(state, action);
    case FAILED:
      return failedReducer(state, action);
    case FETCH:
      return fetchReducer(state);
    case FETCH_SUCCESS:
      return fetchSuccessReducer(state, action);
    case UPDATE:
      return updateTaskReducer(state, action);
    default:
      return state;
  }
};

/**
 * **Local action creators**, for success and failure actions.
 */
/**
 * Called once `POST /tasks` succeeds
 * @param {Task} newTask
 * @returns {Action}
 */
const createTaskSuccess = newTask => ({
  type: CREATE_SUCCESS,
  payload: newTask
});

/**
 * Called whenever any error is returned from an API call.
 * @param {Object} error
 */
const failed = error => ({
  type: FAILED,
  payload: error
});

/**
 * Called once `GET /tasks` succeeds
 * @param {Task[]} tasks
 */
const fetchSuccess = tasks => ({
  type: FETCH_SUCCESS,
  payload: tasks
});

/**
 * **Exported thunks**
 */
/**
 * Action creator for dropping a Task in a TaskLane. This is usually called by `Tasks.jsx`.
 * Because dragging happens so frequently, we can't afford waiting for the server call to resolve before updating the frontend.
 * Therefore, we update the Redux store first (so UI remains responsive), and update the server later in the background.
 * @param {String} destinationStatus - The status to be dropped onto
 * @returns {Function}
 */
export const acceptTask = destinationStatus => (dispatch, getState) => {
  // Only one of the task will have "dragging" as true.
  const draggedTask = getState().tasks.list.find(task => task.dragging);

  const updatedTask = {
    ...draggedTask,
    status: destinationStatus,
    dragging: false
  };

  dispatch({
    type: ACCEPT,
    payload: updatedTask
  });

  return axios
    .put(`/tasks/${updatedTask.id}`, updatedTask)
    .then(response => {
      /**
       * If the server response's `status` is different than what we sent
       * (say, we sent `status: "IN PROGRESS"`, but the server returns `status: "TO DO"`),
       * the server rejected our change without a proper error. In that case, revert.
       */
      if (updatedTask.status !== response.data.status) {
        dispatch(updateTask(response.data));
      }
    })
    .catch(error => failed(error));
};

/**
 * Thunk for completing a new task (since we only get title and description), then send it to the server.
 * All new Tasks should have `status` of `TODO`.
 * @param {String} title
 * @param {String} description
 * @returns {function}
 */
export const createTask = (title, description) => (dispatch, getState) => {
  dispatch({ type: CREATE });

  const newTask = {
    title,
    description,
    dragging: false,
    id: getState().tasks.list.length + 1, // The ID really should be generated by the server.
    status: status.TO_DO.title
  };

  return axios
    .post("/tasks", newTask)
    .then(response => dispatch(createTaskSuccess(response.data)))
    .catch(error => dispatch(failed(error)));
};

/**
 * Action creator for deleting an existing task.
 * @param {number} id
 * @return {Action}
 */
export const deleteTask = id => ({
  type: DELETE,
  payload: { id }
});

export const fetchTasks = () => dispatch => {
  dispatch({ type: FETCH });

  return axios
    .get("/tasks")
    .then(response => dispatch(fetchSuccess(response.data)))
    .catch(error => dispatch(failed(error)));
};

/**
 * This is mainly used by Task to change the dragging property. No need to update the server for that.
 * To change a task's lane, see `acceptTask`.
 * In the future when we allow editing the title and description of a task (even in a modal dialog),
 * this has to somehow tell if the changed property is `dragging`. If not, send an API call to the server.
 * For now, don't worry about it.
 * @param {Task} modifiedTask
 */
export const updateTask = modifiedTask => ({
  type: UPDATE,
  payload: modifiedTask
});
