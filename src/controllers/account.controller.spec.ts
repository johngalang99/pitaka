import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { AccountController } from './account.controller';
import { AccountService } from '../services/account.service';

describe('AccountController', () => {
  let accountController: AccountController;
  let mockAccountService: AccountService;

  beforeAll(() => {
    mockAccountService = {
      createAccount: jest.fn(),
      getAccountsByOwnerId: jest.fn(),
      deleteAccountById: jest.fn(),
    } as any

    accountController = new AccountController(mockAccountService);
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

    await accountController.createAccount(request, response);

    expect(mockAccountService.createAccount).toHaveBeenCalledWith(
      new ObjectId(response.locals.user._id),
      request.body.name,
      request.body.initialBalance
    );
    expect(response.send).toHaveBeenCalled()
  });
});
