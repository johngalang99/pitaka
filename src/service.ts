import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Dao } from './dao';
import { ObjectId } from 'mongodb';

export class Service {
  constructor(private dao: Dao) { }

  public async registerUser(name: string, email: string, password: string) {
    const existingUser = await this.dao.getUserByEmail(email);
    if (existingUser) {
      throw { status: 409, message: 'User already exists' };
    }
    if (!name || !email || !password) {
      throw { status: 400, message: 'Missing fields' }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.dao.createUser(name, email, hashedPassword);
  };

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.dao.getUserByEmail(email)
    if (!user) {
      throw { status: 404, message: 'User does not exist' };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw { status: 401, message: 'Incorrect password' };
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
    return jwt.sign(payload, 'secret', { expiresIn: '1h' })
  }

  async getUserById(id: string) {
    return await this.dao.getUserById(id)
  }

  async createAccount(ownerId: ObjectId, name: string, initialBalance: number) {
    return await this.dao.createAccount(ownerId, name, initialBalance)
  }

  async getAccountsByOwnerId(ownerId: ObjectId) {
    return await this.dao.getAccountsByOwnerId(ownerId)
  }

  async deleteAccountById(id: ObjectId) {
    return await this.dao.deleteAccountById(id)
  }
}

