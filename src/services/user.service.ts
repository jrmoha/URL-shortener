import UserModel, { User } from "../models/user.model";

export const createUser = function (user: Partial<User>): Promise<User> {
  return UserModel.create(user);
};

export const findUser = function (
  key: "_id" | "email",
  value: string,
): Promise<User | null> {
  return UserModel.findOne({ [key]: value });
};
