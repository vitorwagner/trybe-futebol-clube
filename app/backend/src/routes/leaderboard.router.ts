import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', (req, res) => leaderboardController.getFullLeaderboard(req, res));
router.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));

export default router;
