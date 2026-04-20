import asyncHandler from "../utils/asyncHandler.js";
import { getCartService, addToCartService } from "../services/cart.service.js";
import ApiResponse from "../utils/ApiResponse.js";

// 🔥 GET CART
export const getCart = asyncHandler(async (req, res) => {
  const cart = await getCartService(req.user._id);

  // 🛡️ Safety check (optional but good)
  if (!cart) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Cart not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

// 🔥 ADD TO CART
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await addToCartService(
    req.user._id,
    productId,
    quantity || 1
  );

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart"));
});

//  UPDATE CART ITEM (increase / decrease)
export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, type } = req.body;

  const cart = await getCartService(req.user._id);

  const item = cart.items.find(
    (item) => item.productId._id.toString() === productId
  );

  if (!item) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Item not found in cart"));
  }

  if (type === "increase") {
    item.quantity += 1;
  }

  if (type === "decrease" && item.quantity > 1) {
    item.quantity -= 1;
  }

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart updated"));
});


//  REMOVE ITEM FROM CART
export const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await getCartService(req.user._id);

  cart.items = cart.items.filter(
    (item) => item.productId._id.toString() !== productId
  );

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item removed from cart"));
});