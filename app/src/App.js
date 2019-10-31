import React from "react";

import "./App.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
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
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    Characters
                  </span>
                }
              >
                <Menu.Item key="1">New</Menu.Item>
                <Menu.Item key="2">View</Menu.Item>
              </SubMenu>
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
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="content">Content</Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
