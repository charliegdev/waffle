import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Topbar.module.css';

const Topbar = () => (
  <Menu mode="horizontal" theme="dark" className={styles.container}>
    <Menu.Item>
      <Icon type="mail" />
      Navigation One
    </Menu.Item>
    <Menu.Item disabled>
      <Icon type="appstore" />
      Navigation Two
    </Menu.Item>
    <Menu.SubMenu
      title={
        <span className="submenu-title-wrapper">
          <Icon type="setting" />
          Navigation Three - Submenu
        </span>
      }
    >
      <Menu.ItemGroup title="Item 1">
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Item 2">
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
      </Menu.ItemGroup>
    </Menu.SubMenu>
    <Menu.Item key="alipay">
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    </Menu.Item>
  </Menu>
);

export default Topbar;
