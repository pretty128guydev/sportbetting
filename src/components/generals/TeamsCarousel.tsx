import React from 'react';
import { Carousel, Avatar } from 'antd';
// Interfaces
import { TeamInterface } from '../interfaces/Interfaces';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '120px',
  color: '#fff',
  lineHeight: '100px',
  textAlign: 'center',
  background: '#364d79',
};

const carouselStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

interface CarouselProps {
  teams: TeamInterface[];
  onSelect: (team: TeamInterface) => void;
}

const TeamsCarousel: React.FC<CarouselProps> = ({ teams, onSelect }) => (
  <Carousel arrows infinite={false}>
    {teams?.map((team, index) => (
      <div key={index} style={carouselStyle} onClick={() => onSelect(team)}>
        <div style={contentStyle}>
          <Avatar src={team.logo} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
        </div>
      </div>
    ))}
  </Carousel>
);

export default TeamsCarousel;
