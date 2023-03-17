import { AuthenticatedRequest } from "@/middlewares";
import activityService from "@/services/activities-service";
import { query, Response } from "express";
import httpStatus from "http-status";

export async function getActivityById(req: AuthenticatedRequest, res: Response) {
  const { activityId } = req.query;
  try {
    const activity = await activityService.getActivityById(Number(activityId));
    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getAllDates(req: AuthenticatedRequest, res: Response) {
  try {
    const dates = await activityService.getDates();
    return res.status(httpStatus.OK).send(dates);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
