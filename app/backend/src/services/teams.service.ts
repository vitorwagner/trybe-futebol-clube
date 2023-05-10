import Team from '../database/models/Team.model';
import ITeam from '../interfaces';
import ITeamService from './interfaces';

class TeamsService implements ITeamService {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  getById = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    return team;
  };
}

export default TeamsService;
