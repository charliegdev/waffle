import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux";

describe("App root", () => {
  test("App renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("App renders the same snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
