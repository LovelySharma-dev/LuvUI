import express from "express";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import {
  deleteGeneration,
  getGenerationById,
  getGenerations,
} from "./generation.controller.js";

const router = express.Router();

router.get("/", protectedRoute, getGenerations);
router.get("/:id", protectedRoute, getGenerationById);
router.delete("/:id", protectedRoute, deleteGeneration);

export default router;
