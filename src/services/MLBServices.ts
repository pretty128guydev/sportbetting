import axios from 'axios';

const API_URL_GetTeams = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams?teamStats=true&topPerformers=true';
const API_URL_GetSchedulesByTeam = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamSchedule';
const API_URL_GetPlayerList = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerList';
const API_URL_BettingOdds = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBBettingOdds';
const API_URL_PlayerHistory = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBGamesForPlayer';
const API_URL_PlayerInfo = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerInfo';
const API_HOST = 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com';
const API_KEY = process.env.REACT_APP_MLB_API_KEY || "5e22851e9bmsh13a293d89eb2cc6p1e551ejsn81c28c0390cf";

const createAPIRequest = async (url:string, params = {}) => {
  try {
    const response = await axios.get(url, {
      params,
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
      withCredentials: true, // Consider removing this if not necessary
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMLBTeams = async () => {
  return await createAPIRequest(API_URL_GetTeams);
};

export const fetchMLBTeamSchedule = async (teamAbv: string, season: string) => {
  const params = { teamAbv, season };
  return await createAPIRequest(API_URL_GetSchedulesByTeam, params);
};

export const fetchMLBPlayerList = async () => {
  return await createAPIRequest(API_URL_GetPlayerList);
};

export const fetchMLBBettingOdds = async (gameDate: string) => {
  const params = {
    gameDate: gameDate,
    playerProps: 'true',
  };
  return await createAPIRequest(API_URL_BettingOdds, params);
};

export const fetchMLBGamesForPlayer = async (playerID: string, season: string) => {
  const params = {
    playerID: playerID,
    season: season,
  };
  return await createAPIRequest(API_URL_PlayerHistory, params);
};

export const fetchMLBPlayerInfo = async (playerName: string, season: string) => {
  const params = {
    playerName: playerName,
    getStats: 'false',
    statsSeason: season,
  };
  return await createAPIRequest(API_URL_PlayerInfo, params);
};
