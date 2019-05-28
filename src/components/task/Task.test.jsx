import React from "react";
import Task from "./Task";
import { emptyFiller, routineTests } from "../test-utils";

describe("Task", () => {
  let task;

  beforeEach(() => {
    task = (
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
    );
  });

  routineTests(task);
});
