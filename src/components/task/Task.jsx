import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Button } from "evergreen-ui";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import styles from "./Task.module.scss";

const enableDrag = event => {
  event.stopPropagation();
  event.dataTransfer.effectAllowed = "move";
  // Some browsers such as Firefox requires dummy data to enable dragging
  event.dataTransfer.setData("text/plain", "some_dummy_data");
};

const Task = ({ deleteTask, task, updateTask }) => {
  // The 'drag' event is fired several times per second; don't want to call our redux functions at the same frequency.
  const updateDebounced = debounce(() => updateTask({ ...task, dragging: true }), 500, {
    leading: true,
    trailing: false
  });

  return (
    <Card
      className={styles.container}
      draggable
      elevation={Elevation.TWO}
      interactive
      onDrag={event => {
        // Some elements have undesired default drag behaviour. Prevent that.
        event.preventDefault();
        updateDebounced();
      }}
      onDragStart={enableDrag}
    >
      <H5 className={styles.title}>{task.title}</H5>
      {task.description}
      <Button className={styles.deleteButton} intent="danger" onClick={() => deleteTask(task.id)}>
        Delete
      </Button>
    </Card>
  );
};

Task.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    description: PropTypes.string.isRequired,
    dragging: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  updateTask: PropTypes.func.isRequired
};

/** @typedef { import('../../redux/modules/tasks').Task } TaskProps */

/**
 * A task object can have many properties, but we only care about these 4 (e.g., we don't care about 'dragging')
 * This doesn't scale very well when we change the implementation of Task in the future,
 * but for now the readability gain is worth it.
 * @param {{ task: TaskProps}} prevProps
 * @param {{ task: TaskProps}} nextProps
 * @returns {boolean}
 */
const isSameId = (prevProps, nextProps) =>
  ["description", "id", "status", "title"].every(property => prevProps.task[property] === nextProps.task[property]);

// Without React.memo, this component will cause an update feedback loop with Redux, that causes rerender several times per second.
export default React.memo(Task, isSameId);
