import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { TicketStatus } from '@prisma/client';

async function getTicketTypes() {
  let ticketTypes = await ticketRepository.findTicketTypesCache();
  if (!ticketTypes) {
    ticketTypes = await ticketRepository.findTicketTypes();
  }

  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  let enrollment = await enrollmentRepository.findWithAddressByUserIdCache(userId);
  if (!enrollment) {
    enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  }
  if (!enrollment) {
    throw notFoundError();
  }
  let ticket = await ticketRepository.findTicketByEnrollmentIdCache(enrollment.id);
  if (!ticket) {
    ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  }
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  let ticket = await ticketRepository.findTicketByEnrollmentIdCache(enrollmentId);
  if (!ticket) {
    ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
  }

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  let enrollment = await enrollmentRepository.findWithAddressByUserIdCache(userId);
  if (!enrollment) {
    enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  }
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);
  let ticket = await ticketRepository.findTicketByEnrollmentIdCache(enrollment.id);
  if (!ticket) {
    ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  }
  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
  getTicketByEnrollmentId,
};

export default ticketService;
