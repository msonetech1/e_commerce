import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import { createOrder, getOrders, getMyOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getOrders);
router.get("/my-orders", protect, getMyOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
