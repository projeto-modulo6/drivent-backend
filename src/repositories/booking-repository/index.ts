import { prisma } from "@/config";
import redis from "@/config/databaseCache";
import { Booking, Room } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateParams = Omit<Booking, "createdAt" | "updatedAt">;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });

  redis.setEx(`booking-roomId-${roomId}`, expiration, JSON.stringify(data));
  return data;
}

async function findByRoomIdCache(roomId: number): Promise<(Booking & { Room: Room })[]> {
  const cacheBooking = await redis.get(`booking-roomId-${roomId}`);
  return JSON.parse(cacheBooking);
}

async function findByUserId(userId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });

  redis.setEx(`bookingId-${data.id}-userId-${userId}`, expiration, JSON.stringify(data));
  return data;
}

async function findByUserIdCache(userId: number): Promise<Booking & { Room: Room }> {
  const key = (await redis.keys(`booking*userId-${userId}`))[0];
  const cacheBooking = await redis.get(String(key));
  return JSON.parse(cacheBooking);
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  const data = await prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
  const key = await redis.keys(`*bookingId-${data.id}*`);
  redis.unlink(key);
  redis.del(`booking-roomId-${roomId}`);
  return data;
}

const bookingRepository = {
  create,
  findByRoomId,
  findByRoomIdCache,
  findByUserId,
  findByUserIdCache,
  upsertBooking,
};

export default bookingRepository;
