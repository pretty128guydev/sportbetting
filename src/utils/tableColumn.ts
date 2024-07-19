import { TeamOddInterface } from '../components/interfaces/Interfaces';
import type { TableColumnsType } from 'antd';

export const teamOddColumns1: TableColumnsType<TeamOddInterface> = [
    {
      title: 'Bet Name',
      dataIndex: 'betName',
      key: 'betName',
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Total Under',
      dataIndex: 'totalUnder',
      key: 'totalUnder',
    },
    {
      title: 'Total Over',
      dataIndex: 'totalOver',
      key: 'totalOver',
    },
    {
      title: 'AwayTeam RunLineOdds',
      dataIndex: 'awayTeamPuckLineOdds',
      key: 'awayTeamPuckLineOdds',
    },
    {
      title: 'AwayTeam RunLine',
      dataIndex: 'awayTeamPuckLine',
      key: 'awayTeamPuckLine',
    },
    {
      title: 'HomeTeam RunLineOdds',
      dataIndex: 'homeTeamPuckLineOdds',
      key: 'homeTeamPuckLineOdds',
    },
    {
      title: 'HomeTeam RunLine',
      dataIndex: 'homeTeamPuckLine',
      key: 'homeTeamPuckLine',
    },
    {
      title: 'Total OverOdds',
      dataIndex: 'totalOverOdds',
      key: 'totalOverOdds',
    },
    {
      title: 'Total UnderOdds',
      dataIndex: 'totalUnderOdds',
      key: 'totalUnderOdds',
    },
    {
      title: 'AwayTeam MLOdds',
      dataIndex: 'awayTeamMLOdds',
      key: 'awayTeamMLOdds',
    },
    {
      title: 'HomeTeam MLOdds',
      dataIndex: 'homeTeamMLOdds',
      key: 'homeTeamMLOdds',
    },
];

export const teamOddColumns2: TableColumnsType<TeamOddInterface> = [
    {
      title: 'Bet Name',
      dataIndex: 'betName',
      key: 'betName',
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Total Under',
      dataIndex: 'totalUnder',
      key: 'totalUnder',
    },
    {
      title: 'Total Over',
      dataIndex: 'totalOver',
      key: 'totalOver',
    },
    {
      title: 'Away Team Spread',
      dataIndex: 'awayTeamSpread',
      key: 'awayTeamSpread',
    },
    {
      title: 'Away Team Spread Odds',
      dataIndex: 'awayTeamSpreadOdds',
      key: 'awayTeamSpreadOdds',
    },
    {
      title: 'Home Team Spread',
      dataIndex: 'homeTeamSpread',
      key: 'homeTeamSpread',
    },
    {
      title: 'Home Team Spread Odds',
      dataIndex: 'homeTeamSpreadOdds',
      key: 'homeTeamSpreadOdds',
    },
    {
      title: 'Total Over Odds',
      dataIndex: 'totalOverOdds',
      key: 'totalOverOdds',
    },
    {
      title: 'Total Under Odds',
      dataIndex: 'totalUnderOdds',
      key: 'totalUnderOdds',
    },
    {
      title: 'Away Team ML Odds',
      dataIndex: 'awayTeamMLOdds',
      key: 'awayTeamMLOdds',
    },
    {
      title: 'Home Team ML Odds',
      dataIndex: 'homeTeamMLOdds',
      key: 'homeTeamMLOdds',
    },
];

export const teamOddColumns3: TableColumnsType<TeamOddInterface> = [
    {
      title: 'Bet Name',
      dataIndex: 'betName',
      key: 'betName',
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Total Under',
      dataIndex: 'totalUnder',
      key: 'totalUnder',
    },
    {
      title: 'Total Over',
      dataIndex: 'totalOver',
      key: 'totalOver',
    },
    {
      title: 'Away Team Puck Line Odds',
      dataIndex: 'awayTeamPuckLineOdds',
      key: 'awayTeamPuckLineOdds',
    },
    {
      title: 'Away Team Puck Line',
      dataIndex: 'awayTeamPuckLine',
      key: 'awayTeamPuckLine',
    },
    {
      title: 'Home Team Puck Line Odds',
      dataIndex: 'homeTeamPuckLineOdds',
      key: 'homeTeamPuckLineOdds',
    },
    {
      title: 'Home Team Puck Line',
      dataIndex: 'homeTeamPuckLine',
      key: 'homeTeamPuckLine',
    },
    {
      title: 'Total Over Odds',
      dataIndex: 'totalOverOdds',
      key: 'totalOverOdds',
    },
    {
      title: 'Total Under Odds',
      dataIndex: 'totalUnderOdds',
      key: 'totalUnderOdds',
    },
    {
      title: 'Away Team ML Odds',
      dataIndex: 'awayTeamMLOdds',
      key: 'awayTeamMLOdds',
    },
    {
      title: 'Home Team ML Odds',
      dataIndex: 'homeTeamMLOdds',
      key: 'homeTeamMLOdds',
    },
];

export const playerOddColumns: TableColumnsType<any> = [
    {
      title: 'Player Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Hits',
      children: [
        {
          title: 'Two',
          dataIndex: 'hitTwo',
          key: 'hitTwo',
        },
        {
          title: 'One',
          dataIndex: 'hitOne',
          key: 'hitOne',
        },
      ]
    },
    {
      title: 'Bases',
      children: [
        {
          title: 'Under',
          dataIndex: 'baseUnder',
          key: 'baseUnder',
        },
        {
          title: 'Over',
          dataIndex: 'baseOver',
          key: 'baseOver',
        },
        {
          title: 'Total',
          dataIndex: 'baseTotal',
          key: 'baseTotal',
        }
      ]
    },
    {
      title: 'Home Runs',
      dataIndex: 'homeRuns',
      key: 'homeRuns',
    },
    {
      title: 'Runs',
      children: [
        {
          title: 'Under',
          dataIndex: 'runsUnder',
          key: 'runsUnder',
        },
        {
          title: 'Over',
          dataIndex: 'runsOver',
          key: 'runsOver',
        },
        {
          title: 'Total',
          dataIndex: 'runsTotal',
          key: 'runsTotal',
        }
      ]
    },
    {
      title: 'RBIS',
      dataIndex: 'rbis',
      key: 'rbis',
    }
];
  