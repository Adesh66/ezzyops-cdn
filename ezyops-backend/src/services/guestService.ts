import { db } from "../config/firebase";
import { Guest } from "../models";

export async function createGuest(hotelId: string, data: Omit<Guest, "id" | "createdAt">) {
  const ref = db.collection("hotels").doc(hotelId).collection("guests").doc();
  const guest: Guest = { ...data, id: ref.id, createdAt: new Date() };
  await ref.set(guest);
  return guest;
}

export async function getGuests(hotelId: string) {
  const snap = await db.collection("hotels").doc(hotelId).collection("guests").get();
  return snap.docs.map(d => d.data() as Guest);
}

export async function getGuestById(hotelId: string, guestId: string) {
  const doc = await db.collection("hotels").doc(hotelId).collection("guests").doc(guestId).get();
  return doc.exists ? (doc.data() as Guest) : null;
}
