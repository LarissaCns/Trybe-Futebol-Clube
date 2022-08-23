import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await this.loginService.login(user);
    res.status(201).json({token: {token}});
  };
}