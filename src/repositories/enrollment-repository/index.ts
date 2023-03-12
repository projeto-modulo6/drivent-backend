import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Address, Enrollment } from '@prisma/client';

async function findWithAddressByUserId(userId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });

  redis.setEx(`enrollment-userId-${userId}`, expiration, JSON.stringify(data));
  return data;
}

async function findWithAddressByUserIdCache(userId: number): Promise<Enrollment & { Address: Address[] }> {
  const key = await redis.keys(`enrollment*userId-${userId}`);
  const cacheEnrollment = await redis.get(key[0]);
  return JSON.parse(cacheEnrollment);
}

async function findById(enrollmentId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.enrollment.findFirst({
    where: { id: enrollmentId },
  });

  redis.setEx(`enrollment-enrollmentId-${enrollmentId}`, expiration, JSON.stringify(data));
  return data;
}

async function findByIdCache(enrollmentId: number): Promise<Enrollment> {
  const key = await redis.keys(`enrollment*enrollmentId-${enrollmentId}`);
  console.log(key);
  const cacheEnrollment = await redis.get(`enrollment-enrollmentId-${enrollmentId}`);
  return JSON.parse(cacheEnrollment);
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  findWithAddressByUserIdCache,
  upsert,
  findById,
  findByIdCache,
};

export default enrollmentRepository;
