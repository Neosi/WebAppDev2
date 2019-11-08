import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export default { title: "Header" };

export const Heading = props => {
  return (
    <Header className="header" style={{ height: "48px" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "48px" }}
      >
        <Menu.Item key="1">{props.title}</Menu.Item>
      </Menu>
    </Header>
  );
};
