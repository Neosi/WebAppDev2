import React from "react";

import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";

export default { title: "Sidebar" };

const { SubMenu } = Menu;
const { Sider } = Layout;

export const Sidebar = () => (
  <Sider width={200} style={{ background: "#fff" }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key="1">
        <Link to="/characters">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/characters">Characters</Link>
      </Menu.Item>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="idcard" />
            Attributes
          </span>
        }
      >
        <Menu.Item key="3">Races</Menu.Item>
        <Menu.Item key="4">Personality</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="tags" />
            Relations
          </span>
        }
      >
        <Menu.Item key="5">Tags</Menu.Item>
        <Menu.Item key="6">Relationships</Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
);
