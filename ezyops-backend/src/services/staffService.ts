import { db } from "../config/firebase";
import { Staff } from "../models";

export async function createStaff(hotelId: string, data: Omit<Staff, "id" | "createdAt">) {
  const ref = db.collection("hotels").doc(hotelId).collection("staff").doc();
  const staff: Staff = { ...data, id: ref.id, createdAt: new Date() };
  await ref.set(staff);
  return staff;
}

export async function getStaff(hotelId: string) {
  const snap = await db.collection("hotels").doc(hotelId).collection("staff").get();
  return snap.docs.map(d => d.data() as Staff);
}

export async function getStaffById(hotelId: string, staffId: string) {
  const doc = await db.collection("hotels").doc(hotelId).collection("staff").doc(staffId).get();
  return doc.exists ? (doc.data() as Staff) : null;
}
