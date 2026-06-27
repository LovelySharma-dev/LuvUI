import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min - limit resest every
  max: 10, //maxRequest
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many AI generation requests. Please wait a minute.",
  },
});
