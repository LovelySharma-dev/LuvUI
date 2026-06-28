import express from "express";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import {
  createOrder,
  paymentHistory,
  verifyPayment,
} from "./payment.controller.js";

const router = express.Router();

router.post("/create-order", protectedRoute, createOrder);

router.post("/verify", protectedRoute, verifyPayment);

router.get("/history", protectedRoute, paymentHistory);

export default router;
