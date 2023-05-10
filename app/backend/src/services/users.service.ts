import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';
import { IUsersService } from './interfaces';
import CreateError from '../utils/generateError';
import { createToken } from '../utils/jwt.utils';

class UsersService implements IUsersService {
  login = async (email: string, password: string): Promise<string | null> => {
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new CreateError(401, 'Invalid email or password');
    }
    const token = createToken(email);

    return token;
  };

  getRole = async (email: string): Promise<string | null> => {
    const user = await User.findOne({ where: { email } });

    return user?.dataValues.role || null;
  };
}

export default UsersService;
