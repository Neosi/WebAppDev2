import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import { Sidebar } from "./components/sidebar.stories";
import { Heading } from "./components/header.stories";
import { CharacterPage } from "./components/character";
import RacePage from "./components/race";
import ClassPage from "./components/class";
const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Heading />
          <Layout>
            <Sidebar />
            <Layout style={{ padding: "24px 24px 24px" }}>
              <Content className="content">
                <Switch>
                  <Route path="/characters">
                    <CharacterPage/>
                  </Route>
                  <Route path="/races"><RacePage/></Route>
                  <Route path="/class"><ClassPage/></Route>
                  <Route path="/personality">PERSONALITY</Route>
                  <Route path="/tags">TAGS</Route>
                  <Route path="/relationships">RELATIONSHIPS</Route>
                  <Route path="/">HOME</Route>
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
