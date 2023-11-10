import UserModel, { User } from "../models/user.model";

export const createUser = function (user: Partial<User>): Promise<User> {
  return UserModel.create(user);
};

export const getUser = function (email: string): Promise<User | null> {
  return UserModel.findOne({ email: email });
};
