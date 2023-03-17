import { notFoundError, invalidDataError } from "@/errors";
import activityRepository from "@/repositories/activities-repository";

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
  const locals = await activityRepository.findAllLocalsWithActivity(dateId, userId);
  if (!locals.length) {
    throw notFoundError();
  }
  return locals;
}

async function getDayActivitiesByLocale(dayId: number, localeId: number) {
  if (!Number(dayId) || !Number(localeId)) {
    throw invalidDataError(["Bad Request"]);
  }

  const activities = await activityRepository.findActivitiesByDayAndLocale(dayId, localeId);
  return activities;
}

const activityService = {
  getActivityById,
  getDates,
  getLocalsWithActivities,
  getDayActivitiesByLocale,
};

export default activityService;
