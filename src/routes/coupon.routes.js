import express from "express";
import {
  createNewCoupon,
  getCoupons,
  removeCoupon,
} from "../controllers/coupon.controller.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create coupon
router.post("/", protect, admin, createNewCoupon);

// Get all coupons
router.get("/", protect, admin, getCoupons);

// Delete coupon
router.delete("/:id", protect, admin, removeCoupon);

export default router;