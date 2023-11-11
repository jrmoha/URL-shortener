import { Router } from "express";
import {
  createURLHandler,
  redirectURLHandler,
} from "../controllers/url.controller";
import validateInput from "../middleware/validateInput.middleware";
import { createURLSchema, getURLSchema } from "../schema/url.schema";
import { logRequest } from "../utils/logger";

const router = Router();

router.post(
  "/app/api/create",
  validateInput(createURLSchema),
  logRequest,
  createURLHandler,
);

router.get(
  "/:SHORT_URL",
  validateInput(getURLSchema),
  logRequest,
  redirectURLHandler,
);

export default router;
