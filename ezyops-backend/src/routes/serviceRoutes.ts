import express from "express";
import * as service from "../controllers/serviceController.js";
import { requireAuthIfEnabled } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:hotelId/services", requireAuthIfEnabled, service.createService);
router.get("/:hotelId/services", service.getServices);
router.get("/:hotelId/services/:serviceId", service.getServiceById);

export default router;
