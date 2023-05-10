import { Request, Response } from 'express';
import { IUsersService } from '../services/interfaces';
import UsersService from '../services/users.service';

class UsersController {
  usersService: IUsersService;

  constructor(usersService = new UsersService()) {
    this.usersService = usersService;
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const token = await this.usersService.login(email, password);

    res.status(200).json({ token });
  }

  async getRole(req: Request, res: Response): Promise<void> {
    const { email } = res.locals.user;

    const role = await this.usersService.getRole(email);

    res.status(200).json({ role });
  }
}

export default UsersController;
