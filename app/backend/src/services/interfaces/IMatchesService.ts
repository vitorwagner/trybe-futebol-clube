import { IMatch } from '../../interfaces';

export interface IMatchesService {
  getAll(): Promise<IMatch[]>;
  getByInProgress(query: string): Promise<IMatch[]>;
  create(newMatch: IMatch): Promise<IMatch>;
  update(id: number, updatedMatch: IMatch): Promise<IMatch>;
  finish(id: number): Promise<string>;
}
