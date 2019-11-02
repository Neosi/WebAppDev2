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
        <Link to="/">
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/characters"><Icon type="user" />Characters</Link>
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
        <Menu.Item key="3">
          <Link to="/races">Races</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/personality">Personality</Link>
        </Menu.Item>
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
        <Menu.Item key="5">
          <Link to="/tags">Tags</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/relationships">Relationships</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
);
