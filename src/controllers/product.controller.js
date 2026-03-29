import asyncHandler from "../utils/asyncHandler.js";
import { createProductSchema } from "../validators/product.validator.js";
import { createProductService, getAllProductsService } from "../services/product.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const createProduct = asyncHandler(async (req, res) => {
  // 1. Validate body
  const parsed = createProductSchema.safeParse(req.body);

  if (!parsed.success) {
  const msg =
    parsed.error && Array.isArray(parsed.error.issues) && parsed.error.issues.length > 0
      ? parsed.error.issues[0].message
      : "Invalid input";

  throw new ApiError(400, msg);
}

  let imageUrl = "";

  // 2. Handle image upload
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    imageUrl = result.secure_url;

    // delete temp file
    fs.unlinkSync(req.file.path);
  } else {
    throw new ApiError(400, "Image is required");
  }

  // 3. Merge image into data
  const productData = {
    ...parsed.data,
    images: [imageUrl], // matches your schema
  };

  //  4. Save product
  const product = await createProductService(productData);

  

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await getAllProductsService();

  return res.status(200).json({
    success: true,
    data: products,
  });
});