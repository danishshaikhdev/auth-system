import express from "express";
import { login, register } from "../controllers/authController.js";

// STEP 1: create router
const router = express.Router();

// STEP 2: define register route
router.post("/register", register);

// STEP 3: define login route
router.post("/login", login);

export default router;