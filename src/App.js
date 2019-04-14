import React from 'react';
import { Task, TaskLane } from './components/task';
import 'antd/dist/antd.css';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <TaskLane laneTitle="To Do">
      <Task title="A sample task">
        <p>Description line 1</p>
        <p>Description line 2</p>
        <p>Description line 3</p>
      </Task>

      <Task title="Another sample task">
        <p>Description line 1</p>
        <p>Description line 2</p>
        <p>Description line 3</p>
      </Task>
    </TaskLane>
  </div>
);

export default App;
