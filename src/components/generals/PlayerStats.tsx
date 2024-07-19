import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';
// Component
import ErrorComponent from '../gadgets/Error';

interface StatsData {
  [key: string]: number | string;
}

interface PlayerStatsProps {
  propsData: {
    [gameId: string]: {
      [statType: string]: StatsData;
    };
  };
  statType: string; // The key for the type of stats (e.g., 'general')
  keysToDisplay: string[];
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ propsData, statType, keysToDisplay }) => {
  if (!propsData) return <ErrorComponent errStr="Loading..." />;

  // Extract game IDs from propsData
  const chartIds = Object.keys(propsData);

  // Prepare datasets dynamically based on keysToDisplay
  const datasets = keysToDisplay.map((key, index) => {
    const data = chartIds.map(chartId => {
      if (statType === "") {
        return propsData[chartId][key];
      } else {
        // Check if propsData[chartId] and propsData[chartId][statType] exist
        if (propsData[chartId] && propsData[chartId][statType]) {
          return propsData[chartId][statType][key];
        }
        return null; // Or a default value if the key is not found
      }
    });

    return {
      label: key,
      backgroundColor: `rgba(${index * 30 % 255}, ${index * 60 % 255}, ${index * 90 % 255}, 0.5)`,
      borderColor: `rgba(${index * 30 % 255}, ${index * 60 % 255}, ${index * 90 % 255}, 1)`,
      borderWidth: 1,
      hoverBackgroundColor: `rgba(${index * 30 % 255}, ${index * 60 % 255}, ${index * 90 % 255}, 1)`,
      hoverBorderColor: `rgba(${index * 30 % 255}, ${index * 60 % 255}, ${index * 90 % 255}, 1)`,
      data,
    };
  });

  // Chart.js data structure
  const data = {
    labels: chartIds,
    datasets,
  };

  // Options for Chart.js
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
            return `${datasetLabel}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <Bar data={data} options={options} />
    </Card>
  );
};

export default PlayerStats;
