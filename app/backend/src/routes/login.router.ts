import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import verifyLogin from '../middlewares/verifyLogin';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();

const usersController = new UsersController();

router.post('/', verifyLogin, (req, res) => usersController.login(req, res));
router.get('/role', tokenValidation, (req, res) => usersController.getRole(req, res));

export default router;
