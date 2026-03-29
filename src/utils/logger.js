import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),

  transports: [
    // Console logs
    new winston.transports.Console(),

    // Error logs (file)
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // All logs (file)
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

export default logger;