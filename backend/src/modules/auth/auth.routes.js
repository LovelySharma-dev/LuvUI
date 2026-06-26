import express from "express";
import {
  signup,
  login,
  updateProfile,
  checkAuth,
  logout,
} from "./auth.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", protectedRoute, login);
router.post("/logout", logout);
router.put("/update-profile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, checkAuth);

export default router;
