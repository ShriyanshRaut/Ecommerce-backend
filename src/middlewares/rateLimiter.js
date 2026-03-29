import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // production value
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});
export default rateLimiter;