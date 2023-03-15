import { PrismaClient } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log(new Date("10:00:00"));

  let types = await prisma.ticketType.findMany();
  let ticketTypes = {};
  if (types.length === 0) {
    ticketTypes = await prisma.ticketType.createMany({
      data: [
        {
          name: "Presential_with_Hotel",
          price: 600,
          isRemote: false,
          includesHotel: true,
        },
        {
          name: "Presential_without_Hotel",
          price: 250,
          isRemote: false,
          includesHotel: false,
        },
        {
          name: "Online",
          price: 100,
          isRemote: true,
          includesHotel: false,
        },
      ],
    });
  }
  let date = await prisma.date_activity.findFirst();
  let dates = {};
  if (!date) {
    dates = await prisma.date_activity.createMany({
      data: [
        {
          id: 1,
          name: "Sexta",
          date: new Date("2023-03-31"),
        },
        {
          id: 2,
          name: "Sábado",
          date: new Date("2023-04-01"),
        },
        {
          id: 3,
          name: "Domingo",
          date: new Date("2023-04-02"),
        },
      ],
    });
  }

  let local = await prisma.local.findFirst();
  let locals = {};
  if (!local) {
    locals = await prisma.local.createMany({
      data: [
        {
          id: 1,
          name: "Auditório Principal",
        },
        {
          id: 2,
          name: "Auditório Lateral",
        },
        {
          id: 3,
          name: "Sala de Workshop",
        },
      ],
    });
  }

  let activity = await prisma.activity.findFirst();
  let activities = {};
  if (!activity) {
    activities = await prisma.activity.createMany({
      data: [
        {
          name: "Minecraft: montando o PC ideal",
          local_id: 1,
          date_id: 1,
          begin: new Date("2023-03-31 06:00:00"),
          end: new Date("2023-03-31 07:00:00"),
          seats: 30,
        },
        {
          name: "Lol: montando o PC ideal",
          local_id: 1,
          date_id: 1,
          begin: new Date("2023-03-31 07:00:00"),
          end: new Date("2023-03-31 08:00:00"),
          seats: 30,
        },
        {
          name: "Doom: montando o PC ideal",
          local_id: 1,
          date_id: 1,
          begin: new Date("2023-03-31 08:00:00"),
          end: new Date("2023-03-31 10:00:00"),
          seats: 30,
        },
        {
          name: "Palestra A",
          local_id: 2,
          date_id: 1,
          begin: new Date("2023-03-31 06:00:00"),
          end: new Date("2023-03-31 07:00:00"),
          seats: 30,
        },
        {
          name: "Palestra B",
          local_id: 3,
          date_id: 1,
          begin: new Date("2023-03-31 06:00:00"),
          end: new Date("2023-03-31 07:00:00"),
          seats: 30,
        },
        {
          name: "Palestra C",
          local_id: 3,
          date_id: 1,
          begin: new Date("2023-03-31 07:00:00"),
          end: new Date("2023-03-31 09:00:00"),
          seats: 30,
        },
        {
          name: "Palestra D",
          local_id: 2,
          date_id: 2,
          begin: new Date("2023-04-01 06:00:00"),
          end: new Date("2023-04-01 07:00:00"),
          seats: 30,
        },
        {
          name: "Palestra E",
          local_id: 2,
          date_id: 2,
          begin: new Date("2023-04-01 07:00:00"),
          end: new Date("2023-04-01 08:00:00"),
          seats: 30,
        },
        {
          name: "Palestra F",
          local_id: 1,
          date_id: 3,
          begin: new Date("2023-04-02 06:00:00"),
          end: new Date("2023-04-02 07:00:00"),
          seats: 30,
        },
        {
          name: "Palestra G",
          local_id: 2,
          date_id: 3,
          begin: new Date("2023-04-02 06:00:00"),
          end: new Date("2023-04-02 07:00:00"),
          seats: 30,
        },
        {
          name: "Palestra H",
          local_id: 3,
          date_id: 3,
          begin: new Date("2023-04-02 06:00:00"),
          end: new Date("2023-04-02 07:00:00"),
          seats: 30,
        },
      ],
    });
  }

  console.log({ event }, " ", ticketTypes);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
