"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { z } from "zod";

interface Props {
  raffle: {
    name: string;
    description: string;
    termsAndConditions: string;
    imageUrl?: string;
    timezone: string;
    endAt: Date;
  };
  prizes: {
    name: string;
    description?: string;
  }[];
}

const prizeSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(400).optional(),
});

const raffleSchema = {
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(400),
  termsAndConditions: z.string().min(3).max(400),
  imageUrl: z.string().optional(),
  timezone: z.string(),
  endAt: z.date(),
};

const addRaffleSchema = z.object({
  raffle: z.object(raffleSchema),
  prizes: z.array(prizeSchema),
});

export async function addRaffle(props: Props) {
  const dataParsed = addRaffleSchema.safeParse(props);

  const session = await auth();
  if (session?.user.role !== "admin")
    throw new Error("La acción solo es permitida por un administrador");

  try {
    if (!dataParsed.success) {
      throw new Error(`Error al validar la data: ${dataParsed.error}`);
    }

    const { raffle, prizes } = dataParsed.data;

    const newRaffle = await prisma.raffle.create({
      data: {
        name: raffle.name,
        description: raffle.description,
        termsAndConditions: raffle.termsAndConditions,
        imageUrl: raffle.imageUrl,
        timezone: raffle.timezone,
        endAt: raffle.endAt,
        authorId: session.user.id,
      },
    });

    const newPrizes = prizes.map((prize) => ({
      ...prize,
      raffleId: newRaffle.id,
    }));

    await prisma.prize.createMany({
      data: newPrizes,
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}