import React from "react";
import PropTypes from "prop-types";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import styles from "./Task.module.scss";
import { SelectMenu } from "../select-menu";
import { status } from "../../constants";

const options = Object.entries(status).map(([key, { title }]) => ({
  label: title,
  value: title
}));

const Task = ({ status, title, children }) => (
  <Card interactive elevation={Elevation.TWO} className={styles.container}>
    <H5 className={styles.title}>{title}</H5>
    {children}
    <div className={styles.menuButton}>
      <SelectMenu initial={status} options={options} onSelect={item => console.log(item)} />
    </div>
  </Card>
);

Task.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Task;
