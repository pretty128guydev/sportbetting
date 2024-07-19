// BettingCard.tsx
import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import BettingDetails from '../generals/BettingDetails';

const BettingCard: React.FC<any> = ({ teamOddData }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(teamOddData[0]);

  useEffect(() => {    
    if (!teamOddData) return;    
    setSelectedItem(teamOddData[0]);    
  }, [teamOddData]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setExpanded(false); // Close dropdown after selecting an item
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <BettingDetails onItemClick={handleItemClick} teamOddData={teamOddData} />
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="betting-card">
      <Dropdown overlay={menu} visible={expanded} onVisibleChange={toggleExpanded}>
        <Typography.Link>
          <Space>
            <div
              style={{
                marginTop: 10,
                border: '1px solid lightblue',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span>{selectedItem?.betName}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'blue' }}>Under</span>
                <span>{selectedItem?.totalUnder}</span>
              </div>
              {/* <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'green' }}>Total Under Odds</span>
                <span>{selectedItem.totalUnderOdds}</span>
              </div> */}
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'red' }}>Over</span>
                <span>{selectedItem?.totalOver}</span>
              </div>
              {/* <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'blue' }}>Total Over Odds</span>
                <span>{selectedItem.totalOverOdds}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'green' }}>Away Team Run Line</span>
                <span>{selectedItem.awayTeamRunLine}</span>  
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'red' }}>Away Team Run Line Odds</span>
                <span>{selectedItem.awayTeamRunLineOdds}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'green' }}>Away Team ML Odds</span>
                <span>{selectedItem.awayTeamMLOdds}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'red' }}>Home Team Run Line</span>
                <span>{selectedItem.homeTeamRunLine}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'blue' }}>Home Team Run Line Odds</span>
                <span>{selectedItem.homeTeamRunLineOdds}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <span style={{ color: 'red' }}>Home Team ML Odds</span>
                <span>{selectedItem.homeTeamMLOdds}</span>
              </div> */}
              <DownOutlined />
            </div>
          </Space>
        </Typography.Link>
      </Dropdown>
    </div>
  );
};

export default BettingCard;
