import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

async function getHotelBookings(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
    include: {
      _count: {
        select: {
          Booking: true,
        },
      },
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  getHotelBookings,
};

export default hotelRepository;
