import asyncHandler from "../utils/asyncHandler.js";
import { getCartService, addToCartService } from "../services/cart.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getCartService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await addToCartService(req.user._id, productId, quantity);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart"));
});