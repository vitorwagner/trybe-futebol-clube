import { Request, Response } from 'express';
import ITeamsService from '../services/interfaces';
import TeamsService from '../services/teams.service';

class TeamsController {
  teamsService: ITeamsService;

  constructor(teamsService = new TeamsService()) {
    this.teamsService = teamsService;
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const teams = await this.teamsService.getAll();

    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const team = await this.teamsService.getById(Number(id));

    if (!team) {
      res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(team);
  }
}

export default TeamsController;
