import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Topbar.module.scss';

const Topbar = () => (
  <Menu mode="horizontal" theme="dark" className={styles.container}>
    <Menu.Item>
      <Link to="/">
        <Icon type="home" />
        Board
      </Link>
    </Menu.Item>
  </Menu>
);

export default Topbar;
