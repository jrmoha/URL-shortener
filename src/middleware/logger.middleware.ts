import { Request, Response, NextFunction } from "express";
import { logRequest } from "../utils/logger";

const logger = (req: Request, res: Response, next: NextFunction) => {
  logRequest(req, res);
  next();
};

export default logger;
