import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';

async function listHotels(userId: number) {
  //Tem enrollment?
  let enrollment = await enrollmentRepository.findWithAddressByUserIdCache(userId);
  if (!enrollment) {
    enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  }
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  let ticket = await ticketRepository.findTicketByEnrollmentIdCache(enrollment.id);
  if (!ticket) {
    ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  }

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  await listHotels(userId);

  let hotels = await hotelRepository.findHotelsCache();
  if (!hotels) {
    hotels = await hotelRepository.findHotels();
  }
  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);
  let hotel = await hotelRepository.findRoomsByHotelIdCache(hotelId);
  if (!hotel) {
    hotel = await hotelRepository.findRoomsByHotelId(hotelId);
  }

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelService = {
  getHotels,
  getHotelsWithRooms,
};

export default hotelService;
