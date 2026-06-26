import express from "express";
import {
  createComponent,
  deleteComponent,
  getComponent,
  getComponents,
  updateComponent,
} from "./component.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getComponents);
router.get("/:slug", getComponent);

router.post("/", protectedRoute, createComponent);
router.put("/:id", protectedRoute, updateComponent);
router.delete("/:id", protectedRoute, deleteComponent);

export default router;
