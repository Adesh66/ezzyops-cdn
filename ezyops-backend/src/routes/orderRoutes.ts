import express from "express";
import * as order from "../controllers/orderController.js";
import { requireAuthIfEnabled } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:hotelId/orders", order.createOrder); // guest order placement
router.get("/:hotelId/orders", order.getOrders);
router.get("/:hotelId/orders/:orderId", order.getOrderById);
router.patch("/:hotelId/orders/:orderId/status", requireAuthIfEnabled, order.updateOrderStatus);

export default router;
