import express from 'express';

import UserController from './user-controller';

export const userRoutes = express.Router();

userRoutes.get('/', UserController.list);
userRoutes.post('/', UserController.create);
userRoutes.get('/:id', UserController.get);
userRoutes.put('/:id', UserController.update);
userRoutes.delete('/:id', UserController.delete);
