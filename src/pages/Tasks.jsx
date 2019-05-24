import React from 'react';
import { mockTasks, status } from '../constants';
import { Task, TaskLane } from '../components/task';

const Tasks = () => (
  <div>
    {Object.entries(status).map(([key, stringLiteral], index) => (
      <TaskLane laneTitle={stringLiteral} index={index} key={stringLiteral}>
        {mockTasks
          .filter((task) => task.status === stringLiteral)
          .map((task) => (
            <Task title={task.title} key={task.title}>
              {task.description}
            </Task>
          ))}
      </TaskLane>
    ))}
  </div>
);

export default Tasks;
