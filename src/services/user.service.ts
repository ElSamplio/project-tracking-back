import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "../types/user";

dotenv.config();
const secret = process.env.JWT_SECRET as string;

export const createUser = async (user: User) => {
  try {
    return await UserModel.create(user);
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: String) => {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const findUsers = async (filter: Object) => {
  try {
    return await UserModel.find(filter);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: String, user: User) => {
  try {
    return await UserModel.replaceOne({ _id: id }, { ...user });
  } catch (error) {
    throw error;
  }
};

export const login = async (userName: string, password: string) => {
  try {
    const foundUser = await UserModel.find({ userName });
    if (!foundUser || foundUser.length < 1) {
      throw new Error("Wrong username or password");
    } else {
      const user = foundUser[0] as unknown as User;
      const compare = bcrypt.compareSync(password, user.password);
      if (compare) {
        const token = jwt.sign({ ...user }, secret, { expiresIn: "1d" });
        return { user, token };
      } else {
        throw new Error("Wrong username or password");
      }
    }
  } catch (error) {
    throw error;
  }
};
