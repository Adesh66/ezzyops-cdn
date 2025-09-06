import express from "express";
import * as hotel from "../controllers/hotelController.js";
import { requireAuthIfEnabled } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", requireAuthIfEnabled, hotel.createHotel);
router.get("/", hotel.getHotels);
router.get("/:hotelId", hotel.getHotelById);
router.patch("/:hotelId", requireAuthIfEnabled, hotel.updateHotel);
router.delete("/:hotelId", requireAuthIfEnabled, hotel.deleteHotel);

export default router;
