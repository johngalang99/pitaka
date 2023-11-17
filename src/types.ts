import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface Account {
  _id: ObjectId;
  ownerId: ObjectId;
  name: string;
  initialBalance: number;
  balance: number;
}
