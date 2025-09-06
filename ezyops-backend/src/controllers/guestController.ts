import { Request, Response, NextFunction } from "express";
import * as guestService from "../services/guestService";

export async function createGuest(req: Request, res: Response, next: NextFunction) {
  try {
    const guest = await guestService.createGuest(req.params.hotelId, req.body);
    res.json(guest);
  } catch (e) { next(e); }
}

export async function getGuests(req: Request, res: Response, next: NextFunction) {
  try {
    const guests = await guestService.getGuests(req.params.hotelId);
    res.json(guests);
  } catch (e) { next(e); }
}

export async function getGuestById(req: Request, res: Response, next: NextFunction) {
  try {
    const guest = await guestService.getGuestById(req.params.hotelId, req.params.guestId);
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    res.json(guest);
  } catch (e) { next(e); }
}
