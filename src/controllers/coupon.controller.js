import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from "../services/coupon.service.js";

// Create a new coupon (admin only)
const createNewCoupon = asyncHandler(async (req, res) => {
  const coupon = await createCoupon(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, coupon, "Coupon created successfully"));
});

// Get all coupons (admin)
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await getAllCoupons();

  return res
    .status(200)
    .json(new ApiResponse(200, coupons, "Coupons fetched successfully"));
});

// Delete a coupon (admin)
const removeCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await deleteCoupon(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Coupon deleted successfully"));
});

export {
  createNewCoupon,
  getCoupons,
  removeCoupon,
};