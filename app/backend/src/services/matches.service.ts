import Match from '../database/models/Match.model';
import { IMatch, INewMatch } from '../interfaces';
import { IMatchesService } from './interfaces';
import CreateError from '../utils/generateError';
import Team from '../database/models/Team.model';

class MatchesService implements IMatchesService {
  getAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  getByInProgress = async (query: string): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      where: { inProgress: JSON.parse(query) },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  create = async (newMatch: INewMatch): Promise<IMatch> => {
    const teamCheck = await Team.count({
      where: { id: [newMatch.homeTeamId, newMatch.awayTeamId] },
    });

    if (teamCheck !== 2) {
      throw new CreateError(404, 'There is no team with such id!');
    }

    const match = await Match.create({
      ...newMatch,
      inProgress: true,
    });

    return match;
  };

  update = async (id: number, updatedMatch: IMatch): Promise<IMatch> => {
    const match = await Match.findByPk(id);

    if (!match) {
      throw new CreateError(404, 'Match not found');
    }

    await match.update(updatedMatch);

    return match;
  };

  finish = async (id: number): Promise<string> => {
    const match = await Match.findByPk(id);

    if (!match) {
      throw new CreateError(404, 'Match not found');
    }

    await match.update({ inProgress: false });

    return 'Finished';
  };
}

export default MatchesService;
