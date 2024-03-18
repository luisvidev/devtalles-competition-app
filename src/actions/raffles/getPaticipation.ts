"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getParticipation = async (raffleId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) throw new Error("El usuario no ha iniciado sesión.");

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        raffleId: raffleId,
      },
    });

    return {
      ok: true,
      subscription,
    };
  } catch (error) {
    console.log({ name: "Action Server Error: getPaticipation", error });
    return {
      ok: false,
      errorMessage: (error as Error).message,
    };
  }
};
