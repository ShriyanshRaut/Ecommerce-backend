import { registerUserService, loginUserService } from "../services/user.service.js";
import { registerUserSchema, loginUserSchema } from "../validators/user.validator.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


// 🟢 Register Controller
export const registerUser = asyncHandler(async (req, res) => {
  const parsed = registerUserSchema.safeParse(req.body);

  if (!parsed.success) {
    const errorMessage = parsed.error?.issues?.[0]?.message || "Invalid input";
    throw new ApiError(400, errorMessage);
  }

  const user = await registerUserService(parsed.data);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});


// 🟢 Login Controller
export const loginUser = asyncHandler(async (req, res) => {
  const parsed = loginUserSchema.safeParse(req.body);

  if (!parsed.success) {
    const errorMessage = parsed.error?.issues?.[0]?.message || "Invalid input";
    throw new ApiError(400, errorMessage);
  }

  const { user, accessToken, refreshToken } = await loginUserService(parsed.data);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
});