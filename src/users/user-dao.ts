import { getUsersCollection } from '../db';
import { ObjectId } from 'mongodb';

const usersCollection = getUsersCollection('user');

export const getUsers = async (): Promise<User[]> => {
  const users = usersCollection.find().toArray();
  return users;
}

export const createUser = async (user: User): Promise<User> => {
  const createdUser = await usersCollection.insertOne({ data: user });
  return createdUser;
}

export const getUser = async (_id: ObjectId): Promise<User | null> => {
  const user = await usersCollection.findOne({ _id });
  return user;
}

export const updateUser = async (_id: ObjectId, user: User): Promise<User | null> => {
  const updatedUser = await usersCollection.updateOne({ _id }, { user });
  return updatedUser;
}

export const deleteUser = async (_id: ObjectId): Promise<User | null> => {
  const deletedUser = await usersCollection.deleteOne({ _id })
  return deletedUser;
}
