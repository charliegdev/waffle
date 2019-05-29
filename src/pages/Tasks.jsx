import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./Tasks.module.scss";
import { actions } from "../redux";
import { status } from "../constants";
import { Task, TaskLane } from "../components/task";

const Tasks = ({ updateTask, deleteTask, tasks }) => (
  <div className={styles.container}>
    {Object.entries(status).map(([key, object], index) => (
      <TaskLane key={object.title} {...object}>
        {tasks
          .filter(task => task.status === object.title)
          .map(task => (
            <Task updateTask={updateTask} deleteTask={deleteTask} key={task.title} task={task} />
          ))}
      </TaskLane>
    ))}
  </div>
);

Tasks.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  updateTask: PropTypes.func.isRequired
};

Tasks.defaultProps = {
  tasks: []
};

const mapState = ({ tasks }) => ({
  tasks
});

const mapDispatch = dispatch => bindActionCreators(actions.tasks, dispatch);

export default connect(
  mapState,
  mapDispatch
)(Tasks);
