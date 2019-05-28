import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

export const renderWithoutCrashing = (componentName, component) =>
  test(`${componentName} renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

export const renderSameSnapshot = (componentName, component) =>
  test(`${componentName} renders the same snapshot`, () => {
    const output = renderer.create(component);
    const tree = output.toJSON();
    expect(tree).toMatchSnapshot();
  });
