import { Router } from 'express';

import OAuth2Controller from '../controllers/auth-controller';

export const authRoutes = Router();

authRoutes.get('/google', OAuth2Controller.getAuthUrl);
authRoutes.get('/google/callback', OAuth2Controller.handleCallback);
