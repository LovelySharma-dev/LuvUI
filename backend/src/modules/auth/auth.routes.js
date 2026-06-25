import express from "express";
import { signup, login, updateProfile, checkAuth } from "./auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", updateProfile);

router.get("/check", checkAuth);

export default router;
