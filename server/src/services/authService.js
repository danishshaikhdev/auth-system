import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const { name, email, password, confirm_password } = data;

  // STEP 1: validate the input data

  // - check if any input field is empty
  if (!name || !email || !password || !confirm_password) {
    throw new Error("All fields are required");
  }

  // - check if email is valid
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
