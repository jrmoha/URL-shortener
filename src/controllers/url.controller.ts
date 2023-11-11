import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import config from "config";
import { CreateURLInput, GetURLInput } from "./../schema/url.schema";
import { findUser } from "../services/user.service";
import { createURL, getOriginalURL } from "../services/url.service";
import { URL } from "../models/url.model";

export const createURLHandler = async function (
  req: Request<{}, {}, CreateURLInput>,
  res: Response,
  next: NextFunction,
) {
  const { API_KEY, URL } = req.body;
  try {
    //check for existence of API_KEY and return user_id if exists
    const user = await findUser("_id", API_KEY);

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("This API_KEY Doesn't Exist");

    //IF true hash the url and assign it
    const short_url = crypto
      .createHash("md5")
      .update(URL)
      .digest("base64url")
      .slice(0, config.get<number>("SHORT_URL_MAX_LENGTH"));

    //insert short_url and return it with status=201
    const created_url: URL = await createURL(short_url, URL, API_KEY);

    return res
      .status(StatusCodes.CREATED)
      .json({ shortUrl: created_url.shortUrl });
  } catch (e) {
    next(e);
  }
};

export const redirectURLHandler = async function (
  req: Request<GetURLInput, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  const { SHORT_URL } = req.params;
  try {
    const URL: URL | null = await getOriginalURL(SHORT_URL);
    if (!URL)
      return res.status(StatusCodes.NOT_FOUND).send("This URL is Invalid");

    const ORIGINAL_URL = URL.longUrl;

    res.status(StatusCodes.MOVED_PERMANENTLY).redirect(ORIGINAL_URL);
  } catch (e) {
    next(e);
  }
};
