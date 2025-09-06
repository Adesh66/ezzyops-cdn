import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/orderService";

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orderService.createOrder(req.params.hotelId, req.body);
    res.json(order);
  } catch (e) { next(e); }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await orderService.getOrders(req.params.hotelId, req.query.status as string);
    res.json(orders);
  } catch (e) { next(e); }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orderService.getOrderById(req.params.hotelId, req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (e) { next(e); }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await orderService.updateOrderStatus(
      req.params.hotelId,
      req.params.orderId,
      req.body.status
    );
    res.json(updated);
  } catch (e) { next(e); }
}
