import express from "express";
import { register } from "../controllers/authController.js";

// STEP 1: create router
const router = express.Router();

// STEP 2: define register route
router.post("/register", register);

export default router;