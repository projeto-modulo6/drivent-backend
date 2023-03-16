import { getActivities, getActivityById, getUserActivityByActivityId } from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
.all('/*', authenticateToken)
.get('/', getActivities)
.get('/:activityId', getActivityById)
.get('/useractivity/:activityId', getUserActivityByActivityId)

export { activitiesRouter };