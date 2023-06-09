import Match from '../database/models/Match.model';
import Leaderboard from '../utils/Leaderboard';
import Team from '../database/models/Team.model';
import { ILeaderboardService } from './interfaces/ILeaderboardService';
import { ILeaderboardRow } from '../interfaces';

class LeaderboardService implements ILeaderboardService {
  getHomeLeaderboard = async (): Promise<ILeaderboardRow[]> => {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });
    return Leaderboard.getHomeLeaderboard(matches, teams);
  };

  getAwayLeaderboard = async (): Promise<ILeaderboardRow[]> => {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });
    return Leaderboard.getAwayLeaderboard(matches, teams);
  };

  getFullLeaderboard = async (): Promise<ILeaderboardRow[]> => {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });
    return Leaderboard.getFullLeaderboard(matches, teams);
  };
}

export default LeaderboardService;
