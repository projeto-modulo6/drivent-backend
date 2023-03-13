import { cannotBookingError, notFoundError } from '@/errors';
import roomRepository from '@/repositories/room-repository';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import tikectRepository from '@/repositories/ticket-repository';

async function checkEnrollmentTicket(userId: number) {
  let enrollment = await enrollmentRepository.findWithAddressByUserIdCache(userId);
  if (!enrollment) {
    enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  }
  if (!enrollment) {
    throw cannotBookingError();
  }
  let ticket = await tikectRepository.findTicketByEnrollmentIdCache(enrollment.id);
  if (!ticket) {
    ticket = await tikectRepository.findTicketByEnrollmentId(enrollment.id);
  }

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookingError();
  }
}

async function checkValidBooking(roomId: number) {
  let room = await roomRepository.findByIdCache(roomId);
  if (!room) {
    room = await roomRepository.findById(roomId);
  }
  let bookings = await bookingRepository.findByRoomIdCache(roomId);
  if (!bookings) {
    bookings = await bookingRepository.findByRoomId(roomId);
  }

  if (!room) {
    throw notFoundError();
  }
  if (room.capacity <= bookings.length) {
    throw cannotBookingError();
  }
}

async function getBooking(userId: number) {
  let booking = await bookingRepository.findByUserId(userId);
  if (!booking) {
    booking = await bookingRepository.findByUserId(userId);
  }
  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function bookingRoomById(userId: number, roomId: number) {
  await checkEnrollmentTicket(userId);
  await checkValidBooking(roomId);

  return bookingRepository.create({ roomId, userId });
}

async function changeBookingRoomById(userId: number, roomId: number) {
  await checkValidBooking(roomId);
  let booking = await bookingRepository.findByUserIdCache(userId);
  if (!booking) {
    booking = await bookingRepository.findByUserId(userId);
  }

  if (!booking || booking.userId !== userId) {
    throw cannotBookingError();
  }

  return bookingRepository.upsertBooking({
    id: booking.id,
    roomId,
    userId,
  });
}

const bookingService = {
  bookingRoomById,
  getBooking,
  changeBookingRoomById,
};

export default bookingService;
