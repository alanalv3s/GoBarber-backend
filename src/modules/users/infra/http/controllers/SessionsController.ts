import { Request, Response } from 'express';
import AuthUserService from '@modules/users/services/AuthUserService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthUserService);

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
