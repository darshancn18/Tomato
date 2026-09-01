import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(
            req.userId,
            { cartData: {} }
        );

        console.log("Order saved:", newOrder._id);

        res.json({
            success: true,
            message: "Order placed successfully",
            orderId: newOrder._id
        });

    } catch (error) {
        console.log("Order Error:", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// verify order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {

            await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true }
            );

            res.json({
                success: true,
                message: "Paid"
            });

        } else {

            await orderModel.findByIdAndDelete(orderId);

            res.json({
                success: false,
                message: "Not Paid"
            });
        }

    } catch (error) {
        console.log("Verify Order Error:", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// get user's orders
const userOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({
            userId: req.userId
        });

        console.log("User ID:", req.userId);
        console.log("Orders:", orders);

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.log("User Orders Error:", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// Listing all orders for admin panel
const listOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.log("List Orders Error:", error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};


// Update order status
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;

        console.log("Order ID:", orderId);
        console.log("New Status:", status);

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        console.log("Updated Order:", updatedOrder);

        res.json({
            success: true,
            message: "Status Updated",
            data: updatedOrder
        });

    } catch (error) {

        console.log("Update Status Error:", error);

        res.json({
            success: false,
            message: "Error updating status"
        });
    }
};


export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
};