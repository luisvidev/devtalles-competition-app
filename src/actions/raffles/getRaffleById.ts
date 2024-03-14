"use server";

import prisma from "@/lib/prisma";

export async function getRaffleById(raffleId: string) {
  try {
    const raffle = await prisma.raffle.findFirst({
      // include: {
      //   ProductImage: true,
      // },
      where: {
        id: raffleId,
      },
    });

    if (!raffle) return { raffle: null, totalParticipants: 0 };

    const totalParticipants = await prisma.subscription.count({
      where: {
        raffleId,
      },
    });

    return {
      raffle,
      totalParticipants,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
}
