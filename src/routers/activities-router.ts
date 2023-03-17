import { getActivityById, getAllDatesWithActivities } from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/datesWithActivities", getAllDatesWithActivities)
  .get("/:activityId", getActivityById);

export { activitiesRouter };
