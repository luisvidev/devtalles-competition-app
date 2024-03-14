"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function removeRaffleById(raffleId: string) {
  try {
    const deletedRaffle = await prisma.raffle.delete({
      where: {
        id: raffleId,
      },
    });

    console.log({ deletedRaffle });
    // redirect("/backoffice/raffles");
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo eliminar el sorteo");
  }
}
