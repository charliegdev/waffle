import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Tasks.module.scss";
import { actions } from "../redux";
import { status } from "../constants";
import { Task, TaskLane } from "../components/task";

const Tasks = ({ changeStatus, tasks }) => (
  <div className={styles.container}>
    {Object.entries(status).map(([key, object], index) => (
      <TaskLane key={object.title} {...object}>
        {tasks
          .filter(task => task.status === object.title)
          .map(task => (
            <Task changeStatus={changeStatus} key={task.title} task={task} />
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

const mapDispatch = dispatch => ({
  changeStatus: modifiedTask => dispatch(actions.tasks.updateTask(modifiedTask))
});

export default connect(
  mapState,
  mapDispatch
)(Tasks);
