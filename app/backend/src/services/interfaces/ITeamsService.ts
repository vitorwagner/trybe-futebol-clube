import ITeam from '../../interfaces';

export interface ITeamsService {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}
