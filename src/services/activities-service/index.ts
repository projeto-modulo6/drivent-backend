import { notFoundError, invalidDataError, conflictError, requestError } from "@/errors";
import activityRepository from "@/repositories/activities-repository";
import { activity, local } from "@prisma/client";

async function getActivityById(activityId: number) {
  const activity = await activityRepository.findActivityById(activityId);
  if (!activity) {
    throw notFoundError();
  }
  return activity;
}

async function creatingUserActivity(userId: number, activityId: number){

  const verifyByUserId = await activityRepository.findUserActivityByUserId(userId);

  if(verifyByUserId){
    throw conflictError("This user is already registered with this activity")
  }

  const verifyActivity = await activityRepository.findActivityById(activityId);

  if(!verifyActivity){
    throw notFoundError()
  }

  const createUserActivity = await activityRepository.createUserActivity(userId, activityId);

  if(!createUserActivity){
    throw requestError(400, "Bad Request")
  }

  return createUserActivity

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

async function getDayActivitiesByLocale(dayId: number, localeId: number): Promise<activity[]> {
  if (!Number(dayId) || !Number(localeId)) {
    throw invalidDataError(["Bad Request"]);
  }

  const activities = await activityRepository.findActivitiesByDayAndLocale(dayId, localeId);
  return activities;
}

async function getLocales(): Promise<local[]> {
  const locales = await activityRepository.findAllLocales();
  return locales;
}

const activityService = {
  getActivityById,
  getDates,
  getLocalsWithActivities,
  getDayActivitiesByLocale,
  creatingUserActivity,
  getLocales
};

export default activityService;
