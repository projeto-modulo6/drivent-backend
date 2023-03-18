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

export async function getDayActivitiesByLocale(req: AuthenticatedRequest, res: Response) {
  const { dayId, localeId } = req.params;
  try {
    const activities = await activityService.getDayActivitiesByLocale(Number(dayId), Number(localeId));
    return res.status(httpStatus.OK).send(activities);
  } catch (err) {
    if (err.name === "RequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllLocales(req: AuthenticatedRequest, res: Response) {
  try {
    const locales = await activityService.getLocales();
    return res.status(httpStatus.OK).send(locales);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
