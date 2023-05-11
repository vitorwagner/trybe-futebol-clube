import { Request, Response } from 'express';
import { IMatchesService } from '../services/interfaces';
import MatchesService from '../services/matches.service';

class MatchesController {
  matchesService: IMatchesService;

  constructor(matchesService = new MatchesService()) {
    this.matchesService = matchesService;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const inProgressQuery = req.query.inProgress as string;

    const matches = inProgressQuery
      ? await this.matchesService.getByInProgress(inProgressQuery)
      : await this.matchesService.getAll();

    res.status(200).json(matches);
  }

  async create(req: Request, res: Response): Promise<void> {
    const newMatch = req.body;

    const match = await this.matchesService.create(newMatch);

    res.status(201).json(match);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedMatch = req.body;

    const match = await this.matchesService.update(Number(id), updatedMatch);

    res.status(200).json(match);
  }

  async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const result = await this.matchesService.finish(Number(id));

    res.status(200).json({ message: result });
  }
}

export default MatchesController;
