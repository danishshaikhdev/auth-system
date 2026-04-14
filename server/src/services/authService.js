import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

/**
 * takes name, email, password, confirm_password from request body, validate it, register user, and return user json object
 * @description: register user
 * @param {Object} data - Object containing name, email, password, and confirm_password
 * @returns {json}
 */
export const registerUser = async (data) => {
  const { name, email, password, confirm_password } = data;

  // STEP 1: validate the input data

  // - check if any input field is empty
  if (!name || !email || !password || !confirm_password) {
    throw new Error("All fields are required");
  }

  // - check if email format is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email format");
  }

  // - check if password is at least 6 characters long
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // - check if password and confirm_password match
  if (password !== confirm_password) {
    throw new Error("Passwords do not match");
  }

  // STEP 2: check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // STEP 3: hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // STEP 4: save user in db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // STEP 5: return user json object
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

/**
 * takes email and password from request body, verify it, and return refreshToken + accessToken + user json object
 * @description: login user
 * @param {Object} data - Object containing email and password
 * @returns {json}
 */
export const loginUser = async (data) => {
  // STEP 1: validate the input data
  const { email, password } = data;
  // - check if any input fields are empty
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  // - check if email format is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email format");
  }

  // STEP 2: find user in db
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  // STEP 3: compare password using bcrypt.compare
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  // STEP 4: generate tokens
  const refreshToken = generateRefreshToken(user._id);
  const accessToken = generateAccessToken(user._id);

  // STEP 5: save refreshToken in db
  user.refreshToken = refreshToken;
  await user.save();

  // STEP 6: return refreshToken + accessToken + user json object
  return {
    refreshToken,
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

/**
 * takes refreshToken from request body, verify it, and return new accessToken
 * @description: refresh accessToken
 * @param {Object} data - Object containing refreshToken
 * @returns {json}
 */
export const refreshAccessToken = async (token) => {
  // STEP 1: validate the input data
  if (!token) {
    throw new Error("No refresh token provided");
  }

  try {
    // STEP 2: verify the refresh token
    // - check if the token is valid (verify returns user id)
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

    // STEP 3: check if the user exists in db (decoded.id is user id)
    // - check if the refresh token matches the one in db
    const user = await User.findById(decoded.userId);

    // - if user does not exist or refresh token does not match
    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    // STEP 4: generate new accessToken
    const newAccessToken = generateAccessToken(user._id);

    // STEP 5: return new accessToken
    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

/**
 * takes userId from request body and remove refreshToken from db and return success message
 * @description: logout user
 * @param {Object} data - Object containing userId
 * @returns {json}
 */
export const logoutUser = async (userId) => {
  // STEP 1: validate the input data
  if (!userId) {
    throw new Error("No user id provided");
  }

  // STEP 2: find user in db
  const user = await User.findById(userId);

  // STEP 3: check if user exists
  if (!user) {
    throw new Error("User not found");
  }

  // STEP 4: remove refreshToken from db
  user.refreshToken = null;
  await user.save();

  // STEP 5: return success message
  return { message: "Logged out successfully" };
};
