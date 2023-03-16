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

const activityService = {
    getActivityById,
    getActivities
  };
  
  export default activityService;