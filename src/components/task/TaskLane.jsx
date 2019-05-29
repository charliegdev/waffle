import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Icon } from "@blueprintjs/core";
import styles from "./TaskLane.module.scss";
import { actions } from "../../redux";

const TaskLane = ({ acceptTask, children, color, icon, title, lighterColor }) => (
  <div
    className={styles.container}
    onDragOver={event => event.preventDefault()}
    onDrop={event => {
      event.preventDefault();
      acceptTask(title);
    }}
    style={{
      backgroundColor: color
    }}
  >
    <h2
      className={styles.title}
      style={{
        backgroundColor: lighterColor
      }}
    >
      <span className={styles.titleLeft}>
        <Icon icon={icon} iconSize={20} />
        &nbsp; &nbsp;
        {title}
      </span>
      <span>{children.length}</span>
    </h2>
    {children}
  </div>
);

TaskLane.propTypes = {
  acceptTask: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lighterColor: PropTypes.string
};

TaskLane.defaultProps = {
  color: "#eeeeee",
  lighterColor: "#eeeeee"
};

const mapDispatch = dispatch => bindActionCreators(actions.tasks, dispatch);

export default connect(
  null,
  mapDispatch
)(TaskLane);
