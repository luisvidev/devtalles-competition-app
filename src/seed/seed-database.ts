import dayjs from "../lib/dayjs";
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
        name: "Johana Fernández",
        email: "johana@test.com",
        role: "user",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Kevin Ricon",
        email: "kevin@test.com",
        role: "user",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Gustavo Perez",
        email: "gustavo@test.com",
        role: "user",
        password: bcryptjs.hashSync("1234"),
      },
      {
        name: "Luis Fernando",
        email: "luis@test.com",
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

  const [studentGustavo, studentJohana, studentKevin, studentLuis] =
    await prisma.user.findMany({
      where: {
        role: "user",
      },
      orderBy: {
        name: "asc",
      },
    });

  // ---> insert raffles
  const codeQuestRaffle = "[EN PROGRESO] Code Quest";
  const raffleInProgressDefinition = {
    name: codeQuestRaffle,
    description:
      "👨🏻¡Arranca el #CodeQuest! \n 🖥️Su misión es desarrollar una aplicación Web FullStack para realizar sorteos entre miembros de #Discord \n 👉🏻Recuerden coordinar con su equipo designado en los canales exclusivos creados en la comunidad \n ⏳Entrega: Lunes 18 de Marzo 9:00AM (GMT-6)🇲🇽",
    termsAndConditions: "Aplica terminos y condiciones",
    imageUrl:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    timezone: "America/Mexico_City",
    endAt: dayjs.utc().add(1, "week").endOf("day").toDate(), // 23:99 utc -> 19:59 Mexico
    authorId: admin1.id,
  };

  const raffleDevtallesHackathon = "[EN PROGRESO*] Devtalles Hackathon";
  const raffleInProgressDefinition2 = {
    name: raffleDevtallesHackathon,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a scelerisque eros, pretium tempor urna. Sed libero dui, cursus eu sodales at, accumsan et quam. Nullam eu ante justo. Nunc consequat, ipsum vel auctor pulvinar, lectus enim fermentum orci, vitae malesuada nunc erat vitae arcu. Donec finibus nec eros a imperdiet. Donec vel eros a justo cursus pharetra. Curabitur sollicitudin lacinia faucibus. Ut sem nibh, ultrices at ex in, feugiat porttitor ipsum. Quisque quam purus, rhoncus sit amet dolor eget, gravida condimentum sapien. Pellentesque a nibh eu neque cursus eleifend. Ut eu magna sem. Vivamus auctor a lacus varius aliquam. Curabitur eget eros nec sem dignissim tincidunt congue ac metus. Ut eu cursus magna, id lacinia odio. Praesent non ligula aliquam, blandit erat eu, ultricies tortor. Integer tincidunt nisi sapien, id blandit leo ullamcorper id.
    Etiam sodales magna nec metus finibus, eget lobortis tortor euismod. Vivamus pretium vehicula augue ut blandit. Nullam porta turpis id metus maximus, bibendum faucibus elit porttitor. Morbi pulvinar lacus a tortor molestie, a suscipit nulla ultrices. Nunc eu dapibus quam. Integer eu lectus a dolor elementum posuere ac vel nisl. Mauris lectus lacus, dignissim eu augue ut, vehicula ornare metus. Donec dui orci, blandit sed mi sit amet, iaculis pretium nibh. Curabitur a dui at urna tristique commodo. In sollicitudin magna a ligula vehicula posuere. Aenean ac orci vel ex facilisis vulputate. Phasellus lacinia a nibh quis porta. Nunc eros eros, mollis non ex vitae, pulvinar rhoncus tellus. Quisque ac vestibulum dolor. In nec dui dignissim leo aliquet posuere.`,
    termsAndConditions: `Proin ut neque vehicula, commodo purus dignissim, mattis eros. Donec vel ipsum leo. Nam vitae libero massa. Nullam aliquet purus eget purus vehicula, at hendrerit neque venenatis. Nam eget laoreet orci. Aenean quis odio risus. Duis lacus dolor, hendrerit in consectetur at, condimentum non sapien. Phasellus justo arcu, dictum id turpis a, mattis venenatis neque.
    Nam vitae quam eu sapien blandit ornare nec ac quam. Vestibulum suscipit mauris nunc, ac convallis neque sagittis at. Quisque varius mollis dui nec interdum. Pellentesque molestie vel risus ac varius. Cras malesuada tristique scelerisque. Maecenas eu vestibulum nunc, vitae fringilla justo. Aliquam imperdiet purus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque ligula lectus, scelerisque sed erat euismod, finibus lacinia ligula. Aliquam erat volutpat.`,
    imageUrl:
      "https://cdn.sanity.io/images/tlr8oxjg/production/2df8638e709b31e67768e848c1b38b83bad4df41-1456x816.png?w=3840&q=80&fit=clip&auto=format",
    timezone: "Europe/Madrid",
    endAt: dayjs.utc().add(2, "minute").set("seconds", 0).toDate(),
    authorId: admin2.id,
  };

  const secretFriendsRaffle = "[FINALIZADO]Amigos Secreto PRO";
  const raffleFinishedDefinition = {
    name: secretFriendsRaffle,
    description:
      "🎁 Habrá 2 ganador de: GiftCard de Amazon $100 \n +Extensión Suscripción PRO por 3 meses \n +3 meses de Suscripción PRO",
    termsAndConditions:
      "¡Aplican todos los suscriptores #DevTallesPRO activos, con 7 días de antigüedad o más!🎄",
    imageUrl:
      "https://media.licdn.com/dms/image/D4E22AQF_G4eF93uGEA/feedshare-shrink_800/0/1705699067984?e=2147483647&v=beta&t=-5Rm6ly2-KuIBFmkEfrWQxUavRKmnME5UbUb95o7GMw",
    timezone: "America/Toronto",
    endAt: dayjs().utc().subtract(1, "day").toDate(),
    authorId: admin3.id,
  };

  await prisma.raffle.createMany({
    data: [
      raffleInProgressDefinition,
      raffleInProgressDefinition2,
      raffleFinishedDefinition,
    ],
  });

  const raffleInProgress1 = await prisma.raffle.findFirstOrThrow({
    where: {
      name: codeQuestRaffle,
    },
  });
  const raffleInProgress2 = await prisma.raffle.findFirstOrThrow({
    where: {
      name: raffleDevtallesHackathon,
    },
  });
  const raffleFinished = await prisma.raffle.findFirstOrThrow({
    where: {
      name: secretFriendsRaffle,
    },
  });

  // ---> insert prizes

  // Prizes for "[EN PROGRESO] Code Quest"
  const prizeForRaffleInProgress1 = {
    name: "Primer lugar $500",
    description: "",
    raffleId: raffleInProgress1.id,
  };
  const prizeForRaffleInProgress2 = {
    name: "Segundo lugar $300",
    description: "",
    raffleId: raffleInProgress1.id,
  };
  const prizeForRaffleInProgress3 = {
    name: "Segundo lugar $200",
    description: "",
    raffleId: raffleInProgress1.id,
  };

  // Prizes for "[EN PROGRESO*] Devtalles Hackathon"
  const prizeForRaffleInProgress2_1 = {
    name: "1. Membresia Devtalles PRO anualidad",
    description:
      "Praesent et luctus sapien. Morbi lorem mi, hendrerit vel magna quis, ultricies facilisis ante. Cras pellentesque quam nec justo fringilla tincidunt. Vestibulum iaculis mauris ut aliquam ullamcorper. Pellentesque non tellus interdum, imperdiet ligula vel, scelerisque neque. Etiam id volutpat lacus, ac suscipit massa. Curabitur massa urna, fermentum sed congue congue, dignissim vulputate metus. Nunc volutpat, massa ac aliquam cursus, lacus nulla luctus dui, volutpat ullamcorper ante metus ultricies mauris. Donec a urna ut tortor condimentum suscipit vitae vitae urna. Nulla hendrerit, massa nec accumsan aliquet, turpis justo luctus arcu, et imperdiet sapien nulla in est. Curabitur dui neque, pharetra et iaculis sit amet, scelerisque vitae risus. Morbi tincidunt at lectus eget rhoncus. Cras eu placerat mauris. Duis elementum vulputate libero ut aliquet. Ut viverra metus in leo bibendum, in dictum neque iaculis.",
    raffleId: raffleInProgress2.id,
  };

  const prizeForRaffleInProgress2_2 = {
    name: "2. Membresia Devtalles PRO mensualidad",
    // description: "",
    raffleId: raffleInProgress2.id,
  };

  const prizeForRaffleInProgress2_3 = {
    name: "2. Cualquier curso de devtalles",
    description:
      "Cras egestas tellus id dolor euismod suscipit. Sed nec velit a dui maximus pharetra. Mauris sed maximus nunc, quis tincidunt risus. Nam in ante neque. Nam mollis magna pretium maximus vehicula. Quisque egestas faucibus scelerisque. Proin nibh tortor, tristique sit amet est euismod, rhoncus mollis ex. Nullam tristique ante tellus, nec tincidunt nulla lobortis eu. Sed tempor tellus quis sem interdum, id maximus ligula placerat. Quisque a dui vitae leo posuere vestibulum sed aliquet enim. Nulla dolor ligula, auctor sollicitudin felis dictum, ultricies volutpat sapien. Duis aliquet luctus venenatis. Praesent auctor elit sit amet eros hendrerit, nec hendrerit leo malesuada. Morbi sem ligula, malesuada in eros in, scelerisque lacinia ligula. Fusce ultricies neque nisi, vitae bibendum nunc mattis at.",
    raffleId: raffleInProgress2.id,
  };

  // Prizes for "[FINALIZADO]Amigos Secreto PRO"
  const prizeForRaffleFinishedDefinition = {
    name: "GiftCard de Amazon $100",
    description: "",
    raffleId: raffleFinished.id,
  };

  await prisma.prize.createMany({
    data: [
      prizeForRaffleInProgress1,
      prizeForRaffleInProgress2,
      prizeForRaffleInProgress3,

      prizeForRaffleInProgress2_1,
      prizeForRaffleInProgress2_2,
      prizeForRaffleInProgress2_3,

      prizeForRaffleFinishedDefinition,
    ],
  });

  const prizeForRaffleFinished = await prisma.prize.findFirstOrThrow({
    where: {
      name: "GiftCard de Amazon $100",
    },
  });

  // ---> insert subscriptions
  const subscriptionForRaffleFinished1 = {
    userId: studentGustavo.id,
    raffleId: raffleFinished.id,
  };
  const subscriptionForRaffleFinished2 = {
    userId: studentJohana.id,
    raffleId: raffleFinished.id,
  };
  const subscriptionForRaffleFinished3 = {
    userId: studentKevin.id,
    raffleId: raffleFinished.id,
  };
  const subscriptionForRaffleFinished4 = {
    userId: studentLuis.id,
    raffleId: raffleFinished.id,
  };

  const subscriptionForRaffleInProgress1_1 = {
    userId: studentGustavo.id,
    raffleId: raffleInProgress1.id,
  };
  const subscriptionForRaffleInProgress1_2 = {
    userId: studentJohana.id,
    raffleId: raffleInProgress1.id,
  };
  const subscriptionForRaffleInProgress1_3 = {
    userId: studentKevin.id,
    raffleId: raffleInProgress1.id,
  };

  const subscriptionForRaffleInProgress2_1 = {
    userId: studentGustavo.id,
    raffleId: raffleInProgress2.id,
  };
  const subscriptionForRaffleInProgress2_2 = {
    userId: studentJohana.id,
    raffleId: raffleInProgress2.id,
  };
  const subscriptionForRaffleInProgress2_3 = {
    userId: studentKevin.id,
    raffleId: raffleInProgress2.id,
  };

  await prisma.subscription.createMany({
    data: [
      subscriptionForRaffleFinished1,
      subscriptionForRaffleFinished2,
      subscriptionForRaffleFinished3,
      subscriptionForRaffleFinished4,
      subscriptionForRaffleInProgress1_1,
      subscriptionForRaffleInProgress1_2,
      subscriptionForRaffleInProgress1_3,
      subscriptionForRaffleInProgress2_1,
      subscriptionForRaffleInProgress2_2,
      subscriptionForRaffleInProgress2_3,
    ],
  });

  const subscriptionWinnerForFinishedRaffle =
    await prisma.subscription.findFirstOrThrow({
      where: {
        userId: studentJohana.id,
        raffleId: raffleFinished.id,
      },
    });

  // Winners
  await prisma.subscription.update({
    where: {
      id: subscriptionWinnerForFinishedRaffle.id,
    },
    data: {
      prizeId: prizeForRaffleFinished.id,
    },
  });
  await prisma.prize.update({
    where: {
      id: prizeForRaffleFinished.id,
    },
    data: {
      winnerId: subscriptionWinnerForFinishedRaffle.id,
    },
  });

  console.log("Seed executed correctly!");
}

(() => {
  main();
})();
