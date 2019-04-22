import React from 'react';
import status from '../constants';
import { Task, TaskLane } from '../components/task';

const mockTasks = [
  {
    id: 1,
    title: 'Review iPhone XS Max',
    description: 'Review the newest flagship iPhone.',
    status: status.TO_DO
  },
  {
    id: 2,
    title: 'Review iPhone XR',
    description: 'Review the newest "budget-friendly" iPhone.',
    status: status.TO_DO
  },
  {
    id: 3,
    title: 'Review Samsung Galaxy S10 Plus',
    description: 'Review the newest Samsung flagship',
    status: status.IN_PROGRESS
  },
  {
    id: 4,
    title: 'Review Google Pixel 3 XL',
    description: "Can the Google's flagship compete with Apple and Samsung?",
    status: status.IN_PROGRESS
  },
  {
    id: 5,
    title: 'Review OnePlus 6T',
    description: 'How much are we giving up for a "flagship killer"?',
    status: status.COMPLETED
  },
  {
    id: 6,
    title: 'Review BlackBerry KEY2',
    description: 'Are physical keyboards still relevant, and worth the tradeoffs?',
    status: status.COMPLETED
  }
];

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