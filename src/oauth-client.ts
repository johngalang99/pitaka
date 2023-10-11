// oauth2-client.ts
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config()
export const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT
);
