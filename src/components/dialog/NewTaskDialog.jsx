import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextInput, Textarea } from "evergreen-ui";
import Dialog from "./Dialog";
import styles from "./NewTaskDialog.module.scss";

const NewTaskDialog = ({ onConfirm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const confirmThenDelete = () => {
    onConfirm(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog
      confirmLabel="Confirm"
      onConfirm={confirmThenDelete}
      title="Add a new task"
      trigger={
        <Button appearance="primary" iconBefore="new-object">
          New Task
        </Button>
      }
    >
      <TextInput
        className={styles.title}
        onChange={e => setTitle(e.target.value)}
        name="task-title"
        placeholder="Title"
        value={title}
        width="100%"
      />

      <Textarea
        onChange={e => setDescription(e.target.value)}
        name="task-description"
        placeholder="Description"
        value={description}
      />
    </Dialog>
  );
};

NewTaskDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired
};

export default NewTaskDialog;
