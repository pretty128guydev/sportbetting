import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Badge, Select, Tag, Card, Table, Tabs } from 'antd';
import { Avatar, Divider, Tooltip } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
// Interfaces
import { TeamInterface, PlayerInterface, MatchInterface, TeamOddInterface } from '../../components/interfaces/Interfaces';
// Custom Components
import PaymentComponent from '../../components/generals/PaymentComponent';
import Topbar from '../../components/layouts/Topbar';
import TeamsCarousel from '../../components/generals/TeamsCarousel';
import { NHLTeamCard } from '../../components/generals/TeamCard';
import MatchCard from '../../components/generals/MatchCard';
import { PlayerCard } from '../../components/generals/PlayerCard';
import PlayerStats from '../../components/generals/PlayerStats';
// import BettingCard from '../../generals/BettingCard';
import SideBar from '../../components/layouts/SideBar';
// API Calls
import { fetchNHLTeamSchedule, fetchNHLBettingOdds, fetchNHLGamesForPlayer, fetchNHLPlayerInfo } from '../../services/NHLServices';
// Utils
import { filterGamesByFilterOptions } from '../../utils/AnalyseGameType';
import AuthContext from '../../context/authContext';
import { teamOddColumns3 } from '../../utils/tableColumn';
// Mockup Data
import { NHLTeams, NHLPlayers } from '../../mockup/NHLData';
// Chart.js Error Fix
import { Chart, registerables } from 'chart.js';
import { get } from 'http';
Chart.register(...registerables);

const tagsData = ['Home', 'Away', 'H2H', 'B2B', 'Regular Season', 'Playoffs'];

