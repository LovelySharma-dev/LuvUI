import express from "express";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { generateComponent } from "./ai.controller.js";
import { aiLimiter } from "../../middlewares/rateLimiter.middleware.js";
const router = express.Router();

router.post("/generate", aiLimiter, protectedRoute, generateComponent);

export default router;
