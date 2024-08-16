import UserModel from "../models/user.model";
import { User } from "../types/user";
export const createUser = async (user: User) => {
  try {
    return await UserModel.create(user);
  } catch (error) {
    throw error;
  }
};
