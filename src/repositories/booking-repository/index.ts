import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Booking, Room } from '@prisma/client';

type CreateParams = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  const data = await prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });

  redis.setEx(`boking-roomId-${roomId}`, 600, JSON.stringify(data));
  return data;
}

async function findByRoomIdCache(roomId: number): Promise<Booking & { Room: Room }> {
  const cacheBooking = await redis.get(`boking-roomId-${roomId}`);
  return JSON.parse(cacheBooking);
}

async function findByUserId(userId: number) {
  const data = await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });

  redis.setEx(`boking-userId-${userId}`, 600, JSON.stringify(data));
  return data;
}

async function findByUserIdCache(userId: number): Promise<Booking & { Room: Room }> {
  const cacheBooking = await redis.get(`boking-userId-${userId}`);
  return JSON.parse(cacheBooking);
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  return prisma.booking.upsert({
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
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  findByUserIdCache,
  upsertBooking,
};

export default bookingRepository;
