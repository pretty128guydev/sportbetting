import axios from 'axios';

const API_KEY = process.env.REACT_APP_NHL_API_KEY || '5e22851e9bmsh13a293d89eb2cc6p1e551ejsn81c28c0390cf';
const API_HOST = 'tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com';
const API_URL_GetNHLTeams = 'https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLTeams?teamStats=true&topPerformers=true&includeDefunctTeams=false';
const API_URL_GetNHLPlayerList = 'https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLPlayerList';

const createAPIRequest = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNHLTeams = async () => {
  return await createAPIRequest(API_URL_GetNHLTeams);
};

export const fetchNHLTeamSchedule = async (teamId: string) => {
  const API_URL_GetNHLTeamSchedule = `https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLTeamSchedule?teamID=${teamId}`;
  return await createAPIRequest(API_URL_GetNHLTeamSchedule);  
};

export const fetchNHLPlayerList = async () => {
  return await createAPIRequest(API_URL_GetNHLPlayerList);
};

export const fetchNHLPlayerInfo = async (playerName: string) => {
  const API_URL_GetNHLPlayerInfo = `https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLPlayerInfo?playerName=${playerName}&getStats=true`;
  return await createAPIRequest(API_URL_GetNHLPlayerInfo);
};

export const fetchNHLBettingOdds = async (gameDate: string) => {
  const API_URL_GetNHLBettingOdds = `https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLBettingOdds?gameDate=${gameDate}`;
  return await createAPIRequest(API_URL_GetNHLBettingOdds);
};

export const fetchNHLGamesForPlayer = async (playerId: string) => {
  const API_URL_GetNHLGamesForPlayer = `https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLGamesForPlayer?playerID=${playerId}&numberOfGames=10`;
  return await createAPIRequest(API_URL_GetNHLGamesForPlayer);
};

