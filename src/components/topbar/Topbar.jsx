import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Navbar } from "@blueprintjs/core";
import styles from "./Topbar.module.scss";

const Topbar = ({ children }) => (
  <div className={styles.container}>
    <Navbar fixedToTop>
      <Navbar.Group>
        <Navbar.Heading>Waffle</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/">
          <Button className="bp3-minimal" icon="home">
            Home
          </Button>
        </Link>
      </Navbar.Group>
      <Navbar.Group align="right">{children}</Navbar.Group>
    </Navbar>
  </div>
);

Topbar.propTypes = {
  children: PropTypes.node.isRequired
};

export default Topbar;
