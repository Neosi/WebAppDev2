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
            <Layout style={{ padding: "24px 24px 24px" }}>
              <Content className="content">
                <Switch>
                  <Route path="/characters">
                    CHARACTERS
                  </Route>
                  <Route path="/races">
                    RACES
                  </Route>
                  <Route path="/personality">
                    PERSONALITY
                  </Route>
                  <Route path="/tags">
                    TAGS
                  </Route>
                  <Route path="/relationships">
                    RELATIONSHIPS
                  </Route>
                  <Route path="/">
                    HOME
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
