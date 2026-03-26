export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const msg =
      result.error && Array.isArray(result.error.issues) && result.error.issues.length > 0
        ? result.error.issues[0].message
        : "Invalid input";

    return res.status(400).json({
      success: false,
      message: msg,
    });
  }

  next();
};