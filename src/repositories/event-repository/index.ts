import { prisma } from '@/config';
import redis from '@/config/databaseCache';
import { Event } from '@prisma/client';

async function findFirstCache(): Promise<Event> {
  const cacheEvent = await redis.get(`event`);
  return JSON.parse(cacheEvent);
}

async function findFirst() {
  const data = await prisma.event.findFirst();

  redis.set(`event`, JSON.stringify(data));
  return data;
}

const eventRepository = {
  findFirst,
  findFirstCache,
};

export default eventRepository;
