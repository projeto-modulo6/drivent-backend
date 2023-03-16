import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activities-repository";

async function getActivityById(activityId: number){
    const activity = await activityRepository.findActivityById(activityId);
    if(!activity){
        throw notFoundError();
    }
    return activity;
}




const activityService = {
    getActivityById
  };
  
  export default activityService;