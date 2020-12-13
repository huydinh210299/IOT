import React, { useState } from "react";
import PropTypes from "prop-types";
import "./LayoutMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../assets/images/fashionpng.svg";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from "antd";
import {
  BarChartOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IconMap } from "antd/lib/result";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/authAction";
import jwt from "jsonwebtoken";
import logo from "../../assets/images/logo.png";
import logoFull from "../../assets/images/logoFull.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutMenu(props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [timeNow, setTimeNow] = useState(new Date());

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  React.useEffect(() => {
    const timeId = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
    return () => { clearInterval(timeId) };
  }, []);



  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item>{jwt.decode(localStorage.getItem("token")).email}</Menu.Item>
      <Menu.Item onClick={() => dispatch(logoutAction())}>Log out</Menu.Item>
    </Menu>
  );
  const name = jwt.decode(localStorage.getItem("token")).name;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {/* <div className='logo' /> */}
        <div
          className="logo"
          style={collapsed ? { padding: "4px" } : { padding: "4px" }}
        >
          {/* <Logo height={collapsed ? "50px" : "100px"} /> */}
          <img src={collapsed ? logo : logoFull} height={"60px"} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined />}>
            <Link to="/statistic">Statistic</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Link to="/realtime">Realtime</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Member">
            <Menu.Item key="4">Trường</Menu.Item>
            <Menu.Item key="5">Giang</Menu.Item>
            <Menu.Item key="6">Quân</Menu.Item>
            <Menu.Item key="7">Định</Menu.Item>
            <Menu.Item key="8">Cường</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<TeamOutlined />}>
            <Link to="/team">IOT - Nhóm 22</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <div className="header-avatar">
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Button shape="circle" icon={<UserOutlined />}></Button>
            </Dropdown>
          </div>
          <div className="header-name">{name}</div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, height: "100%" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}><h6>Nhóm 22 - {timeNow.toLocaleTimeString()}</h6></Footer>
      </Layout>
    </Layout>
  );
}

LayoutMenu.propTypes = {};

export default LayoutMenu;
