import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './Task.module.css';

const Task = ({ title, children }) => (
  <Card title={title} className={styles.container}>
    {children}
  </Card>
);

Task.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Task;
