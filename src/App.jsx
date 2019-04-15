import React from 'react';
import { Task, TaskLane } from './components/task';
import { Topbar } from './components/topbar';
import 'antd/dist/antd.css';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <Topbar />
    <TaskLane laneTitle="To Do">
      {[1, 2, 3, 4, 5, 6, 7].map((index) => (
        <Task title="A sample task">
          <p>Description line 1</p>
          <p>Description line 2</p>
          <p>Description line 3</p>
        </Task>
      ))}
    </TaskLane>
  </div>
);

export default App;
