// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";

// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// import "dotenv/config.js";

// const app = express();

// const port = 4000;

// dotenv.config();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect Database
// connectDB();

// // API endpoints
// app.use("/api/food", foodRouter);

// app.use("/api/users", userRouter);

// app.use("/api/cart", cartRouter);

// app.use("/api/order", orderRouter);

// // Serve uploaded images
// app.use("/images", express.static("uploads"));

// // Test route
// app.get("/", (req, res) => {
//     res.send("API Working");
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server Started on http://localhost:${port}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve uploaded images
app.use("/images", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Only start the server locally.
// Vercel will handle the server itself.
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server Started on http://localhost:${port}`);
    });
}

export default app;