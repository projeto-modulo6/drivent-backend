import { prisma } from "@/config";
import { user_activity } from "@prisma/client";

type CreateParams = Omit<user_activity, "id" | "createdAt" | "updatedAt">;

async function createUserActivity(user_id: number, activity_id: number){

    return await prisma.user_activity.create({
        data: {
            activity_id,
            user_id
        }
    })
}

async function findUserActivityByUserId(userId: number, activityId: number){

  return await prisma.user_activity.findFirst({
    where:{
      activity_id: activityId,
      user_id: userId,
    }
  })

}
import { activity, local } from "@prisma/client";

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

async function findAllLocales(): Promise<local[]> {
  return await prisma.local.findMany({
    orderBy: {
      id: "asc",
    },
  });
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

async function findActivitiesByDayAndLocale(dateId: number, localeId: number): Promise<activity[]> {
  return prisma.activity.findMany({
    where: {
      local_id: localeId,
      date_id: dateId,
    },
  });
}

async function findUserActivitiesByActivityId(activityId: number) {
  const data = await prisma.user_activity.findMany({
    where: {
      activity_id: Number(activityId),
    },
  });
  return data;
}

async function deleteUserActivity(id: number){
  return await prisma.user_activity.delete({
    where: {
      id: id
    }
  })
}

const activityRepository = {
  findActivityById,
  findAllDates,
  findAllLocalsWithActivity,
  findActivitiesByDayAndLocale,
  createUserActivity,
  findUserActivityByUserId,
  findAllLocales,
  findUserActivitiesByActivityId,
  deleteUserActivity
};

export default activityRepository;
