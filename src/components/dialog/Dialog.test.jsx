import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { Button } from "evergreen-ui";
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

  test("Dialog renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(dialog, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("Dialog renders the same snapshot", () => {
    const component = renderer.create(dialog);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
