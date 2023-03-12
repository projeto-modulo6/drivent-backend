import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Room } from '@prisma/client';

async function findAllByHotelId(hotelId: number) {
  const data = await prisma.room.findMany({
    where: {
      hotelId,
    },
  });
  redis.setEx(`room-hotelId-${hotelId}`, 600, JSON.stringify(data));
  return data;
}

async function findAllByHotelIdCache(hotelId: number): Promise<Room[]> {
  const cacheRoom = await redis.get(`room-hotelId-${hotelId}`);
  return JSON.parse(cacheRoom);
}

async function findById(roomId: number) {
  const data = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
  redis.setEx(`room-roomId-${roomId}`, 600, JSON.stringify(data));
  return data;
}

async function findByIdCache(roomId: number): Promise<Room> {
  const cacheRoom = await redis.get(`room-roomId-${roomId}`);
  return JSON.parse(cacheRoom);
}

const roomRepository = {
  findAllByHotelId,
  findAllByHotelIdCache,
  findById,
  findByIdCache,
};

export default roomRepository;
