import { Request, Response } from 'express';
import { ILeaderboardService } from '../services/interfaces';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  leaderboardService: ILeaderboardService;

  constructor(leaderboardService = new LeaderboardService()) {
    this.leaderboardService = leaderboardService;
  }

  async getHomeLeaderboard(_req: Request, res: Response): Promise<void> {
    const leaderboard = await this.leaderboardService.getHomeLeaderboard();

    res.status(200).json(leaderboard);
  }

  async getAwayLeaderboard(_req: Request, res: Response): Promise<void> {
    const leaderboard = await this.leaderboardService.getAwayLeaderboard();

    res.status(200).json(leaderboard);
  }

  async getFullLeaderboard(_req: Request, res: Response): Promise<void> {
    const leaderboard = await this.leaderboardService.getFullLeaderboard();

    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
