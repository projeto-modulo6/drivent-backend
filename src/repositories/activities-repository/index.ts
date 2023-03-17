import { prisma } from "@/config";
import { user_activity } from "@prisma/client";

type CreateParams = Omit<user_activity, "id" | "createdAt" | "updatedAt">;

async function createUserActivity({activity_id, user_id}: CreateParams): Promise<user_activity>{

    return await prisma.user_activity.create({
        data: {
            activity_id,
            user_id
        }
    })

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
}

export default activityRepository;