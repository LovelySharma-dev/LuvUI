import express from "express";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { generateComponent } from "./ai.controller.js";
const router = express.Router();

router.post("/generate", protectedRoute, generateComponent);

export default router;
