export interface TeamInterface {
    id: string,
    abv: string,
    city: string,
    logo: string,
    wins: string,
    loss: string,
    stats: {
        MLB: any,
        NFL: any,
        NHL: any,
        NBA: any,
    }
}

export interface PlayerInterface {
    id: string,
    name: string,
    age: string,
    birth: string,
    weight: string,
    height: string,
    avatar: string,
    teamAbv: string,
    jersey: string,
    pos: string,
    throw: string | null,
    school: string | null,
}

export interface MatchInterface {
    id: string,
    type: string,
    date: string,
    time: string,
    status: string,
    away: string,
    awayLogo: string,
    awayResult: string,
    home: string,
    homeLogo: string,
    homeResult: string
}

export interface TeamOddInterface {
    betName: string;
    totalUnder: string;  
    totalOver: string; 
    awayTeamSpread: any;
    awayTeamSpreadOdds: any;
    homeTeamSpread: any;
    homeTeamSpreadOdds: any;
    awayTeamPuckLineOdds: any;
    awayTeamPuckLine: any;
    homeTeamPuckLineOdds: any;
    homeTeamPuckLine: any;
    totalOverOdds: string;
    totalUnderOdds: string;
    awayTeamMLOdds: string;
    homeTeamMLOdds: string;
}
