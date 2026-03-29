import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

// Register User
export const registerUserService = async (data) => {
  const { fullName, email, password, avatar } = data;

  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  // create user
  const user = await User.create({
    fullName,
    email,
    password,
    avatar
  });

  // remove sensitive fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  return createdUser;
};


// Login User
export const loginUserService = async (data) => {
  const { email, password } = data;

  // check user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // remove sensitive fields
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return {
    user: loggedInUser,
    accessToken,
    refreshToken
  };
};