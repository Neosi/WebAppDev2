import React from "react";
import { Layout, Menu } from "antd";

export default { title: "Headings" };

const { Header } = Layout;

export const Heading = () => (
  <Header className="header" style={{ height: "48px" }}>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ lineHeight: "48px" }}
    >
      <Menu.Item key="1">tbFLIP Character Builder</Menu.Item>
    </Menu>
  </Header>
);
