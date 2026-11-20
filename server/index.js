import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./config/dbConfig.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import paymetRouter from "./routes/paymentRouter.js";

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

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await db;
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/", productRouter);
app.use("/api/", categoryRouter);
app.use("/api/", cartRouter);
app.use("/api/", orderRouter);
app.use("/api", paymetRouter);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running",
  });
});

// Local development
if (process.env.NODE_ENV !== "production") {
  db.then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
}

// Vercel serverless export
export default app;