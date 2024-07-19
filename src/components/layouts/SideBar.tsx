import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined, VerticalAlignTopOutlined, LogoutOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import AuthContext from '../../context/authContext';

const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { logout } = useContext(AuthContext);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout(); // Call your logout function from context
    navigate('/'); // Navigate to login page after logout
  };

  return (
    <>
      <FloatButton
        style={{ right: 24 }}
        icon={<SettingOutlined />}
        onClick={handleToggle}
      />
      {!open && (
        <FloatButton.Group
          style={{ right: 24 }}
          trigger="click"
          type='primary'
          icon={<SettingOutlined />}
        >
          <FloatButton onClick={() => navigate('/mlb')} tooltip={<div>MLB</div>} type='primary' icon={<img src='/img/football.webp' alt="MLB" style={{ width: '100%', height: '100%' }} />} />
          <FloatButton onClick={() => navigate('/nfl')} tooltip={<div>NFL</div>} type='primary' icon={<img src='/img/football2.webp' alt="NFL" style={{ width: '100%', height: '100%' }} />} />
          <FloatButton onClick={() => navigate('/nhl')} tooltip={<div>NHL</div>} type='primary' icon={<img src='/img/nhl.png' alt="NHL" style={{ width: '100%', height: '100%' }} />} />
          <FloatButton onClick={() => navigate('/nba')} tooltip={<div>NBA</div>} type='primary' icon={<img src='/img/nba.png' alt="NBA" style={{ width: '100%', height: '100%' }} />} />
          <FloatButton onClick={handleLogout} tooltip={<div>Logout</div>} type='primary' icon={<LogoutOutlined />} />
          <FloatButton.BackTop tooltip={<div>Go to Top</div>} type='primary' icon={<VerticalAlignTopOutlined />} />
        </FloatButton.Group>
      )}
    </>
  );
};

export default SideBar;
