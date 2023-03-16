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

const activityRepository = {
    findActivityById,
    findActivities
}

export default activityRepository;