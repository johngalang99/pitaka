import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDao } from '../daos/user.dao';

export class UserService {
  constructor(private userDao: UserDao) { }

  public async registerUser(name: string, email: string, password: string) {
    const existingUser = await this.userDao.getUserByEmail(email);
    if (existingUser) {
      throw { status: 409, message: 'User already exists' };
    }
    if (!name || !email || !password) {
      throw { status: 400, message: 'Missing fields' }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userDao.createUser(name, email, hashedPassword);
  };

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userDao.getUserByEmail(email)
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
    return await this.userDao.getUserById(id)
  }
}

