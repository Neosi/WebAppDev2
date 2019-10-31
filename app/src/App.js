import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Sidebar } from "./components/sidebar.stories"
import { Heading } from "./components/header.stories"
const { SubMenu } = Menu;
const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Heading/>
          <Layout>
            <Sidebar/>
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
      </Router>
    </div>
  );
}

export default App;
