import { NextFunction, Request, Response } from "express";
import { DocumentType } from "@typegoose/typegoose";
import { StatusCodes } from "http-status-codes";
import { createUser, findUser } from "../services/user.service";
import { User } from "../models/user.model";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import { async_ } from "../middleware/async.handler";
import APIError from "../errors/APIError";

export const createUserHandler = async_(async function (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) {
  const user_exists = await findUser("email", req.body.email);

  if (user_exists)
    throw new APIError("User Already Exists", StatusCodes.CONFLICT);

  const user = await createUser(req.body);

  return user
    ? res.status(StatusCodes.CREATED).send({ success: true, API_KEY: user._id })
    : next(new APIError("User Not Created", StatusCodes.INTERNAL_SERVER_ERROR));
});

export const getAPIKEY = async_(async function (
  req: Request<{}, {}, VerifyUserInput>,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;

  const user = (await findUser("email", email)) as DocumentType<User>;
  if (!user) throw new APIError("User Not Found", StatusCodes.NOT_FOUND);

  const password_valid = await user.validate_password(password);
  if (!password_valid)
    throw new APIError("Invalid Password", StatusCodes.UNAUTHORIZED);

  return res
    .status(StatusCodes.ACCEPTED)
    .json({ success: true, API_KEY: user._id });
});
