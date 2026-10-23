
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./config/dbConfig.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/",productRouter)
app.use("/api/",categoryRouter)

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running",
  });
});

// Database connection and server startup
const startServer = async () => {
  try {
    await db;

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
