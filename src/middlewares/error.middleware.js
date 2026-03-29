import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Normalize to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;

    error = new ApiError(
      statusCode,
      error.message || "Internal Server Error",
      error.errors || [],
      err.stack
    );
  }

  // 🔥 Log with context
  logger.error(
    `${req.method} ${req.originalUrl} - ${error.statusCode} - ${error.message}`
  );

  // Response
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export default errorMiddleware;