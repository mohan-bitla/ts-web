import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, theme } from 'antd';
import {
  CarOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  ShareAltOutlined,
  BarChartOutlined,
  RocketOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/bookings',
      icon: <CarOutlined />,
      label: 'Bookings',
    },
    {
      key: '/services',
      icon: <BarChartOutlined />,
      label: 'Services',
    },
    {
      key: '/charters',
      icon: <RocketOutlined />,
      label: 'Charters',
    },
    {
      key: '/accounts',
      icon: <BankOutlined />,
      label: 'Accounts',
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
    },
    {
      key: '/manage',
      icon: <AppstoreOutlined />,
      label: 'Manage',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Operational Dashboard',
    },
    {
      key: '/security',
      icon: <SafetyCertificateOutlined />,
      label: 'Security Controls',
    },
    {
      key: '/b2b',
      icon: <TeamOutlined />,
      label: 'B2B Network',
    },
    {
      key: '/chart-sharing',
      icon: <ShareAltOutlined />,
      label: 'Chart Sharing',
    },
    {
      key: '/new-reports',
      icon: <FileTextOutlined />,
      label: 'New Reports',
    },
  ];

  const userMenu = [
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        style={{ 
          background: '#ff4d00', // Orange base from screenshot
        }}
        theme="dark"
        width={220}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ background: '#ff4d00' }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#ff4d00', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
            Unique Travels - Simply Manage Travels
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'white' }}>Welcome, {user?.name || 'User'}</span>
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: '#fff', color: '#ff4d00' }} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
