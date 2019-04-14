import React from 'react';
import { Task } from './components/task';
import 'antd/dist/antd.css';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <Task title="A sample task">
      <p>Description line 1</p>
      <p>Description line 2</p>
      <p>Description line 3</p>
      <p>Description line 4</p>
    </Task>
  </div>
);

export default App;
