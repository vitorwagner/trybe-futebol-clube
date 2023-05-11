import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import verifyNewMatch from '../middlewares/verifyNewMatch';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAll(req, res));

// router.use(tokenValidation);

router.post('/', tokenValidation, verifyNewMatch, (req, res) => matchesController.create(req, res));
router.patch('/:id', tokenValidation, (req, res) => matchesController.update(req, res));
router.patch('/:id/finish', tokenValidation, (req, res) => matchesController.finish(req, res));

export default router;
