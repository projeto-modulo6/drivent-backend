import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
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
  let ticketTypes = {}
  if(types.length === 0){
    ticketTypes = await prisma.ticketType.createMany({
      data: [
        {
          name: 'Presential_with_Hotel',
          price: 600,
          isRemote: false,
          includesHotel: true,
        },
        {
          name: 'Presential_without_Hotel',
          price: 250,
          isRemote: false,
          includesHotel: false,
        },
        {
          name: 'Online',
          price: 100,
          isRemote: true,
          includesHotel: false,
        }
      ]
    })
  }

  let hotels = await prisma.hotel.findMany();
  let newHotels = {};
  if(hotels.length === 0){
    newHotels = await prisma.hotel.createMany({
      data: [
        {
          name: 'Flamengo Resort',
          image: 'https://i2.wp.com/blogchicosoares.com/wp-content/uploads/2021/12/FLA.jpg?fit=636%2C371&ssl=1'
        },
        {
          name: 'Flamengo Palace',
          image: 'http://multirio.rio.rj.gov.br/images/img_2017_02/rep200.jpg'
        },
        {
          name: 'Flamengo World',
          image: 'https://pbs.twimg.com/media/Fpbn9amXEAwiABT.jpg'
        }
      ]
    })
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
