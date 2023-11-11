import { NextFunction, Request, Response } from "express";
import { createUser, findUser } from "../services/user.service";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import { StatusCodes } from "http-status-codes";

export const createUserHandler = async function (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.status(StatusCodes.CREATED).send(user);
  } catch (e) {
    next(e);
  }
};

export const getAPIKEY = async function (
  req: Request<{}, {}, VerifyUserInput>,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;

  try {
    const user = (await findUser("email", email)) as DocumentType<User>;
    if (!user) return res.status(404).send("User Doesn't Exists");

    const password_valid = await user.validate_password(password);
    if (!password_valid) return res.status(401).send("Password is incorrect");

    res.status(StatusCodes.ACCEPTED).json({ API_KEY: user._id });
  } catch (e) {
    next(e);
  }
};
