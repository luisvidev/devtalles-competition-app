"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { z } from "zod";

interface Props {
  raffle: {
    id: string;
    name?: string;
    description?: string;
    termsAndConditions?: string;
    imageUrl?: string;
    timezone?: string;
    endAt?: Date;
  };
  prizes: {
    id: string;
    name?: string;
    description?: string;
  }[];
}

const prizeSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(100).optional(),
  description: z.string().max(400).optional(),
});

const raffleSchema = {
  id: z.string(),
  name: z.string().min(3).max(100).optional().optional(),
  description: z.string().min(3).max(400).optional(),
  termsAndConditions: z.string().min(3).max(400).optional(),
  imageUrl: z.string().optional(),
  timezone: z.string().optional(),
  endAt: z.date().optional(),
};

const addRaffleSchema = z.object({
  raffle: z.object(raffleSchema),
  prizes: z.array(prizeSchema).optional(),
});

export async function updateRaffle(props: Props) {
  const dataParsed = addRaffleSchema.safeParse(props);

  const session = await auth();
  if (session?.user.role !== "admin")
    throw new Error("La acción solo es permitida por un administrador");

  try {
    if (!dataParsed.success) {
      throw new Error(`Error al validar la data: ${dataParsed.error}`);
    }

    const { raffle, prizes } = dataParsed.data;

    const updatedRaffle = await prisma.raffle.update({
      where: {
        id: raffle.id,
      },
      data: {
        ...(raffle.name && { name: raffle.name }),
        ...(raffle.description && { description: raffle.description }),
        ...(raffle.termsAndConditions && {
          termsAndConditions: raffle.termsAndConditions,
        }),
        ...(raffle.imageUrl && { imageUrl: raffle.imageUrl }),
        ...(raffle.timezone && { timezone: raffle.timezone }),
        ...(raffle.endAt && { endAt: raffle.endAt }),
      },
    });

    if (!prizes || prizes.length === 0)
      return { updatedRaffle, updatedPrizes: [] };

    await prisma.prize.updateMany({
      data: prizes,
    });

    const updatedPrizes = await prisma.prize.findMany({
      where: {
        raffleId: raffle.id,
      },
    });

    return { updatedRaffle, updatedPrizes };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
