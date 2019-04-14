import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskLane.module.css';

const TaskLane = ({ children, laneTitle }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{laneTitle}</h2>
    {children}
  </div>
);

TaskLane.propTypes = {
  children: PropTypes.node.isRequired,
  laneTitle: PropTypes.string.isRequired
};

export default TaskLane;
