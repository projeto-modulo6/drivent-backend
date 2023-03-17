import { prisma } from "@/config";

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

async function findAllLocalsWithActivity(id: number) {
  const data = await prisma.local.findMany({
    include: {
      activity: {
        include: {
          _count: {
            select: {
              user_activity: true,
            },
          },
        },
        where: {
          date_id: id,
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
