import React from "react";
import PropTypes from "prop-types";
import styles from "./TaskLane.module.scss";
import { Icon } from "@blueprintjs/core";

const TaskLane = ({ children, color, icon, title, lighterColor }) => (
  <div
    className={styles.container}
    style={{
      backgroundColor: color
    }}
  >
    <h2
      className={styles.title}
      style={{
        backgroundColor: lighterColor
      }}
    >
      <span className={styles.titleLeft}>
        <Icon icon={icon} iconSize={20} />
        &nbsp; &nbsp;
        {title}
      </span>
      <span>{children.length}</span>
    </h2>
    {children}
  </div>
);

TaskLane.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lighterColor: PropTypes.string
};

TaskLane.defaultProps = {
  color: "#eeeeee",
  lighterColor: "#eeeeee"
};

export default TaskLane;
