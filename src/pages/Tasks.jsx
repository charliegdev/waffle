import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Tasks.module.scss";
import { status } from "../constants";
import { Task, TaskLane } from "../components/task";

const Tasks = ({ tasks }) => (
  <div className={styles.container}>
    {Object.entries(status).map(([key, object], index) => (
      <TaskLane key={object.title} {...object}>
        {tasks
          .filter(task => task.status === object.title)
          .map(task => (
            <Task title={task.title} key={task.title} status={task.status}>
              {task.description}
            </Task>
          ))}
      </TaskLane>
    ))}
  </div>
);

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
};

Tasks.defaultProps = {
  tasks: []
};

const mapState = ({ tasks }) => ({
  tasks
});

export default connect(mapState)(Tasks);
