import { getUsersCollection } from '../db'

export const getUserByEmail = async (email: string) => {
  const user = await getUsersCollection('users').findOne({ email })
  return user
}
