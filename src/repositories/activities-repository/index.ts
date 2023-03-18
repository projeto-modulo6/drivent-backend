import { prisma } from "@/config";
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
  findAllDates,
  findAllLocalsWithActivity,
  findActivitiesByDayAndLocale,
  findAllLocales,
  findUserActivitiesByActivityId
};

export default activityRepository;
