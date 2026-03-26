import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

// Protect routes (authentication)
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }

  const user = await User.findById(decoded._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  req.user = user;

  next();
});

// Admin authorization middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new ApiError(403, "Admin access required");
  }
};

export { protect, admin };
export default protect;