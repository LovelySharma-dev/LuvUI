import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //milisecond
    httpOnly: true, //prevent attack
    sameSite: isProduction ? "none" : "lax",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  return token;
};
