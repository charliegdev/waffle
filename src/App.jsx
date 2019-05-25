import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button, Textarea, TextInput } from "evergreen-ui";
import { Dialog } from "./components/dialog";
import { Tasks } from "./pages";
import { Topbar } from "./components/topbar";
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import styles from "./App.module.scss";

const App = () => (
  <Router>
    <div className={styles.container}>
      <Topbar>
        <Dialog
          confirmLabel="Confirm"
          title="Add a new task"
          trigger={
            <Button appearance="primary" iconBefore="new-object">
              New Task
            </Button>
          }
        >
          <TextInput name="task-title" placeholder="Title" width="100%" />
          <br />
          <br />
          <Textarea name="task-description" placeholder="Description" />
        </Dialog>
      </Topbar>
      <Route path="/" component={Tasks} />
    </div>
  </Router>
);

export default App;
