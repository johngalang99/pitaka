import { google } from 'googleapis';

import { oAuth2Client } from '../oauth-client';

export default class OAuth2Dao {
  async generateAuthUrl(): Promise<string> {
    console.log(process.env)
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
    });
    console.log(authUrl)
    return authUrl;
  }

  async exchangeCodeForToken(code: string): Promise<any> {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    console.log('data', data)
    return data;
  }
}
