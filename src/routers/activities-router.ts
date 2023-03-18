import {
  getActivityById,
  getAllDates,
  getAllLocales,
  getDayActivitiesByLocale,
} from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/dates", getAllDates)
  .get("/locale/:dayId/:localeId", getDayActivitiesByLocale)
  .get("/allLocales", getAllLocales)
  .get("/:activityId", getActivityById);

export { activitiesRouter };
