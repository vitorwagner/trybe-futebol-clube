import { Router } from 'express';
import verifyNewMatch from '../middlewares/verifyNewMatch';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAll(req, res));
router.post('/', verifyNewMatch, (req, res) => matchesController.create(req, res));
router.use(tokenValidation);
router.patch('/:id', (req, res) => matchesController.update(req, res));
router.patch('/:id/finish', (req, res) => matchesController.finish(req, res));

export default router;
