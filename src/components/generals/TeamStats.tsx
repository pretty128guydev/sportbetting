import React from 'react';
import { Pie, Line } from 'react-chartjs-2';

interface TeamStatsProps {
  title: string;
  data: Record<string, any>;
}

export const TeamStatsPie: React.FC<TeamStatsProps> = ({ title, data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data).map(value => parseInt(value)), // Convert values to numbers if needed
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Customize as needed
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Hover colors
      },
    ],
  };

  return (
    <div>
      <h2>{title}</h2>
      <Pie data={chartData} style={{maxHeight: '40vh'}} />
    </div>
  );
};

export const TeamStatsLine: React.FC<TeamStatsProps> = ({ title, data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data).map(value => parseInt(value)), // Convert values to numbers if needed
        fill: false,
        borderColor: '#FF6384', // Line color
        backgroundColor: '#FF6384', // Fill color for points
        pointBackgroundColor: '#FF6384', // Point fill color
        pointBorderColor: '#FF6384', // Point border color
        pointHoverBackgroundColor: '#FF6384', // Point hover fill color
        pointHoverBorderColor: '#FF6384', // Point hover border color
      },
    ],
  };

  return (
    <div>
      <h2>{title}</h2>
      <Line data={chartData} style={{ maxHeight: '40vh' }} />
    </div>
  );
};
