import React from "react";
import Task from "./Task";
import TaskLane from "./TaskLane";
import { emptyFiller, routineTests } from "../test-utils";

describe("TaskLane", () => {
  let taskLane;

  beforeEach(() => {
    taskLane = (
      <TaskLane icon="pulse" title="In Progress">
        <Task
          changeStatus={emptyFiller}
          deleteTask={emptyFiller}
          task={{
            id: 1,
            title: "Review iPhone XS Max",
            description: "Review the newest flagship iPhone.",
            status: "To Do"
          }}
        />
        <Task
          changeStatus={emptyFiller}
          deleteTask={emptyFiller}
          task={{
            id: 2,
            title: "Review iPhone XS Max",
            description: "Review the newest flagship iPhone.",
            status: "To Do"
          }}
        />
      </TaskLane>
    );
  });

  routineTests(taskLane);
});
