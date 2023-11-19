import { addUser, getUserByEmail } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw { status: 409, message: 'User already exists' };
  }
  if (!name || !email || !password) {
    throw { status: 400, message: 'Missing fields' }
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await addUser(name, email, hashedPassword);
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await getUserByEmail(email)
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
