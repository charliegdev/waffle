import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

export const emptyFiller = () => undefined;

export const renderWithoutCrashing = component =>
  test(`renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

export const renderSameSnapshot = component =>
  test("renders the same snapshot", () => {
    const output = renderer.create(component);
    const tree = output.toJSON();
    expect(tree).toMatchSnapshot();
  });

export const routineTests = component => {
  renderWithoutCrashing(component);
  renderSameSnapshot(component);
};
