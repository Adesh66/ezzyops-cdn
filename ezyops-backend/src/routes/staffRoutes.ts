import express from "express";
import * as staff from "../controllers/staffController.js";
import { requireAuthIfEnabled } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:hotelId/staff", requireAuthIfEnabled, staff.createStaff);
router.get("/:hotelId/staff", requireAuthIfEnabled, staff.getStaff);
router.get("/:hotelId/staff/:staffId", requireAuthIfEnabled, staff.getStaffById);

export default router;
