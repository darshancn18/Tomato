import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Place order
orderRouter.post(
    "/place",
    authMiddleware,
    placeOrder
);

// Verify order
orderRouter.post(
    "/verify",
    verifyOrder
);

// Get logged-in user's orders
orderRouter.post(
    "/userOrders",
    authMiddleware,
    userOrders
);

// Get all orders - admin
orderRouter.get(
    "/list",
    listOrders
);

// Update order status
orderRouter.put(
    "/status",
    updateStatus
);

export default orderRouter;