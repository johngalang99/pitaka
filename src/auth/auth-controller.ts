import { Request, Response } from 'express';

import OAuth2Dao from './auth-dao';

const oauth2Dao = new OAuth2Dao();

export default class OAuth2Controller {
  static async getAuthUrl(req: Request, res: Response): Promise<void> {
    const authUrl = await oauth2Dao.generateAuthUrl();
    res.redirect(authUrl);
  }

  static async handleCallback(req: Request, res: Response): Promise<void> {
    const { code } = req.query;
    const data = await oauth2Dao.exchangeCodeForToken(code as string);
    console.log(data);
    res.send(data);
  }
}
