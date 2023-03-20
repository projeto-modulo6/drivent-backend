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
          name: "Quinta",
          date: new Date("2023-03-31"),
        },
        {
          id: 2,
          name: "Sexta",
          date: new Date("2023-04-01"),
        },
        {
          id: 3,
          name: "Sábado",
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
          begin: new Date("2023-03-31 09:00:00"),
          end: new Date("2023-03-31 10:00:00"),
          seats: 1,
        },
        {
          name: "Lol: montando o PC ideal",
          local_id: 1,
          date_id: 1,
          begin: new Date("2023-03-31 10:00:00"),
          end: new Date("2023-03-31 11:00:00"),
          seats: 30,
        },
        {
          name: "Doom: montando o PC ideal",
          local_id: 1,
          date_id: 1,
          begin: new Date("2023-03-31 11:00:00"),
          end: new Date("2023-03-31 12:00:00"),
          seats: 30,
        },
        {
          name: "Palestra A",
          local_id: 2,
          date_id: 1,
          begin: new Date("2023-03-31 09:00:00"),
          end: new Date("2023-03-31 10:00:00"),
          seats: 30,
        },
        {
          name: "Palestra B",
          local_id: 3,
          date_id: 1,
          begin: new Date("2023-03-31 09:00:00"),
          end: new Date("2023-03-31 10:00:00"),
          seats: 30,
        },
        {
          name: "Palestra C",
          local_id: 3,
          date_id: 1,
          begin: new Date("2023-03-31 10:00:00"),
          end: new Date("2023-03-31 12:00:00"),
          seats: 30,
        },
        {
          name: "Palestra D",
          local_id: 2,
          date_id: 2,
          begin: new Date("2023-04-01 09:00:00"),
          end: new Date("2023-04-01 10:00:00"),
          seats: 30,
        },
        {
          name: "Palestra E",
          local_id: 2,
          date_id: 2,
          begin: new Date("2023-04-01 10:00:00"),
          end: new Date("2023-04-01 11:00:00"),
          seats: 30,
        },
        {
          name: "Palestra F",
          local_id: 1,
          date_id: 3,
          begin: new Date("2023-04-02 09:00:00"),
          end: new Date("2023-04-02 10:00:00"),
          seats: 30,
        },
        {
          name: "Palestra G",
          local_id: 2,
          date_id: 3,
          begin: new Date("2023-04-02 09:00:00"),
          end: new Date("2023-04-02 10:00:00"),
          seats: 30,
        },
        {
          name: "Palestra H",
          local_id: 3,
          date_id: 3,
          begin: new Date("2023-04-02 09:00:00"),
          end: new Date("2023-04-02 10:00:00"),
          seats: 30,
        },
      ],
    });
  }

  let hotels = await prisma.hotel.findMany();
  let newHotels = {};
  if (hotels.length === 0) {
    newHotels = await prisma.hotel.createMany({
      data: [
        {
          name: "Flamengo Resort",
          image: "https://i2.wp.com/blogchicosoares.com/wp-content/uploads/2021/12/FLA.jpg?fit=636%2C371&ssl=1",
        },
        {
          name: "Flamengo Palace",
          image: "http://multirio.rio.rj.gov.br/images/img_2017_02/rep200.jpg",
        },
        {
          name: "Flamengo World",
          image: "https://pbs.twimg.com/media/Fpbn9amXEAwiABT.jpg",
        },
      ],
    });
  }

  let rooms = await prisma.room.findFirst();
  let newRooms = {};
  if (!rooms) {
    newRooms = await prisma.room.createMany({
      data: [
        {
          name: "1",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "2",
          capacity: 2,
          hotelId: 1,
        },
        {
          name: "3",
          capacity: 3,
          hotelId: 1,
        },
        {
          name: "1",
          capacity: 1,
          hotelId: 2,
        },
        {
          name: "2",
          capacity: 2,
          hotelId: 2,
        },
        {
          name: "3",
          capacity: 3,
          hotelId: 2,
        },
        {
          name: "1",
          capacity: 1,
          hotelId: 3,
        },
        {
          name: "2",
          capacity: 2,
          hotelId: 3,
        },
        {
          name: "3",
          capacity: 3,
          hotelId: 3,
        },
      ],
    });
  }
  async function newUserActFull() {
    for (let i = 0; i < 30; i++) {
      await prisma.user_activity.createMany({
        data: [
          {
            activity_id: 4,
            user_id: 1,
          },
        ],
      });
    }
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
