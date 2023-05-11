// import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { ILeaderboardService } from './interfaces/ILeaderboardService';
import { ILeaderboardRow } from '../interfaces';

const leaderboard = [
  {
    name: 'Palmeiras',
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67,
  },
  {
    name: 'Corinthians',
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: 80,
  },
];

class LeaderboardService implements ILeaderboardService {
  getHomeLeaderboard = async (): Promise<ILeaderboardRow[]> => {
    const teams = await Team.findAll();
    console.log(teams);
    return leaderboard;
  };

  getAwayLeaderboard = async (): Promise<ILeaderboardRow[]> => {
    const teams = await Team.findAll();
    console.log(teams, 2);
    return leaderboard;
  };

  getFullLeaderboard = async (): Promise<ILeaderboardRow[]> => {
    const teams = await Team.findAll();
    console.log(teams, 1);
    return leaderboard;
  };
}

export default LeaderboardService;
