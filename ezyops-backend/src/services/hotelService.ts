import { db } from "../config/firebase";
import { Hotel } from "../models";

const COLLECTION = "hotels";

export async function createHotel(data: Omit<Hotel, "id" | "createdAt">) {
  const ref = db.collection(COLLECTION).doc();
  const hotel: Hotel = { ...data, id: ref.id, createdAt: new Date() };
  await ref.set(hotel);
  return hotel;
}

export async function getHotels() {
  const snap = await db.collection(COLLECTION).get();
  return snap.docs.map(d => d.data() as Hotel);
}

export async function getHotelById(hotelId: string) {
  const doc = await db.collection(COLLECTION).doc(hotelId).get();
  return doc.exists ? (doc.data() as Hotel) : null;
}

export async function updateHotel(hotelId: string, patch: Partial<Hotel>) {
  const ref = db.collection(COLLECTION).doc(hotelId);
  await ref.update(patch);
  const doc = await ref.get();
  return doc.data() as Hotel;
}

export async function deleteHotel(hotelId: string) {
  await db.collection(COLLECTION).doc(hotelId).delete();
  return { success: true };
}
