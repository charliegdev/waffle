import React from "react";
import PropTypes from "prop-types";
import { Card, Elevation, H5 } from "@blueprintjs/core";
import styles from "./Task.module.scss";

const Task = ({ title, children }) => (
  <Card interactive elevation={Elevation.TWO} className={styles.container}>
    <H5 className={styles.title}>{title}</H5>
    {children}
  </Card>
);

Task.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Task;