const NHL: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useContext(AuthContext);
  const [isExpired, setIsExpired] = useState(false);
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamInterface | null>(null);
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const [teamPlayers, setTeamPlayers] = useState<PlayerInterface[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInterface | null>(null);
  const [selectedPlayerInfo, setSelectedPlayerInfo] = useState<PlayerInterface | null>(null);
  const [schedule, setSchedule] = useState<MatchInterface[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);  // filterOptions
  const [upComingMatch, setUpComingMatch] = useState<any | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [playerGameStats, setPlayerGameStats] = useState<any>(null);
  const [filteredPlayerGameStats, setFilteredPlayerGameStats] = useState<any>(null);
  const [teamOddData, setTeamOddData] = useState<TeamOddInterface[]>([]);
  const [loadingTeamsData, setLoadingTeamsData] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingTeamSchedule, setLoadingTeamSchedule] = useState(true);
 
  const getPlayersData = async () => {
    let tmp_players: PlayerInterface[] = [];
    try {
      // const result = await fetchNHLPlayerList();
      if (NHLPlayers.statusCode === 200) {
        NHLPlayers.body?.map((player: any) => {
          const tmp_player: PlayerInterface = {
            id: player.playerID,
            name: player.longName,
            age: player.age,
            birth: player.bDay,
            weight: player.weight,
            height: player.height,
            avatar: player.espnHeadshot,
            teamAbv: player.team,
            jersey: player.jerseyNum,
            pos: player.pos,
            throw: 'N/A',
            school: player.school,
          };
          tmp_players.push(tmp_player);
        });
        console.log('players => ', tmp_players);
        setPlayers(tmp_players);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPlayers(false);
    }
  };
  
  const getTeamsData = async () => {
    let teams: TeamInterface[] = [];
    try {
      // const res = await fetchNHLTeams();
      if (NHLTeams.statusCode === 200) {
        NHLTeams.body?.map((team: any) => {
          const tmp_team: TeamInterface = {
            id: team.teamID,
            abv: team.teamAbv,
            city: team.teamCity,
            logo: team.espnLogo1,
            wins: (Number(team.standings?.resultDetail?.shootoutWin) + Number(team.standings?.resultDetail?.regulationWin) + Number(team.standings?.resultDetail?.overtimeWin)).toString(),
            loss: (Number(team.standings?.resultDetail?.shootoutLoss) + Number(team.standings?.resultDetail?.regulationLoss) + Number(team.standings?.resultDetail?.overtimeLoss)).toString(),
            stats: {
              MLB: 'N/A',
              NFL: 'N/A',
              NHL: team.teamStats,
              NBA: 'N/A',
            }
          };
          teams.push(tmp_team);
        });
        console.log('teams => ', teams);
        setSelectedTeam(teams[0]);
        setTeams(teams);
      } else {
        toast.error('Oops! Something went wrong. Please try again.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTeamsData(false);
    }
  };

  const getInitialData = async () => {
    await getPlayersData();
    await getTeamsData();
    await getTeamOdds();
  }
  
  const getMatchData = async () => {
    let tmp_matches: MatchInterface[] = [];
    if(!selectedTeam)
      return tmp_matches;
    try {
      const NHLSchedule = await fetchNHLTeamSchedule(selectedTeam?.id);
      if (NHLSchedule.statusCode === 200) {
        NHLSchedule.body?.schedule?.map((match: any) => {
          const tmp_match: MatchInterface = {
            id: match.gameID,
            type: match.seasonType,
            date: match.gameDate,
            time: match.gameTime,
            status: match.gameStatus,
            away: match.away,
            awayLogo: teams.find((team: any) => team.abv === match.away)?.logo || '',
            awayResult: match?.awayResult || 'N/A',
            home: match.home,
            homeLogo: teams.find((team: any) => team.abv === match.home)?.logo || '',
            homeResult: match?.homeResult || 'N/A',
          };
          tmp_matches.push(tmp_match);
        });
        console.log('schedule => ', tmp_matches);
        setSchedule(tmp_matches);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTeamSchedule(false);
    }
  };

  const getSelectedPlayerInfo = async () => {
    if(!selectedPlayer) return;
    try {
      const NHLPlayerInfo = await fetchNHLPlayerInfo(selectedPlayer?.name);
      if (NHLPlayerInfo.statusCode === 200) {
        const tmp_playerInfo: PlayerInterface = {
          id: selectedPlayer?.id || '',
          name: NHLPlayerInfo?.body[0]?.longName,
          age: NHLPlayerInfo?.body[0]?.age,
          birth: NHLPlayerInfo?.body[0]?.bDay,
          weight: NHLPlayerInfo?.body[0]?.weight,
          height: NHLPlayerInfo?.body[0]?.height,
          avatar: NHLPlayerInfo?.body[0]?.espnHeadshot,
          teamAbv: NHLPlayerInfo?.body[0]?.teamAbv,
          jersey: NHLPlayerInfo?.body[0]?.jerseyNum,
          pos: NHLPlayerInfo?.body[0]?.pos,
          throw: 'N/A',
          school: 'N/A',
        };
        setSelectedPlayerInfo(tmp_playerInfo);
        console.log('selectedPlayerInfo => ', selectedPlayerInfo);
      }
    } catch (err) {
      console.log(err);
    } 
  };

  const getPlayerGameStats = async () => {
    if(!selectedPlayer) return;
    try {
      const NHLGamesForPlayer = await fetchNHLGamesForPlayer(selectedPlayer?.id);
      if (NHLGamesForPlayer.statusCode === 200) {
        setPlayerGameStats(NHLGamesForPlayer.body);
        console.log('playerGameStats => ', playerGameStats);
      }
    } catch (err) {
      console.log(err);
    } 
  };

  const getPlayerData = async () => {
    if(!selectedPlayer) return;
    await getSelectedPlayerInfo();
    await getPlayerGameStats();
  };

  const getTeamOdds = async () => {
    let tmp_teamOdds: TeamOddInterface[] = [];
    const betkeys: string[] = ["betmgm", "bet365", "fanduel", "hardrock", "pointsbet", "betrivers", "caesars_sportsbook", "draftkings"];
    
    if (!selectedMatch) return;
    
    try {
      const NHLBettingOdds = await fetchNHLBettingOdds(selectedMatch.date);
      console.log('NHLBettingOdds => ', NHLBettingOdds);  
      if (NHLBettingOdds.statusCode === 200) {
        const oddData = NHLBettingOdds?.body[selectedMatch.id];
        if (oddData != null) {
          betkeys.forEach((key) => {
            if (oddData.hasOwnProperty(key)) {
              const odds: any = oddData[key];
              const tmp_teamOdd: TeamOddInterface = {
                betName: key,
                totalUnder: odds?.totalUnder || 'N/A',
                totalOver: odds?.totalOver || 'N/A',
                awayTeamPuckLineOdds: odds?.awayTeamPuckLineOdds || 'N/A',
                homeTeamPuckLineOdds: odds?.homeTeamPuckLineOdds || 'N/A',
                awayTeamPuckLine: odds?.awayTeamPuckLine || 'N/A',
                homeTeamPuckLine: odds?.homeTeamPuckLine || 'N/A',  
                totalOverOdds: odds?.totalOverOdds || 'N/A',
                totalUnderOdds: odds?.totalUnderOdds || 'N/A',
                awayTeamMLOdds: odds?.awayTeamMLOdds || 'N/A',
                homeTeamMLOdds: odds?.homeTeamMLOdds || 'N/A',
                awayTeamSpread: odds?.awayTeamSpread || 'N/A',
                awayTeamSpreadOdds: odds?.awayTeamSpreadOdds || 'N/A',
                homeTeamSpread: odds?.homeTeamSpread || 'N/A',
                homeTeamSpreadOdds: odds?.homeTeamSpreadOdds || 'N/A',
              };
              tmp_teamOdds.push(tmp_teamOdd);
            } else {
              const tmp_teamOdd: TeamOddInterface = {
                betName: key,
                totalUnder: 'N/A',
                totalOver: 'N/A',
                awayTeamPuckLine: 'N/A',
                homeTeamPuckLine: 'N/A',
                awayTeamPuckLineOdds: 'N/A',
                homeTeamPuckLineOdds: 'N/A',
                awayTeamMLOdds: 'N/A',
                homeTeamMLOdds: 'N/A',
                totalUnderOdds: 'N/A',
                totalOverOdds: 'N/A',
                awayTeamSpread: 'N/A',
                awayTeamSpreadOdds: 'N/A',
                homeTeamSpread: 'N/A',
                homeTeamSpreadOdds: 'N/A',
              };
              tmp_teamOdds.push(tmp_teamOdd);
            }
          });
          console.log('tmp_teamOdds => ', tmp_teamOdds);      
        } else {
          toast.warning('No odds available for that date');
          console.log('No odds available for that date');
        }
        console.log('tmp_teamOdds => ', tmp_teamOdds);
        setTeamOddData(tmp_teamOdds);
      } else {
        setTeamOddData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkExpired = () => {
      if(new Date(user?.expireDate3) > new Date()) {
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    checkExpired();
    
    const interval = setInterval(() => {
      checkExpired();
    }, 60000);
    return () => clearInterval(interval);
  }, [user.expireDate3]);
  
  useEffect(() => {
    if(!isExpired) {
      getInitialData();
    }
  }, [isExpired]);  
  
  useEffect(() => {
    setSelectedTeam(teams[0]);
    console.log('selectedTeam => ', selectedTeam);
  }, [teams]);

  useEffect(() => {
    getMatchData();
  }, [selectedTeam]);

  useEffect(() => {
    setTeamPlayers(players.filter((player: PlayerInterface) => player.teamAbv === selectedTeam?.abv));
    console.log('teamPlayers => ', teamPlayers);
  }, [selectedTeam, players]);

  useEffect(() => {
    setSelectedPlayer(teamPlayers[0]);
    console.log('selectedPlayer => ', selectedPlayer);  
  }, [teamPlayers]);

  useEffect(() => {
    getPlayerData();
  }, [selectedPlayer]);

  useEffect(() => {
    if (!schedule || schedule.length === 0) return;
  
    const today = new Date();
    const todayStr = today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');
  
    // Find the first upcoming match
    const upcomingMatch = schedule.find((match) => {
      return parseInt(match.date) >= parseInt(todayStr); 
    });
  
    setUpComingMatch(upcomingMatch || null); 
    console.log('upcomingMatch => ', upcomingMatch);

    setSelectedMatch(schedule[0]);
    console.log('selectedMatch => ', selectedMatch);
  }, [schedule]);

  useEffect(() => {
    if(!selectedMatch) return;
    getTeamOdds();
  }, [selectedMatch]);
  
  useEffect(() => {
    if (!playerGameStats || !selectedTeam) return;
    setFilteredPlayerGameStats(filterGamesByFilterOptions(playerGameStats, selectedTags, selectedTeam?.abv, schedule));
  }, [playerGameStats, selectedTags]);
  
  // Select Team
  const handleTeamSelect = (team: TeamInterface) => {
    setSelectedTeam(team);
  };

  // Select Player
  const handlePlayerSelect = (playerID: string) => {
    let selected: PlayerInterface | null;
    selected = teamPlayers.find((player: PlayerInterface) => player.id === playerID) || null;
    setSelectedPlayer(selected);
  };

  // Tag Filter
  const handleChange = (tag: string, checked: boolean) => {
    const toggleTags = (group: string[], tag: string, checked: boolean) => {
      const nextSelectedTags = checked
        ? [...selectedTags.filter((t) => !group.includes(t)), tag]
        : selectedTags.filter((t) => t !== tag);
      return nextSelectedTags;
    };

    let nextSelectedTags = selectedTags;

    if (['Home', 'Away'].includes(tag)) {
      nextSelectedTags = toggleTags(['Home', 'Away'], tag, checked);
    } else if (['Regular Season', 'Playoffs'].includes(tag)) {
      nextSelectedTags = toggleTags(['Regular Season', 'Playoffs'], tag, checked);
    } else {
      nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
    }

    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };


  return (
    <>
      <Topbar />
      {
        isExpired ? <PaymentComponent matchType="NHL" /> : 
        <>
          <div style={{ padding: '10px', marginTop: '10px' }}>
            <TeamsCarousel teams={teams} onSelect={handleTeamSelect} />
            <NHLTeamCard teamData={selectedTeam} />
          </div>     
          <div style={{ padding: '10px'}}>
            <Row>
              <Col span={4} style={{ paddingRight: '10px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '5px'}}>
                  <Badge.Ribbon text="Team Schedule">
                    <div style={{ maxHeight: '150vh', overflowY: 'scroll' }}>
                      {
                        schedule.map((item: MatchInterface) => (
                          <MatchCard key={item.id} matchData={item} />
                        ))
                      }
                    </div>
                  </Badge.Ribbon>
                </div>  
              </Col>
              <Col span={20}>
                <div style={{ padding: '10px' }}>
                  <Divider>Team Players</Divider>
                  <Avatar.Group style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                      teamPlayers.map((player: PlayerInterface, index: number) => (
                        <Tooltip title={player.name} placement="top">
                          <Avatar key={index} size={50} style={{ backgroundColor: '#f56a00' }}>{player.name.split(' ')[0].charAt(0) + player.name.split(' ')[1].charAt(0)}</Avatar>
                        </Tooltip>
                      ))
                    }
                  </Avatar.Group>
                  <Row>
                    <Col span={5}>
                      <Badge.Ribbon text="Player Stats" color='green'>
                        <Row style={{ padding: 30, border: '1px solid lightblue', borderRadius: '5px', marginTop: 70, backgroundColor: 'white' }}>  
                          <div>
                            {tagsData.map<React.ReactNode>((tag) => (
                              <Tag.CheckableTag
                                key={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={(checked) => handleChange(tag, checked)}
                                style={{ marginTop: 10, marginBottom: 10 }}
                              >
                              {tag}
                              </Tag.CheckableTag>
                            ))}
                          </div>
                          <div style={{ marginTop: 30 }}>
                            <Select
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="Search to Player"
                              optionFilterProp="label"
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                              }
                              options={teamPlayers.map((player) => ({
                                value: player.id,
                                label: player.name,
                              }))}
                              onChange={(value) => handlePlayerSelect(value)}
                            />
                            <PlayerCard player={selectedPlayerInfo} />
                          </div>
                        </Row>
                      </Badge.Ribbon>
                    </Col>
                    <Col span={19} style={{ paddingLeft: 30, paddingTop: 80 }}>
                      <PlayerStats propsData={filteredPlayerGameStats} statType={""} keysToDisplay={["shootoutGoals", "powerPlayGoals", "blockedShots", "giveaways", "plusMinus", "goals", "faceoffsWon", "penaltiesInMinutes", "powerPlayAssists", "shots", "powerPlayPoints", "assists", "faceoffs", "penalties", "faceoffsLost", "shifts", "takeaways", "hits", "shotsMissedNet"]}/>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 100 }}>
                    <Divider>Game Odds</Divider>
                    {
                      selectedMatch ? (
                        <Row>
                          <Col span={5}>
                            <Badge.Ribbon text="Game Odds" color='green'>
                              <Card title="" style={{ padding: 10 }}>
                                <Select
                                  showSearch
                                  style={{ width: '100%' }}
                                  placeholder="Search to Match"
                                  optionFilterProp="label"
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                  }
                                  options={schedule.map((item, index) => ({
                                    value: item.id,
                                    label: item.id,
                                  }))}
                                  onChange={(value) => setSelectedMatch(schedule.find((match) => match.id === value))}
                                />
                                <MatchCard matchData={selectedMatch} />
                              </Card>
                            </Badge.Ribbon>
                            <Badge.Ribbon text="Upcoming Game" color='green'>
                              <Card title="" style={{ padding: 10, marginTop: 30 }}>
                                {
                                  upComingMatch ? (
                                    <MatchCard matchData={upComingMatch} />
                                  ) : (<h2 style={{ color: 'red', textAlign: 'center' }}>The season has ended.</h2>)
                                }
                              </Card>
                            </Badge.Ribbon>
                          </Col>
                          <Col span={19} style={{ paddingLeft: 30 }}>
                            <Table
                              columns={teamOddColumns3}
                              dataSource={teamOddData}
                              bordered
                              size="middle"
                              scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                            />
                          </Col>
                        </Row>
                      ) : (<h2 style={{ color: 'red', textAlign: 'center' }}>There are no odds available for this date.</h2>)
                    }
                  </Row>
                </div>
              </Col> 
            </Row>
          </div>
        </>   
      }     
      <SideBar />
      <ToastContainer autoClose={5000} />
    </>
  );
};

export default NHL;
