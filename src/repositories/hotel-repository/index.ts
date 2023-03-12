import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Hotel, Room } from '@prisma/client';

async function findHotels() {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.hotel.findMany();
  redis.setEx(`hotel`, expiration, JSON.stringify(data));
  return data;
}

async function findHotelsCache(): Promise<Hotel[]> {
  const cacheHotel = await redis.get(`hotel`);
  return JSON.parse(cacheHotel);
}

async function findRoomsByHotelId(hotelId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
  redis.setEx(`hotel-hotelId-${hotelId}`, expiration, JSON.stringify(data));
  return data;
}

async function findRoomsByHotelIdCache(hotelId: number): Promise<Hotel & { Rooms: Room[] }> {
  const cacheHotel = await redis.get(`hotel-hotelId-${hotelId}`);
  return JSON.parse(cacheHotel);
}

const hotelRepository = {
  findHotels,
  findHotelsCache,
  findRoomsByHotelId,
  findRoomsByHotelIdCache,
};

export default hotelRepository;
