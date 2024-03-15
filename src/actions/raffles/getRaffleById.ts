"use server";

import prisma from "@/lib/prisma";

export async function getRaffleById(raffleId: string) {
  try {
    const raffle = await prisma.raffle.findFirst({
      include: {
        author: {
          select: {
            email: true,
          },
        },
        prizes: true,
      },
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
      prizes: raffle.prizes,
      authorEmail: raffle.author.email,
      totalParticipants,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
}
