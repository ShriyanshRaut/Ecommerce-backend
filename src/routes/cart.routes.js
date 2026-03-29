import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getCart, addToCart } from "../controllers/cart.controller.js";

const router = Router();

// Get cart
router.get("/", protect, getCart);

// Add to cart
router.post("/add", protect, addToCart);

export default router;