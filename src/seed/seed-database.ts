import dayjs from "dayjs";
import prisma from "../lib/prisma";
import bcryptjs from "bcryptjs";

async function main() {
  // 1. Delete previous records
  await prisma.subscription.deleteMany();
  await prisma.prize.deleteMany();
  await prisma.raffle.deleteMany();
  await prisma.user.deleteMany();

  // 2. Insert dummy data

  // ---> insert users
  await prisma.user.createMany({
    data: [
      {
        name: "Admin 1",
        email: "admin1@test.com",
        role: "admin",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Admin 2",
        email: "admin2@test.com",
        role: "admin",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Admin 3",
        email: "admin3@test.com",
        role: "admin",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Caspian",
        email: "caspian@test.com",
        role: "user",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Kellan",
        email: "kellan@test.com",
        role: "user",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Oberon",
        email: "oberon@test.com",
        role: "user",
        password: bcryptjs.hashSync("1234"),
      },
    ],
  });

  const [admin1, admin2, admin3] = await prisma.user.findMany({
    where: {
      role: "admin",
    },
    orderBy: {
      name: "asc",
    },
  });
  const [studentCaspian, studentKellan, studentOberon] =
    await prisma.user.findMany({
      where: {
        role: "user",
      },
      orderBy: {
        name: "asc",
      },
    });

  // ---> insert raffles

  const codeQuestRaffle = "Code Quest 2024";
  const raffleInProgressDefinition = {
    name: codeQuestRaffle,
    description:
      "👨🏻¡Arranca el #CodeQuest2024! \n 🖥️Su misión es desarrollar una aplicación Web FullStack para realizar sorteos entre miembros de #Discord \n 👉🏻Recuerden coordinar con su equipo designado en los canales exclusivos creados en la comunidad \n ⏳Entrega: Lunes 18 de Marzo 9:00AM (GMT-6)🇲🇽",
    termsAndConditions: "Aplica terminos y condiciones",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1587916895143043073/DMpsgyZ4_400x400.jpg",
    timezone: "America/Mexico_City",
    startAt: dayjs().toDate(),
    endAt: dayjs().add(1, "week").toDate(),
    userId: admin1.id,
  };

  const secretFriendsRaffle = "Amigos Secreto PRO";
  const raffleFinishedDefinition = {
    name: secretFriendsRaffle,
    description:
      "🎁 Habrá 2 ganador de: GiftCard de Amazon $100 \n +Extensión Suscripción PRO por 3 meses \n +3 meses de Suscripción PRO",
    termsAndConditions:
      "¡Aplican todos los suscriptores #DevTallesPRO activos, con 7 días de antigüedad o más!🎄",
    imageUrl:
      "https://media.licdn.com/dms/image/D4E22AQF_G4eF93uGEA/feedshare-shrink_800/0/1705699067984?e=2147483647&v=beta&t=-5Rm6ly2-KuIBFmkEfrWQxUavRKmnME5UbUb95o7GMw",
    timezone: "Europe/Madrid",
    startAt: dayjs().subtract(1, "week").toDate(),
    endAt: dayjs().subtract(1, "day").toDate(),
    userId: admin2.id,
  };

  await prisma.raffle.createMany({
    data: [raffleInProgressDefinition, raffleFinishedDefinition],
  });

  const raffleInProgress = await prisma.raffle.findFirstOrThrow({
    where: {
      name: codeQuestRaffle,
    },
  });
  const raffleFinished = await prisma.raffle.findFirstOrThrow({
    where: {
      name: secretFriendsRaffle,
    },
  });

  // ---> insert prizes
  const prizeForRaffleInProgress1 = {
    name: "Primer lugar $500",
    description: "",
    quantity: 1,
    raffleId: raffleInProgress.id,
  };
  const prizeForRaffleInProgress2 = {
    name: "Segundo lugar $300",
    description: "",
    quantity: 1,
    raffleId: raffleInProgress.id,
  };
  const prizeForRaffleInProgress3 = {
    name: "Segundo lugar $200",
    description: "",
    quantity: 1,
    raffleId: raffleInProgress.id,
  };
  const prizeForRaffleFinishedDefinition = {
    name: "GiftCard de Amazon $100",
    description: "",
    quantity: 2,
    raffleId: raffleFinished.id,
  };

  await prisma.prize.createMany({
    data: [
      prizeForRaffleInProgress1,
      prizeForRaffleInProgress2,
      prizeForRaffleInProgress3,
      prizeForRaffleFinishedDefinition,
    ],
  });

  const prizeForRaffleFinished = await prisma.prize.findFirstOrThrow({
    where: {
      name: "GiftCard de Amazon $100",
    },
  });

  // ---> insert subscriptions
  const subscriptionWithWinner1ForRaffleFinished = {
    userId: studentCaspian.id,
    raffleId: raffleFinished.id,
    prizeId: prizeForRaffleFinished.id,
  };
  const subscriptionWithWinner2ForRaffleFinished = {
    userId: studentKellan.id,
    raffleId: raffleFinished.id,
    prizeId: prizeForRaffleFinished.id,
  };
  const subscriptionWithoutWinnerForRaffleFinished = {
    userId: studentOberon.id,
    raffleId: raffleFinished.id,
    prizeId: prizeForRaffleFinished.id,
  };
  const subscriptionForRaffleInProgress1 = {
    userId: studentCaspian.id,
    raffleId: raffleInProgress.id,
  };
  const subscriptionForRaffleInProgress2 = {
    userId: studentKellan.id,
    raffleId: raffleInProgress.id,
  };
  const subscriptionForRaffleInProgress3 = {
    userId: studentOberon.id,
    raffleId: raffleInProgress.id,
  };

  await prisma.subscription.createMany({
    data: [
      subscriptionWithWinner1ForRaffleFinished,
      subscriptionWithWinner2ForRaffleFinished,
      subscriptionWithoutWinnerForRaffleFinished,
      subscriptionForRaffleInProgress1,
      subscriptionForRaffleInProgress2,
      subscriptionForRaffleInProgress3,
    ],
  });

  console.log("Seed executed correctly!");
}

(() => {
  main();
})();
