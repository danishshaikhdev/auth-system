import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// STEP 1: create router
const router = express.Router();

// define register route
router.post("/register", register);

// define login route
router.post("/login", login);

// define /me route
router.get("/me", protect, getMe)

export default router;