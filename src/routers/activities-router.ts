import { getActivityById, getAllDates } from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter.all("/*", authenticateToken).get("/dates", getAllDates).get("/:activityId", getActivityById);

export { activitiesRouter };
