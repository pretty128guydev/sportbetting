// Filter games by regular season or playoffs
const filterRegularPlayoffs = (games: any, matches: any[], resultType: string): string[] => {
  const filteredKeys: string[] = [];
  for (let key in games) {
    const gameDetail = matches.find((match: any) => match.gameID === key);
    if (gameDetail?.gameType === 'REGULAR_SEASON' && resultType === 'Regular Season') {
      filteredKeys.push(key);
    } else if (gameDetail?.gameType === 'Playoffs' && resultType === 'Playoffs') {
      filteredKeys.push(key);
    }
  }
  return filteredKeys;
}

// Filter games by home or away
const filterHomeAway = (games: any, filterKey: string, resultType: string): string[] => {
  const filteredKeys: string[] = [];
  for (let key in games) {
    if (resultType === 'Home' && key.split('@')[0].indexOf(filterKey) === -1) {
      filteredKeys.push(key);
    } else if (resultType === 'Away' && key.split('@')[0].indexOf(filterKey) !== -1) {
      filteredKeys.push(key);
    }
  }
  return filteredKeys;
}

// Placeholder for filtering games by B2B or H2H (to be implemented based on specific logic)
const filterH2HB2B = (games: any, resultType: string): string[] => {
  const filteredKeys: string[] = [];
  // Implement your logic here to filter games by B2B or H2H
  return filteredKeys;
}

export const filterGamesByFilterOptions = (games: any, filterOptions: string[], teamAbv: string, matches: any[]): any => {
  if(filterOptions.length === 0) return games;
  const filteredGames: any = {}; // Initialize an object to store filtered games
  
  filterOptions.forEach((filterOption: string) => {
    switch (filterOption) {
      case 'Regular Season':
      case 'Playoffs':
        const keys = filterRegularPlayoffs(games, matches, filterOption);
        keys.forEach((key) => {
          filteredGames[key] = games[key];
        });
        break;
      case 'Home':
      case 'Away':
        const homeAwayKeys = filterHomeAway(games, teamAbv, filterOption);
        homeAwayKeys.forEach((key) => {
          filteredGames[key] = games[key];
        });
        break;
      case 'H2H':
      case 'B2B':
        // Placeholder for filtering by H2H or B2B
        // Example:
        // const h2hB2BKeys = filterH2HB2B(games, filterOption);
        // h2hB2BKeys.forEach((key) => {
        //   filteredGames[key] = games[key];
        // });
        break;
      default:
        break;
    }
  });
  
  return filteredGames;
}
