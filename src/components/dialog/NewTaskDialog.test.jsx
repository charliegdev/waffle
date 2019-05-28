import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { Button } from "evergreen-ui";
import NewTaskDialog from "./NewTaskDialog";

describe("Dialog", () => {
  let dialog;

  beforeEach(() => {
    dialog = <NewTaskDialog onConfirm={() => undefined} />;
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
