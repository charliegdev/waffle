import axios from "axios";

import { status } from "../../constants";

const ACCEPT = "waffle/tasks/ACCEPT"; // Fired when a Task is dropped in a TaskLane.
const CREATE = "waffle/tasks/CREATE";

// This could be applied to all network call, such as FETCH, UPDATE and DELETE.
const FAILED = "waffle/tasks/FAILED";

const FETCH = "waffle/tasks/FETCH";
const FETCH_SUCCESS = "waffle/tasks/FETCH_SUCCESS";

const UPDATE = "waffle/tasks/UPDATE";
const DELETE = "waffle/tasks/DELETE";

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
 * @property {boolean} loading
 */

/**
 * Find the task with "DRAGGED" status, and change it to the new status.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const acceptTaskReducer = (state, action) => ({
  ...state,
  list: state.list.map(task =>
    task.dragging
      ? {
          ...task,
          status: action.payload.status,
          dragging: false
        }
      : task
  )
});

/**
 * Create a new task and put it at the end of the existing list of tasks.
 * @param {State} state
 * @param {Action} action
 * @returns {State} - The new tasks
 */
const createTaskReducer = (state, action) => ({
  ...state,
  list: [
    ...state.list,
    {
      ...action.payload,
      dragging: false,
      id: state.list.length + 1,
      status: status.TO_DO.title
    }
  ]
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

const emptyState = {
  error: null,
  list: [],
  loading: false
};

/**
 * Root reducer for tasks module
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export default (state = emptyState, action) => {
  switch (action.type) {
    case ACCEPT:
      return acceptTaskReducer(state, action);
    case CREATE:
      return createTaskReducer(state, action);
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
 * Action creator for dropping a Task in a TaskLane
 * @params {string} destinationStatus - The status to be dropped onto
 * @returns {Action}
 */
export const acceptTask = destinationStatus => ({
  type: ACCEPT,
  payload: {
    status: destinationStatus
  }
});

/**
 * Action creator for creating a new task.
 * @param {string} title
 * @param {string} description
 * @returns {Action}
 */
export const createTask = (title, description) => ({
  type: CREATE,
  payload: {
    title,
    description
  }
});

/**
 * Action creator for deleting an existing task.
 * @param {number} id
 * @return {Action}
 */
export const deleteTask = id => ({
  type: DELETE,
  payload: { id }
});

export const failed = error => ({
  type: FAILED,
  payload: error
});

export const fetchSuccess = tasks => ({
  type: FETCH_SUCCESS,
  payload: tasks
});

export const fetchTasks = () => dispatch => {
  dispatch({ type: FETCH });

  return axios
    .get("/tasks")
    .then(response => response.data)
    .catch(error => error);
};

/**
 * Action creator for changing an existing task.
 * @param {Action} modifiedTask - the modified task, passed from components
 */
export const updateTask = modifiedTask => ({
  type: UPDATE,
  payload: modifiedTask
});
