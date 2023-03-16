import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activities-repository";

async function getActivities(){
    const activities = await activityRepository.findActivities();
    if(!activities){
        throw notFoundError();
    }
    return activities;
}

async function getActivityById(activityId: number){
    const activity = await activityRepository.findActivityById(activityId);
    if(!activity){
        throw notFoundError();
    }
    return activity;
}

async function getUserActivitiesByActivityId(activityId: number){
    const userActivities = await activityRepository.findUserActivitiesByActivityId(activityId);
    if(!userActivities){
        throw notFoundError();
    }
    return userActivities;
}

const activityService = {
    getActivityById,
    getActivities,
    getUserActivitiesByActivityId
  };
  
  export default activityService;