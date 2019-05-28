import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import App from "./App";
import { renderWithoutCrashing, renderSameSnapshot } from "./components/test-utils";
import { store } from "./redux";

describe("App root", () => {
  const component = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  renderWithoutCrashing("App", component);
  renderSameSnapshot("App", component);
});
