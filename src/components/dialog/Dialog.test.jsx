import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { Button } from "evergreen-ui";
import { renderWithoutCrashing, renderSameSnapshot } from "../test-utils";
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

  renderWithoutCrashing("Dialog", dialog);
  renderSameSnapshot("Dialog", dialog);
});
