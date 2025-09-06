import { Request, Response, NextFunction } from "express";
import * as staffService from "../services/staffService";

export async function createStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const staff = await staffService.createStaff(req.params.hotelId, req.body);
    res.json(staff);
  } catch (e) { next(e); }
}

export async function getStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const staff = await staffService.getStaff(req.params.hotelId);
    res.json(staff);
  } catch (e) { next(e); }
}

export async function getStaffById(req: Request, res: Response, next: NextFunction) {
  try {
    const staff = await staffService.getStaffById(req.params.hotelId, req.params.staffId);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json(staff);
  } catch (e) { next(e); }
}
