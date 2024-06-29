/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import APIError from "../errors/APIError";

const errorHandler = function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof APIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }

  if (err instanceof ZodError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: err.errors[0].message });
  }

  return res
    .status(StatusCodes.NOT_ACCEPTABLE)
    .json({ success: false, error: err.message });
};

export default errorHandler;
