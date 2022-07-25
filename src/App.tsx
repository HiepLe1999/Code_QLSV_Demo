import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {Home} from "./components/Student/Home"
import {Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          onClick={onClick}
          selectedKeys={[current]}
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: <a href="/">Trang chủ</a>,
            },
            {
              key: "2",
              label: <Link to="/liststudent">Sinh viên</Link>,
            },
            {
              key: "3",
              label: <Link to="/classstudent">Lớp</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: window.innerHeight,
          }}
        >
          <div>
          <Home/>
          </div>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
