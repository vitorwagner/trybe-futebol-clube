import Team from '../database/models/Team.model';
import { ITeam } from '../interfaces';
import { ITeamsService } from './interfaces';
import CreateError from '../utils/generateError';

class TeamsService implements ITeamsService {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  getById = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);

    if (!team) {
      throw new CreateError(404, 'Team not found');
    }
    return team;
  };
}

export default TeamsService;
