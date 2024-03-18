"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

  const session = await getServerSession(authOptions);
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

    return {
      ok: true,
    };
  } catch (error) {
    console.log({ name: "Action Server Error: addRaffle", error });
    return {
      ok: false,
      errorMessage: (error as Error).message,
    };
  }
}
