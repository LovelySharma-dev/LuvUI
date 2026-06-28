import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import componentRoutes from "./modules/components/component.routes.js";
import generationRoutes from "./modules/generations/generation.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("LubUI API is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/components", componentRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/generations", generationRoutes);
app.use("/api/v1/payments", paymentRoutes);

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
