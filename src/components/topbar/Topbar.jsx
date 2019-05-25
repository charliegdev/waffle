import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "@blueprintjs/core";
import styles from "./Topbar.module.scss";

const Topbar = () => (
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
    </Navbar>
  </div>
);

export default Topbar;
