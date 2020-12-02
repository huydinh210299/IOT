import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LayoutMenu.css';

import { ReactComponent as Logo } from '../../assets/images/fashionpng.svg';

import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { IconMap } from 'antd/lib/result';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutMenu(props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {/* <div className='logo' /> */}
        <div
          className="logo"
          style={collapsed ? { padding: '4px' } : { padding: '16px' }}
        >
          <Logo height={collapsed ? '50px' : '100px'} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
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
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, height: '100%' }}
          >
            Bill is a cat.
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Project III - Fashion Store
        </Footer>
      </Layout>
    </Layout>
  );
}

LayoutMenu.propTypes = {};

export default LayoutMenu;
