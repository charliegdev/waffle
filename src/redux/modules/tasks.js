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

// Both DELETE and UPDATE performs client side changes first, then inform the server. Thus no *_SUCCESS actions for these 2.
const DELETE = "waffle/tasks/DELETE";

/**
 * Shared between all CRUD actions, such as `ACCEPT`, `CREATE`, `DELETE`, `FETCH` & `UPDATE`.
 * TODO: We could revert changes whenever a `FAILED` happens, but that requires more planning.
 * TODO: Show a toaster whenever `FAILED` is triggered.
 */
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
 * @property {boolean} loading // TODO: Use this to determine whether to show a spinner or loading bar
 */

/**
 * **Slice reducers**
 */
/**
 * Triggered by dropping a task into a lane. See `acceptTask` action creator below.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const acceptTaskReducer = (state, action) => ({
  ...state,
  list: state.list.map(task => (task.id === action.payload.id ? action.payload : task))
});

/**
 * Wait for the server to create a task.
 * @param {State} state
 * @returns {State}
 */
const createTaskReducer = state => ({
  ...state,
  error: null,
  loading: true
});

/**
 * Get the new task created / validated by the server and put it at the end of the existing list of tasks.
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const createTaskSuccessReducer = (state, action) => ({
  ...state,
  error: null,
  list: [...state.list, action.payload],
  loading: false
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
  error: action.payload,
  loading: false
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
 * @returns {Action}
 */
const failed = error => ({
  type: FAILED,
  payload: error
});

/**
 * Called once `GET /tasks` succeeds
 * @param {Task[]} tasks
 * @returns {Action}
 */
const fetchSuccess = tasks => ({
  type: FETCH_SUCCESS,
  payload: tasks
});

/**
 * **Exported thunks**
 */
/**
 * The action creator for dropping a Task in a TaskLane. This is usually called by `Tasks.jsx`.
 * Because dragging happens so frequently, we can't afford to wait for the server call to resolve before updating the frontend.
 * Therefore, we update the Redux store first (so UI remains responsive), and update the server later in the background.
 *
 * The reason this is not just a case of `updateTask`, is because their function signatures are different. In `Tasks.jsx`, the `<Tasks>`
 * doesn't know the `<Task>` being dragged right now. Therefore it relies on this action creator to figure that out.
 *
 * @param {String} destinationStatus - The status to be dropped onto
 * @returns {Function}
 */
export const acceptTask = destinationStatus => (dispatch, getState) => {
  // Figure out the task being dragged just now.
  const draggedTask = getState().tasks.list.find(task => task.dragging);

  const updatedTask = {
    ...draggedTask,
    status: destinationStatus,
    dragging: false
  };

  // Change the client side store first.
  dispatch({
    type: ACCEPT,
    payload: updatedTask
  });

  // Update the server in the background.
  axios
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
 * @param {string} title
 * @param {string} description
 * @returns {Function}
 */
export const createTask = (title, description) => (dispatch, getState) => {
  dispatch({ type: CREATE });

  const newTask = {
    title,
    description,
    dragging: false,
    id: getState().tasks.list.length + 1, // TODO: The ID really should be generated by the server.
    status: status.TO_DO.title
  };

  axios
    .post("/tasks", newTask)
    .then(response => dispatch(createTaskSuccess(response.data)))
    .catch(error => dispatch(failed(error)));
};

/**
 * Action creator for deleting an existing task.
 * Same as `acceptTask`, we delete the local copy first, then inform the server.
 * @param {number} id
 * @return {Function}
 */
export const deleteTask = id => dispatch => {
  dispatch({
    type: DELETE,
    payload: { id }
  });

  // TODO: If deletion failed in the server, revert the client.
  axios.delete(`/tasks/${id}`).catch(error => failed(error));
};

/**
 * Call this when app loads to retrieve all tasks stored on the server.
 * @returns {Function}
 */
export const fetchTasks = () => dispatch => {
  dispatch({ type: FETCH });

  axios
    .get("/tasks")
    .then(response => dispatch(fetchSuccess(response.data)))
    .catch(error => dispatch(failed(error)));
};

/**
 * For now, this is mainly used by `<Task>` to change the `dragging` property. No need to update the server for that.
 * To change a task's lane, see `acceptTask`.
 *
 * In the future when we allow editing the `title` and `description` of a `<Task>` (even better, in a modal dialog),
 * this has to somehow tell if the changed property is `dragging`. If not, send an API call to the server.
 * For now, don't worry about it.
 *
 * @param {Task} modifiedTask
 * @returns {Action}
 */
export const updateTask = modifiedTask => ({
  type: UPDATE,
  payload: modifiedTask
});
