import { db } from "../config/firebase";
import { Order } from "../models";

export async function createOrder(hotelId: string, data: Omit<Order, "id" | "createdAt" | "updatedAt">) {
  const ref = db.collection("hotels").doc(hotelId).collection("orders").doc();
  const now = new Date();
  const order: Order = { ...data, id: ref.id, createdAt: now, updatedAt: now };
  await ref.set(order);
  return order;
}

export async function getOrders(hotelId: string, status?: string) {
  let q: FirebaseFirestore.Query = db.collection("hotels").doc(hotelId).collection("orders");
  if (status) q = q.where("status", "==", status);
  const snap = await q.get();
  return snap.docs.map(d => d.data() as Order);
}

export async function getOrderById(hotelId: string, orderId: string) {
  const doc = await db.collection("hotels").doc(hotelId).collection("orders").doc(orderId).get();
  return doc.exists ? (doc.data() as Order) : null;
}

export async function updateOrderStatus(hotelId: string, orderId: string, status: Order["status"]) {
  const ref = db.collection("hotels").doc(hotelId).collection("orders").doc(orderId);
  await ref.update({ status, updatedAt: new Date() });
  const doc = await ref.get();
  return doc.data() as Order;
}
