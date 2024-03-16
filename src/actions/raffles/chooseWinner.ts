"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import dayjs from "@/lib/dayjs";

export async function chooseWinner(prizeId: string) {
  try {
    const prize = await prisma.prize.findFirst({
      where: {
        id: prizeId,
      },
      include: {
        raffle: {
          include: {
            subscribers: true,
          },
        },
      },
    });

    if (!prize) throw new Error(`El premio con id ${prizeId} no existe.`);

    const { raffle } = prize;
    const { endAt } = raffle;
    if (dayjs().isBefore(endAt))
      throw new Error(
        `El sorteo no ha finalizado: fecha actual: ${new Date().toString()}, fecha de finalización del sorteo: ${endAt.toString()}`
      );

    const subscribers = prize.raffle.subscribers;

    if (subscribers.length === 0)
      throw new Error("No hay ningún participante.");

    const subscribersWithoutPrize = subscribers.filter((s) => !s.prizeId);

    // Generate a random index within the range of the array's length
    const randomIndex = Math.floor(
      Math.random() * subscribersWithoutPrize.length
    );

    // Select the winner
    let winner = subscribersWithoutPrize[randomIndex];

    console.log({ subscribers, subscribersWithoutPrize, randomIndex, winner });

    // Update models
    await prisma.subscription.update({
      where: {
        id: winner.id,
      },
      data: {
        prizeId,
      },
    });
    await prisma.prize.update({
      where: {
        id: prizeId,
      },
      data: {
        winnerId: winner.id,
      },
    });

    revalidatePath(`/backoffice/raffles/${raffle.id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
