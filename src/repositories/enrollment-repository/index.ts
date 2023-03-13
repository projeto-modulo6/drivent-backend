import { prisma } from "@/config";
import redis from "@/config/databaseCache";
import { Address, Enrollment } from "@prisma/client";

async function findWithAddressByUserId(userId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });

  await redis.setEx(`enrollmentId-${data.id}-userId-${userId}`, expiration, JSON.stringify(data));
  return data;
}

async function findWithAddressByUserIdCache(userId: number): Promise<Enrollment & { Address: Address[] }> {
  const key = (await redis.keys(`enrollment*userId-${userId}`))[0];
  const cacheEnrollment = await redis.get(String(key));
  return JSON.parse(cacheEnrollment);
}

async function findById(enrollmentId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.enrollment.findFirst({
    where: { id: enrollmentId },
  });

  redis.setEx(`enrollmentId-${enrollmentId}`, expiration, JSON.stringify(data));
  return data;
}

async function findByIdCache(enrollmentId: number): Promise<Enrollment> {
  const cacheEnrollment = await redis.get(`enrollmentId-${enrollmentId}`);
  return JSON.parse(cacheEnrollment);
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  const data = await prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });

  const key = await redis.keys(`*enrollmentId-${data.id}*`);
  if (key.length) {
    redis.unlink(key);
  }
  return data;
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;

const enrollmentRepository = {
  findWithAddressByUserId,
  findWithAddressByUserIdCache,
  upsert,
  findById,
  findByIdCache,
};

export default enrollmentRepository;
