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

async function findActivityById(activityId: number) {
  const data = await prisma.activity.findFirst({
    where: {
      id: activityId,
    },
  });
  return data;
}

async function findAllDates() {
  const data = await prisma.date_activity.findMany({
    orderBy: {
      date: "asc",
    },
  });
  return data;
}

async function findAllLocalsWithActivity(dateId: number, userId: number) {
  const data = await prisma.local.findMany({
    include: {
      activity: {
        include: {
          _count: {
            select: {
              user_activity: true,
            },
          },
          user_activity: {
            where: { id: userId },
          },
        },
        where: {
          date_id: dateId,
        },
        orderBy: {
          begin: "asc",
        },
      },
    },
  });
  return data;
}

const activityRepository = {
  findActivityById,
  findAllDates,
  findAllLocalsWithActivity,
};

export default activityRepository;
