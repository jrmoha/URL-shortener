import { Router } from "express";
import { createURLHandler, redirectURLHandler } from "../controllers/url.controller";
import validateInput from "../middleware/validateInput.middleware";
import { createURLSchema } from "../schema/url.schema";

const router = Router();

router.post(
  "/app/api/create",
  validateInput(createURLSchema),
  createURLHandler,
);

router.get("/:SHORT_URL", redirectURLHandler);
export default router;
