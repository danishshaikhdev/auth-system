import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import router from "./src/routes/authRoutes.js";
dotenv.config();

// STEP 1: create express app
const app = express();

// STEP 2: use middleware to handle cors and json parsing
app.use(cors());
app.use(express.json());
app.use('/api/auth', router);

// define dummy route just to test the server
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello World!",
  });
});

// STEP 4: define port
const PORT = process.env.PORT || 3000;

// STEP 5: connect to db
connectDB();

// STEP 6: start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
