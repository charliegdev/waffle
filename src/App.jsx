import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Topbar } from './components/topbar';
import { Tasks } from './pages';
import 'antd/dist/antd.css';
import styles from './App.module.css';

const App = () => (
  <Router>
    <div className={styles.container}>
      <Topbar />
      <Route path="/" component={Tasks} />
    </div>
  </Router>
);

export default App;
