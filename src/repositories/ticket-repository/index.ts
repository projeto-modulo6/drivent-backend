import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Enrollment, Ticket, TicketStatus, TicketType } from '@prisma/client';

async function findTicketTypes() {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.ticketType.findMany();
  redis.setEx(`ticketType`, expiration, JSON.stringify(data));
  return data;
}

async function findTicketTypesCache(): Promise<TicketType[]> {
  const cacheTicketType = await redis.get(`ticketType`);
  return JSON.parse(cacheTicketType);
}

async function findTickeyById(ticketId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
  redis.setEx(`ticket-ticketId-${ticketId}`, expiration, JSON.stringify(data));
  return data;
}

async function findTickeyByIdCache(ticketId: number): Promise<Ticket & { Enrollment: Enrollment }> {
  const cacheTicket = await redis.get(`ticket-ticketId-${ticketId}`);
  return JSON.parse(cacheTicket);
}

async function findTickeWithTypeById(ticketId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
  redis.setEx(`ticketWithType-ticketId-${ticketId}`, expiration, JSON.stringify(data));
  return data;
}

async function findTickeWithTypeByIdCache(ticketId: number): Promise<Ticket & { TicketType: TicketType }> {
  const cacheTicket = await redis.get(`ticketWithType-ticketId-${ticketId}`);
  return JSON.parse(cacheTicket);
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  const expiration: number = Number(process.env.REDIS_EXPIRATION);
  const data = await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true, //inner join
    },
  });
  redis.setEx(`ticket-enrollmentId-${enrollmentId}`, expiration, JSON.stringify(data));
  return data;
}

async function findTicketByEnrollmentIdCache(enrollmentId: number): Promise<Ticket & { TicketType: TicketType }> {
  const cacheTicket = await redis.get(`ticket-enrollmentId-${enrollmentId}`);
  return JSON.parse(cacheTicket);
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketRepository = {
  findTicketTypesCache,
  findTicketTypes,
  findTickeyByIdCache,
  findTickeWithTypeByIdCache,
  findTicketByEnrollmentId,
  findTicketByEnrollmentIdCache,
  createTicket,
  findTickeyById,
  findTickeWithTypeById,
  ticketProcessPayment,
};

export default ticketRepository;
