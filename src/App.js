import React, { Component } from 'react';
import logo from './logo.svg';
import { DatePicker } from 'antd';
import { Task } from './components/task';
import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DatePicker />
          <hr />
          <Task title="A sample task">
            <p>Description line 1</p>
            <p>Description line 2</p>
            <p>Description line 3</p>
            <p>Description line 4</p>
          </Task>
        </header>
      </div>
    );
  }
}

export default App;
