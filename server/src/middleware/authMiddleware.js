import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // STEP 1: create a token
    let token;

    // STEP 2: Get the token from the header
    if (req.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // STEP 3: If no token found send error
    if (!token) {
      // send 401 error (401 means unauthorized)
      return res.status(401).json({
        success: false,
        message: "Not Authorized, no token found",
      });
    }

    // STEP 4: Verify Token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // STEP 5: Attach user to the request
    req.user = await User.findById(decoded.userId).select("-password");

    // STEP 6: Call next middleware
    next();

  } catch (error) {
    // send 401 error (401 means unauthorized)
    res.status(401).json({
      success: false,
      message: 'Not Authorized, token is invalid or expired',
    });
  }
};
