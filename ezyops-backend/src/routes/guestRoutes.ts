import express from "express";
import * as guest from "../controllers/guestController.js";
import { requireAuthIfEnabled } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:hotelId/guests", requireAuthIfEnabled, guest.createGuest);
router.get("/:hotelId/guests", guest.getGuests);
router.get("/:hotelId/guests/:guestId", guest.getGuestById);

export default router;
