import express from "express";
import {
  createComponent,
  deleteComponent,
  getComponent,
  getComponents,
  updateComponent,
} from "./component.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
import { adminRoute } from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", getComponents);
router.get("/:slug", getComponent);

router.post("/", protectedRoute, adminRoute, createComponent);
router.put("/:id", protectedRoute, adminRoute, updateComponent);
router.delete("/:id", protectedRoute, adminRoute, deleteComponent);

export default router;
