import { Request, Response } from "express";
import { createUser, getUser } from "../services/user.service";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";

export const createUserHandler = async function (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
) {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getAPIKEY = async function (
  req: Request<{}, {}, VerifyUserInput>,
  res: Response,
) {
  const { email, password } = req.body;

  try {
    const user = (await getUser(email)) as DocumentType<User>;
    if (!user) return res.status(404).send("User Doesn't Exists");

    const password_valid = await user.validate_password(password);
    if (!password_valid) return res.status(401).send("Password is incorrect");

    res.status(200).json({ API_KEY: user._id });
  } catch (e) {
    res.status(400).send(e);
  }
};
