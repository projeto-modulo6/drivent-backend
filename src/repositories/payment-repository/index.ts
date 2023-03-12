import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Payment } from '@prisma/client';

async function findPaymentByTicketId(ticketId: number) {
  const data = await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  redis.setEx(`payment-ticketId-${ticketId}`, 600, JSON.stringify(data));
  return data;
}

async function findPaymentByTicketIdCache(ticketId: number): Promise<Payment> {
  const cachePayment = await redis.get(`payment-ticketId-${ticketId}`);
  return JSON.parse(cachePayment);
}

async function createPayment(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  findPaymentByTicketId,
  findPaymentByTicketIdCache,
  createPayment,
};

export default paymentRepository;
