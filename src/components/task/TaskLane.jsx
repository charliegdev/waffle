import React from "react";
import PropTypes from "prop-types";
import styles from "./TaskLane.module.scss";

const TaskLane = ({ children, color, laneTitle }) => (
  <div
    className={styles.container}
    style={{
      backgroundColor: color
    }}
  >
    <h2 className={styles.title}>{laneTitle}</h2>
    {children}
  </div>
);

TaskLane.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  laneTitle: PropTypes.string.isRequired
};

TaskLane.defaultProps = {
  color: "#eeeeee"
};

export default TaskLane;
