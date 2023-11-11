import { Router } from "express";
import userRouter from "./user.route";
import URLRouter from "./url.route";

const router = Router();

router.use(userRouter).use(URLRouter);


export default router;
