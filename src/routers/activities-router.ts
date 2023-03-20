
import {
  getActivityById,
  getAllDates,
  getAllLocales,
  getDayActivitiesByLocale,
  getUserActivityByActivityId,
  createUserActivity,
  deletingUserActivityById
} from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/dates", getAllDates)
  .get("/allLocales", getAllLocales)
  .post("/:activityId", createUserActivity)
  .get("/:activityId", getActivityById)
  .get("/locale/:dayId/:localeId", getDayActivitiesByLocale)
  .get("/:activityId", getActivityById)
  .get("/useractivity/:activityId", getUserActivityByActivityId)
  .delete("/:userActivityId", deletingUserActivityById)

export { activitiesRouter };
