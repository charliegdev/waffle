import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import SelectMenu from "./SelectMenu";

describe("Dialog", () => {
  let selectMenu;

  beforeEach(() => {
    selectMenu = (
      <SelectMenu
        options={[
          {
            label: "option 1",
            value: "option 1"
          },
          {
            label: "option 2",
            value: "option 2"
          },
          {
            label: "option 3",
            value: "option 3"
          }
        ]}
        onSelect={() => undefined}
      />
    );
  });

  test("Dialog renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(selectMenu, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("Dialog renders the same snapshot", () => {
    const component = renderer.create(selectMenu);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
