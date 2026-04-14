import express from "express";
import { getMe, login, logout, refreshToken, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// STEP 1: create router
const router = express.Router();

// define register route
router.post("/register", register);

// define login route
router.post("/login", login);

// define /me route
router.get("/me", protect, getMe);

// define /refresh-token route
router.post("/refresh-token", refreshToken);

// define /logout route
router.post("/logout", protect, logout);

export default router;