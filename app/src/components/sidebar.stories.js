import React from "react";

import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";

export default { title: "Sidebar" };

const { SubMenu } = Menu;
const { Sider } = Layout;

export class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="0">
            <Link to="/">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/builder">
              <Icon type="user-add" />  <span>Builder</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/characters"><Icon type="team" /><span>Characters</span></Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="idcard" />
                <span>Attributes</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/races">Races</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/class">Class</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/personality">Personality</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="tags" />
                <span>Relations</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <Link to="/tags">Tags</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/relationships">Relationships</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }

}
