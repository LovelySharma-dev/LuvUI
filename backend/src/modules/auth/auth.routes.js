import express from "express";
import {
  signup,
  login,
  updateProfile,
  checkAuth,
  logout,
} from "./auth.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { authLimiter } from "../../middlewares/rateLimiter.middleware.js";
const router = express.Router();

router.post("/signup", authLimiter, signup);

router.post("/login", authLimiter, login);

router.post("/logout", protectedRoute, logout);
router.put("/update-profile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, checkAuth);

export default router;
