import React from 'react';
import { Card, Avatar, Typography, Row, Col, Badge } from 'antd';
import { HomeTwoTone, SkinTwoTone, RocketTwoTone, CompassTwoTone, CalendarTwoTone, CrownTwoTone } from '@ant-design/icons';
// Component
import ErrorComponent from '../gadgets/Error';
import Loader from '../gadgets/Loader';
// Interfaces
import { PlayerInterface } from '../interfaces/Interfaces';

interface PlayerCardProps {
  player: PlayerInterface | null | undefined; 
}

const { Title, Text } = Typography;

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  if (!player) return <Loader />;

  return (
    <Card style={{ margin: '20px auto', width: '100%' }}>
      <Row justify="center">
        <Avatar size={200} src={player.avatar} />
      </Row>
      <Row justify="center" style={{ marginTop: 10 }}>
        <Title level={4}>{player.name}</Title>
      </Row>
      <Row>
        <Col span={12} style={{ textAlign: 'left' }}>
          <Text><CalendarTwoTone /> {player.birth}</Text><br />
          <Text><CrownTwoTone /> {player.school}</Text><br />
          <Text><strong>W:</strong> {player.weight} lbs</Text><br />
          <Text><strong>H:</strong> {player.height}</Text><br />
        </Col>
        <Col span={12} style={{ textAlign: 'left' }}>
          <Text><HomeTwoTone /><strong> Team:</strong> {player.teamAbv}</Text><br />
          <Text><SkinTwoTone /><strong> Number:</strong> {player.jersey}</Text><br />
          <Text><CompassTwoTone /><strong> Position:</strong> {player.pos}</Text><br />
          <Text><RocketTwoTone /><strong> Throw:</strong> {player?.throw}</Text><br />
        </Col>
      </Row>
    </Card>
  );
};


