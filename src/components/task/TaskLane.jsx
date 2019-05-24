import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskLane.module.scss';

const TaskLane = ({ children, laneTitle, index }) => (
  <div
    className={styles.container}
    style={{
      left: index * 360
    }}
  >
    <h2 className={styles.title}>{laneTitle}</h2>
    {children}
  </div>
);

TaskLane.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  laneTitle: PropTypes.string.isRequired
};

export default TaskLane;
