/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign(
      { name: user.name },
      'b6ebdb47bb5ec90626b081bd096e82ed',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
