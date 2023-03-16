import { prisma } from "@/config";

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
}

export default activityRepository;