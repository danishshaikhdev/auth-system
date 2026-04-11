import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * takes name, email, password, confirm_password from request body
 * @description: register user
 * @param {*} req 
 * @param {*} res 
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
 * takes email and password from request body
 * @description: login user
 * @param {*} req 
 * @param {*} res 
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
    throw new Error("User not found");
  }
  // STEP 3: compare password using bcrypt.compare
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  // STEP 4: generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // STEP 5: return token + user json object
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
