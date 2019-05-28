import React from "react";
import { Button } from "evergreen-ui";
import { routineTests } from "../test-utils";
import Dialog from "./Dialog";

describe("Dialog", () => {
  let dialog;

  beforeEach(() => {
    dialog = (
      <Dialog
        confirmLabel="OK"
        onConfirm={() => undefined}
        title="Sample Dialog"
        trigger={<Button>Open Dialog</Button>}
      >
        <p>Sample Dialog content</p>
      </Dialog>
    );
  });

  routineTests(dialog);
});
