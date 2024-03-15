"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRaffleById(raffleId: string) {
  try {
    const deletedRaffle = await prisma.raffle.delete({
      where: {
        id: raffleId,
      },
    });

    revalidatePath(`/backoffice/raffles`);
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo eliminar el sorteo");
  }
}
