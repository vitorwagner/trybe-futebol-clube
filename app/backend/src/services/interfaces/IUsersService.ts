// import { ILogin } from '../../interfaces';

export interface IUsersService {
  login(email: string, password: string): Promise<string | null>;
  getRole(email: string): Promise<string | null>;
}
