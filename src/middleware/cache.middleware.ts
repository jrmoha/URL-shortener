import { NextFunction, Request, Response } from "express";
import { async_ } from "./async.handler";
import { RedisService } from "../cache";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";

export const cache = (key: string) => {
  return async_(async (req: Request, res: Response, next: NextFunction) => {
    const redisInstance = RedisService.getInstance();
    const data = await redisInstance.Client.get(req.params[key]);

    if (data) {
      logger.info("Cache Hit");
      return res
        .status(StatusCodes.PERMANENT_REDIRECT)
        .redirect(JSON.parse(data).longUrl);
    }

    next();
  });
};
