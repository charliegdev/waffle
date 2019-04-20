import React from 'react';
import { Task, TaskLane } from '../components/task';

const Tasks = () => (
  <div>
    <TaskLane laneTitle="To Do" index={0}>
      {[1, 2, 3, 4, 5, 6, 7].map((index) => (
        <Task title="A sample task">
          <p>Description line 1</p>
          <p>Description line 2</p>
          <p>Description line 3</p>
        </Task>
      ))}
    </TaskLane>

    <TaskLane laneTitle="In Progress" index={1}>
      {[1, 2, 3, 4, 5, 6, 7].map((index) => (
        <Task title="A sample task">
          <p>Description line 1</p>
          <p>Description line 2</p>
          <p>Description line 3</p>
        </Task>
      ))}
    </TaskLane>

    <TaskLane laneTitle="Ready for Test" index={2}>
      {[1, 2, 3].map((index) => (
        <Task title="A sample task">
          <p>Description line 1</p>
          <p>Description line 2</p>
          <p>Description line 3</p>
        </Task>
      ))}
    </TaskLane>
  </div>
);

export default Tasks;
