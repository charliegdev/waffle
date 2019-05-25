import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NewTaskDialog } from "./components/dialog";
import { Tasks } from "./pages";
import { Topbar } from "./components/topbar";
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { actions } from "./redux";
import styles from "./App.module.scss";

const App = ({ createTask }) => (
  <Router>
    <div className={styles.container}>
      <Topbar>
        <NewTaskDialog onConfirm={(title, description) => createTask(title, description)} />
      </Topbar>
      <Route path="/" component={Tasks} />
    </div>
  </Router>
);

App.propTypes = {
  createTask: PropTypes.func.isRequired
};

const mapDispatch = dispatch => ({
  createTask: (title, description) => dispatch(actions.tasks.createTask(title, description))
});

export default connect(
  null,
  mapDispatch
)(App);
