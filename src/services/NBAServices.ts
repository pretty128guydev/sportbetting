import axios from 'axios';

const API_KEY = process.env.REACT_APP_NBA_API_KEY || '5e22851e9bmsh13a293d89eb2cc6p1e551ejsn81c28c0390cf';
const API_HOST = 'tank01-fantasy-stats.p.rapidapi.com';
const API_URL_GetNBATeams = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams?schedules=false&rosters=false&topPerformers=true&teamStats=true&statsToGet=averages';
const API_URL_GetNBAPlayerList = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerList';

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


export const fetchNBATeams = async () => {
  return await createAPIRequest(API_URL_GetNBATeams);
};

export const fetchNBATeamSchedule = async (teamAbv: string, season: string) => {
  const API_URL_GetNBATeamSchedule = `https://tank01-fantasy-stats.p.rapidapi.com/getNBATeamSchedule?teamAbv=${teamAbv}&season=${season}`;
  return await createAPIRequest(API_URL_GetNBATeamSchedule);
};

export const fetchNBAPlayerList = async () => {
  return await createAPIRequest(API_URL_GetNBAPlayerList);
};

export const fetchNBAPlayerInfo = async (playerName: string) => {
  const API_URL_GetNBAPlayerInfo = `https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo?playerName=${playerName}&statsToGet=averages`;
  return await createAPIRequest(API_URL_GetNBAPlayerInfo);
};

export const fetchNBABettingOdds = async (gameDate: string) => {
  const API_URL_GetNBABettingOdds = `https://tank01-fantasy-stats.p.rapidapi.com/getNBABettingOdds?gameDate=${gameDate}`; 
  return await createAPIRequest(API_URL_GetNBABettingOdds);
};

export const fetchNBAGamesForPlayer = async (playerID: string, season: string) => {
  const API_URL_GetNBAGamesForPlayer = `https://tank01-fantasy-stats.p.rapidapi.com/getNBAGamesForPlayer?playerID=${playerID}&season=${season}&fantasyPoints=true&pts=1&reb=1.25&stl=3&blk=3&ast=1.5&TOV=-1&mins=0&doubleDouble=0&tripleDouble=0&quadDouble=0`;
  return await createAPIRequest(API_URL_GetNBAGamesForPlayer);
};
