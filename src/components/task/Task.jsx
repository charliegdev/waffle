import React from "react";
import PropTypes from "prop-types";
import { Button } from "evergreen-ui";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import styles from "./Task.module.scss";
import { SelectMenu } from "../select-menu";
import { status } from "../../constants";

const options = Object.entries(status).map(([key, { title }]) => ({
  label: title,
  value: title
}));

const Task = ({ changeStatus, deleteTask, task }) => (
  <Card
    draggable
    onDrag={event => console.log(event)}
    interactive
    elevation={Elevation.TWO}
    className={styles.container}
  >
    <H5 className={styles.title}>{task.title}</H5>
    {task.description}
    <div className={styles.buttons}>
      <SelectMenu
        initial={task.status}
        options={options}
        onSelect={newStatus =>
          changeStatus({
            ...task,
            status: newStatus
          })
        }
      />
      <Button className={styles.deleteButton} intent="danger" onClick={() => deleteTask(task.id)}>
        Delete
      </Button>
    </div>
  </Card>
);

Task.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default Task;
