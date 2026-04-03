import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
