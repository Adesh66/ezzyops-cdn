import { db } from "../config/firebase";
import { Service } from "../models";

export async function createService(hotelId: string, data: Omit<Service, "id" | "createdAt">) {
  const ref = db.collection("hotels").doc(hotelId).collection("services").doc();
  const service: Service = { ...data, id: ref.id, createdAt: new Date() };
  await ref.set(service);
  return service;
}

export async function getServices(hotelId: string) {
  const snap = await db.collection("hotels").doc(hotelId).collection("services").get();
  return snap.docs.map(d => d.data() as Service);
}

export async function getServiceById(hotelId: string, serviceId: string) {
  const doc = await db.collection("hotels").doc(hotelId).collection("services").doc(serviceId).get();
  return doc.exists ? (doc.data() as Service) : null;
}
