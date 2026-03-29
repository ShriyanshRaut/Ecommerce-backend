import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

export const createOrderService = async (userId, shippingAddress) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // 1. Validate stock
  for (const item of cart.items) {
    const product = item.productId;

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `Insufficient stock for ${product.name}`
      );
    }
  }

  // 2. Calculate total
  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.quantity * item.productId.price;
  }, 0);

  // 3. Reduce stock
  for (const item of cart.items) {
    const product = await Product.findById(item.productId._id);

    product.stock -= item.quantity;

    if (product.stock < 0) {
      throw new ApiError(400, "Stock went negative");
    }

    await product.save();
  }

  // 4. Create order
  const order = await Order.create({
    user: userId,
    items: cart.items.map((item) => ({
  productId: item.productId._id,
  quantity: item.quantity,
  priceAtPurchase: item.productId.price,
})),
    totalPrice,
    shippingAddress,
    status: "pending",
    paymentStatus: "pending",
  });

  // 5. Clear cart
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return order;
};