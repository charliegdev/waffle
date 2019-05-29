import { mockTasks, status } from "../../constants";

const ACCEPT = "waffle/tasks/ACCEPT"; // Fired when a Task is dropped in a TaskLane.
const CREATE = "waffle/tasks/CREATE";
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
 * Find the task with "DRAGGED" status, and change it to the new status.
 * @param {Task[]} state
 * @param {Action} action
 * @returns {Task[]}
 */
const acceptTaskReducer = (state, action) =>
  state.map(task =>
    task.dragging
      ? {
          ...task,
          status: action.payload.status,
          dragging: false
        }
      : task
  );

/**
 * Create a new task and put it at the end of the existing list of tasks.
 * @param {Task[]} state
 * @param {Action} action
 * @returns {Task[]} - The new tasks
 */
const createTaskReducer = (state, action) => [
  ...state,
  {
    ...action.payload,
    dragging: false,
    id: state.length + 1,
    status: status.TO_DO.title
  }
];

/**
 * Check if the current task has the same id as the id in payload. If yes, remove it.
 * @param {Task[]} state
 * @param {Action} action
 * @returns {Task[]}
 */
const deleteTaskReducer = (state, action) => state.filter(task => task.id !== action.payload.id);

/**
 * Check if the current task has the same id as the task specified in the payload. If yes, use the one in the payload.
 * @param {Task[]} state
 * @param {Action} action
 * @returns {Task[]}
 */
const updateTaskReducer = (state, action) => state.map(task => (task.id === action.payload.id ? action.payload : task));

/**
 * Root reducer for tasks module
 * @param {Task[]} state
 * @param {Action} action
 * @returns {Task[]}
 */
export default (state = mockTasks, action) => {
  switch (action.type) {
    case ACCEPT:
      return acceptTaskReducer(state, action);
    case CREATE:
      return createTaskReducer(state, action);
    case DELETE:
      return deleteTaskReducer(state, action);
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

/**
 * Action creator for changing an existing task.
 * @param {Action} modifiedTask - the modified task, passed from components
 */
export const updateTask = modifiedTask => ({
  type: UPDATE,
  payload: modifiedTask
});
