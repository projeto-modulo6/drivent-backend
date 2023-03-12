import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsWithRooms, getHotelVacancy } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .get("/:hotelId/vacancy", getHotelVacancy)
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelsWithRooms);

export { hotelsRouter };
