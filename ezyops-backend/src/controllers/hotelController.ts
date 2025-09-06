import { Request, Response, NextFunction } from "express";
import * as hotelService from "../services/hotelService";

export async function createHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelService.createHotel(req.body);
    res.json(hotel);
  } catch (e) { next(e); }
}

export async function getHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelService.getHotels();
    res.json(hotels);
  } catch (e) { next(e); }
}

export async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelService.getHotelById(req.params.hotelId);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (e) { next(e); }
}

export async function updateHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await hotelService.updateHotel(req.params.hotelId, req.body);
    res.json(updated);
  } catch (e) { next(e); }
}

export async function deleteHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await hotelService.deleteHotel(req.params.hotelId);
    res.json(result);
  } catch (e) { next(e); }
}
