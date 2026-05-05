import { Router } from "express";
import healthRouter from "./health.js";
import ordersRouter from "./orders.js";
import { auth } from "../lib/auth.js";
import { toNodeHandler } from "better-auth/node";

const router = Router();

router.use(healthRouter);
router.use("/orders", ordersRouter);
router.use("/auth", toNodeHandler(auth));

export default router;
