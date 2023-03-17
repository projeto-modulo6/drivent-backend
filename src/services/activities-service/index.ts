import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activities-repository";
import { date_activity, local, activity } from "@prisma/client";

async function getActivityById(activityId: number) {
  const activity = await activityRepository.findActivityById(activityId);
  if (!activity) {
    throw notFoundError();
  }
  return activity;
}

async function getDates() {
  const dates = await activityRepository.findAllDates();
  if (!dates.length) {
    throw notFoundError();
  }
  return dates;
}

async function getLocalsWithActivities(dateId: number, userId: number) {
  let locals = await activityRepository.findAllLocalsWithActivity(dateId, userId);
  if (!locals.length) {
    throw notFoundError();
  }
  return locals;
}

const activityService = {
  getActivityById,
  getDates,
  getLocalsWithActivities,
};

export default activityService;
