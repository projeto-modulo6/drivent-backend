import { getActivityById, getAllDates, getDayActivitiesByLocale, createUserActivity } from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/dates", getAllDates)
  .get("/:activityId", getActivityById)
  .get("/locale/:dayId/:localeId", getDayActivitiesByLocale)
  .post("/:activityId", createUserActivity)

export { activitiesRouter };
