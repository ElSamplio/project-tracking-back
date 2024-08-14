import UserModel from "../models/user.model";
import { User } from "../types/user";
export const createUser = async (user: User): Promise<User> => {
  try {
    const createdUser: User = (await UserModel.create(user)) as User;
    return createdUser;
  } catch (error) {
    throw error;
  }
};
