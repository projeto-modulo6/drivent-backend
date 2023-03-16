import { prisma } from "@/config";

async function findActivities(){
    const data = await prisma.activity.findMany();
    return data;
}

async function findActivityById(activityId: number){
    const data = await prisma.activity.findFirst({
        where:{
            id: activityId
        }
    });
    return data;
}

async function findUserActivitiesByActivityId(activityId: number){
    const data = await prisma.user_activity.findMany({
        where:{
            id: activityId
        }
    })
    return data;
}

const activityRepository = {
    findActivityById,
    findActivities,
    findUserActivitiesByActivityId
}

export default activityRepository;