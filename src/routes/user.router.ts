import { Router } from "express";
import { createUserHandler, getAPIKEY } from "../controllers/user.controller";
import validateInput from "../middleware/validateInput.middleware";
import { createUserSchema, verfiyUserSchema } from "../schema/user.schema";

const router = Router();

router.post(
  "/app/users/api/create",
  validateInput(createUserSchema),
  createUserHandler,
);

router.post("/app/users/api/login",validateInput(verfiyUserSchema), getAPIKEY);

export default router;
