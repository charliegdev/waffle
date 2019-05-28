import React from "react";
import NewTaskDialog from "./NewTaskDialog";
import { routineTests } from "../test-utils";

describe("Dialog", () => {
  let dialog;

  beforeEach(() => {
    dialog = <NewTaskDialog onConfirm={() => undefined} />;
  });

  routineTests(dialog);
});
