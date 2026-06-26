import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import componentRoutes from "./modules/components/component.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("LubUI API is running");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/components", componentRoutes);
app.use("/api/v1/ai", aiRoutes);

// health
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

// 404 handler after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// global handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
export default app;
