import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Controller } from './controller';
import { Service } from '../services/service';

describe('Controller', () => {
  let controller: Controller;
  let mockService: Service;

  beforeAll(() => {
    mockService = {
      registerUser: jest.fn(),
      loginUser: jest.fn().mockResolvedValue('token'),
      getUserById: jest.fn(),
      createAccount: jest.fn(),
      getAccountsByOwnerId: jest.fn(),
      deleteAccountById: jest.fn(),
    } as any

    controller = new Controller(mockService);
  });

  it('should create an account and respond with a success message', async () => {
    const request = {
      body: {
        name: 'Test Account',
        initialBalance: 100,
      },
    } as Request;

    const response = {
      locals: {
        user: { _id: new ObjectId() },
      },
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as Partial<Response> as Response

    await controller.createAccount(request, response);

    expect(mockService.createAccount).toHaveBeenCalledWith(
      new ObjectId(response.locals.user._id),
      request.body.name,
      request.body.initialBalance
    );
    expect(response.send).toHaveBeenCalled()
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

    await controller.loginUser(request, response);

    expect(mockService.loginUser).toHaveBeenCalledWith(
      request.body.email,
      request.body.password
    );
    expect(response.send).toHaveBeenCalled()
  })
});
