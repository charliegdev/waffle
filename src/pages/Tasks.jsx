import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Tasks.module.scss";
import { status } from "../constants";
import { Task, TaskLane } from "../components/task";

const Tasks = ({ tasks }) => (
  <div className={styles.container}>
    {Object.entries(status).map(([key, object], index) => (
      <TaskLane color={object.color} laneTitle={object.title} lighterColor={object.lighterColor} key={object.title}>
        {tasks
          .filter(task => task.status === object.title)
          .map(task => (
            <Task title={task.title} key={task.title}>
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
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
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
