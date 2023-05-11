import { ILeaderboardRow } from '../../interfaces';

export interface ILeaderboardService {
  getHomeLeaderboard(): Promise<ILeaderboardRow[]>;
  getAwayLeaderboard(): Promise<ILeaderboardRow[]>;
  getFullLeaderboard(): Promise<ILeaderboardRow[]>;
}
