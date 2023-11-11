import { Router } from "express";
import { createUserHandler, getAPIKEY } from "../controllers/user.controller";
import validateInput from "../middleware/validateInput.middleware";
import { createUserSchema, verfiyUserSchema } from "../schema/user.schema";
import { logRequest } from "../utils/logger";

const router = Router();

router.post(
  "/app/users/api/create",
  validateInput(createUserSchema),
  logRequest,
  createUserHandler,
);

router.post(
  "/app/users/api/login",
  validateInput(verfiyUserSchema),
  logRequest,
  getAPIKEY,
);

export default router;
