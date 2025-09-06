import { Request, Response, NextFunction } from "express";
import * as serviceService from "../services/serviceService";

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await serviceService.createService(req.params.hotelId, req.body);
    res.json(service);
  } catch (e) { next(e); }
}

export async function getServices(req: Request, res: Response, next: NextFunction) {
  try {
    const services = await serviceService.getServices(req.params.hotelId);
    res.json(services);
  } catch (e) { next(e); }
}

export async function getServiceById(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await serviceService.getServiceById(req.params.hotelId, req.params.serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (e) { next(e); }
}
