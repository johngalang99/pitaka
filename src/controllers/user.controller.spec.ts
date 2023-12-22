import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: UserService;

  beforeAll(() => {
    mockUserService = {
      registerUser: jest.fn(),
      loginUser: jest.fn().mockResolvedValue('token'),
      getUserById: jest.fn(),
    } as any

    userController = new UserController(mockUserService);
  });

  it('should login user and respond with a success message', async () => {
    const request = {
      body: {
        email: 'email@test.com',
        password: 'password',
      },
    } as Request;
    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as Partial<Response> as Response

    await userController.loginUser(request, response);

    expect(mockUserService.loginUser).toHaveBeenCalledWith(
      request.body.email,
      request.body.password
    );
    expect(response.send).toHaveBeenCalled()
  })
});
