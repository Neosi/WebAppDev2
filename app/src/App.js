import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import { Sidebar } from "./components/sidebar.stories";
import { Heading } from "./components/header.stories";
import { CharacterPage } from "./components/character";
import RacePage from "./components/race";
import ClassPage from "./components/class";
<<<<<<< HEAD
import Builder from "./components/builder"
=======
import CharacterView from "./components/character.view"
>>>>>>> 7256016c2cf5820f3e3e43698750986d38fb24c3
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
                    <CharacterPage />
                  </Route>
                  <Route path="/races">
                    <RacePage />
                  </Route>
                  <Route path="/class">
                    <ClassPage />
                  </Route>
                  <Route path="/character">
                    <CharacterView/>
                  </Route>
<<<<<<< HEAD
                  <Route path="/builder">
                    <Builder/>
                  </Route>
                  <Route path="/races"><RacePage/></Route>
                  <Route path="/class"><ClassPage/></Route>
=======
>>>>>>> 7256016c2cf5820f3e3e43698750986d38fb24c3
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
