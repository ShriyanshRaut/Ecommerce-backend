import Coupon from "../models/coupon.model.js";
import ApiError from "../utils/ApiError.js";

// Validate coupon code and return coupon details
const validateCoupon = async (code) => {
  if (!code) {
    throw new ApiError(400, "Coupon code is required");
  }

  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    throw new ApiError(404, "Invalid coupon");
  }

  if (!coupon.isActive) {
    throw new ApiError(400, "Coupon is inactive");
  }

  if (coupon.expirationDate < new Date()) {
    throw new ApiError(400, "Coupon has expired");
  }

  return coupon;
};

// Calculate discount amount based on coupon and total
const calculateDiscount = (total, coupon) => {
  let discount = (total * coupon.discount) / 100;

  // Apply max discount cap if exists
  if (coupon.maxDiscount) {
    discount = Math.min(discount, coupon.maxDiscount);
  }

  return discount;
};

// Apply coupon to cart total
const applyCoupon = async (code, total) => {
  const coupon = await validateCoupon(code);

  // Check minimum order value
  if (coupon.minOrderValue && total < coupon.minOrderValue) {
    throw new ApiError(400, "Minimum order value not met for this coupon");
  }

  const discount = calculateDiscount(total, coupon);

  return {
    couponCode: coupon.code,
    discount,
  };
};

// Admin: Create new coupon
const createCoupon = async (data) => {
  const existing = await Coupon.findOne({ code: data.code });

  if (existing) {
    throw new ApiError(400, "Coupon already exists");
  }

  const coupon = await Coupon.create(data);
  return coupon;
};

// Admin: Get all coupons
const getAllCoupons = async () => {
  return await Coupon.find();
};

// Admin: Delete coupon
const deleteCoupon = async (couponId) => {
  const coupon = await Coupon.findByIdAndDelete(couponId);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found");
  }

  return coupon;
};

export {
  validateCoupon,
  calculateDiscount,
  applyCoupon,
  createCoupon,
  getAllCoupons,
  deleteCoupon,
};