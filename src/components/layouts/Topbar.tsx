import React, { useContext } from 'react';
import { Layout, Space, Typography, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import AuthContext from '../../context/authContext';
import './Topbar.css';

const { Header } = Layout;

const Topbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); 
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="left-content">
        <img src="/img/logo.webp" alt="Logo" style={{ height: '50px', marginTop: '15px' }} />
      </div>
      <div className="right-content">
        <Space>
          {user && (
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Typography.Text>{user.name}</Typography.Text>
                <DownOutlined />
              </Space>
            </Dropdown>
          )}
        </Space>
      </div>
    </Header>
  );
};

export default Topbar;
