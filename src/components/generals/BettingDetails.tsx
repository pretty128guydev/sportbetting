// BettingDetails.tsx
import React from 'react';

interface BettingDetailsProps {
  teamOddData: any[];
  onItemClick: (item: any) => void; 
}

const BettingDetails: React.FC<BettingDetailsProps> = ({ teamOddData, onItemClick }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {teamOddData.map((item, index) => (
        <div
          key={index}
          className="betting-details"
          style={{
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onClick={() => onItemClick(item)} 
        >
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span>{item.betName}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'blue' }}>Total Under</span>
            <span>{item.totalUnder}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'green' }}>Total Under Odds</span>
            <span>{item.totalUnderOdds}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'red' }}>Total Over</span>
            <span>{item.totalOver}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'blue' }}>Total Over Odds</span>
            <span>{item.totalOverOdds}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'green' }}>Away Team Run Line</span>
            <span>{item.awayTeamRunLine}</span>  
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'red' }}>Away Team Run Line Odds</span>
            <span>{item.awayTeamRunLineOdds}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'green' }}>Away Team ML Odds</span>
            <span>{item.awayTeamMLOdds}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'red' }}>Home Team Run Line</span>
            <span>{item.homeTeamRunLine}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'blue' }}>Home Team Run Line Odds</span>
            <span>{item.homeTeamRunLineOdds}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <span style={{ color: 'red' }}>Home Team ML Odds</span>
            <span>{item.homeTeamMLOdds}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BettingDetails;
