import React from 'react';
import { Card, Row, Col, Avatar } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
// Component
import Loader from '../gadgets/Loader';
// Interface
import { MatchInterface } from '../interfaces/Interfaces';

interface MatchCardProps {
  matchData: MatchInterface;
}

const MatchCard: React.FC<MatchCardProps> = ({ matchData }) => {
  if(!matchData) return <Loader />;
  return (
    <Card style={{ margin: 10 }}>
      <Row align="middle" justify="space-between">
        <Col span={8} style={{ textAlign: 'center' }}>
          <Avatar size={32} src={matchData.awayLogo} icon={<TeamOutlined />} />
          <div>{matchData?.away}</div>
          <div>{matchData?.awayResult}</div>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'red' }}>VS</div>
          <div style={{ fontSize: '10px', color: 'gray' }}>{matchData?.date}</div>
          <div style={{ fontSize: '10px', color: 'gray' }}>{matchData?.time}</div>
          <div style={{ fontSize: '10px', color: 'gray' }}>{matchData?.status}</div>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <Avatar size={32} src={matchData.homeLogo} icon={<TeamOutlined />} />
          <div>{matchData?.home}</div>
          <div>{matchData?.homeResult}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default MatchCard;
