import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateInput =
  (schema: AnyZodObject) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e) {
      next(e);
    }
  };

export default validateInput;
