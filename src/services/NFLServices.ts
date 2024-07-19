import axios from 'axios';

const API_KEY = process.env.REACT_APP_NFL_API_KEY || '5e22851e9bmsh13a293d89eb2cc6p1e551ejsn81c28c0390cf';
const API_HOST = 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com';
const API_URL_GetNFLTeams = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams?rosters=false&schedules=false&topPerformers=false&teamStats=true&teamStatsSeason=2023';
const API_URL_GetNFLPlayerList = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList';

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

export const fetchNFLTeams = async () => {
  return await createAPIRequest(API_URL_GetNFLTeams);
};

export const fetchNFLTeamSchedule = async (teamAbv: string, season: string) => {
  const API_URL_GetNFLTeamSchedule = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeamSchedule?teamAbv=${teamAbv}&season=${season}`;
  return await createAPIRequest(API_URL_GetNFLTeamSchedule);
};

export const fetchNFLPlayerList = async () => {
  return await createAPIRequest(API_URL_GetNFLPlayerList);
};

export const fetchNFLPlayerInfo = async (playerName: string) => {
  const API_URL_GetNFLPlayerInfo = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerInfo?playerName=${playerName}&getStats=true`;
  return await createAPIRequest(API_URL_GetNFLPlayerInfo);
};

export const fetchNFLBettingOdds = async (gameDate: string) => {
  const API_URL_GetNFLBettingOdds = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLBettingOdds?gameDate=${gameDate}`;
  return await createAPIRequest(API_URL_GetNFLBettingOdds);
};

export const fetchNFLGamesForPlayer = async (playerId: string) => {
  const API_URL_GetNFLGamesForPlayer = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForPlayer?playerID=${playerId}&fantasyPoints=true&twoPointConversions=2&passYards=.04&passTD=4&passInterceptions=-2&pointsPerReception=1&carries=.2&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=0&defTD=6&xpMade=1&xpMissed=-1&fgMade=3&fgMissed=-3`;
  return await createAPIRequest(API_URL_GetNFLGamesForPlayer);
};