import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createProductSchema } from "../validators/product.validator.js";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  validate(createProductSchema),
  createProduct
);

router.get("/", getAllProducts);

export default router;