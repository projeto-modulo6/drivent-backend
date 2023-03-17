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

async function getDateWithActivities() {
  const activity = await activityRepository.findAllDates();
  if (!activity.length) {
    throw notFoundError();
  }
  let date: date_activity_with_local[] = [];
  for (let i = 0; i < activity.length; i++) {
    let locals = await activityRepository.findAllLocalsWithActivity(activity[i].id);
    date.push({
      ...activity[i],
      local: locals,
    });
  }
  return date;
}

type Local_With_Activity = { local: local[] };
type date_activity_with_local = date_activity & Local_With_Activity;

const activityService = {
  getActivityById,
  getDateWithActivities,
};

export default activityService;
