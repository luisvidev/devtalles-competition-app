"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma";
import { Guild } from "@/types/Guild.type";
import { getServerSession } from "next-auth";

interface RaffleOptions {
  raffleId: string;
}

const guildId = "1130900724499365958"; // Server ID of DevTaLLes
const discordMyGuildsURL = "https://discord.com/api/users/@me/guilds";

export const participateInARaffle = async ({ raffleId }: RaffleOptions) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) throw new Error("El usuario no ha iniciado sesión.");

    const user = session.user;
    if (user.role === "admin")
      throw new Error("Un administrador no puede participar en un sorteo.");

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        raffleId: raffleId,
      },
    });
    if (subscription)
      throw new Error("El usuario ya esta participando en el sorteo.");

    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId },
    });
    if (!raffle) throw new Error("El sorteo no existe.");

    if (dayjs().isSame(raffle.endAt) || dayjs().isAfter(raffle.endAt))
      throw new Error("El sorteo ya ha finalizado");

    // Verify the user is joined in DevTaLLes server
    const accessToken = session?.user.accessToken;
    const response = await fetch(discordMyGuildsURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error(`Error con la conexión a Discord.`);

    const guilds = await response.json();
    const isMember = guilds.some((guild: Guild) => guild.id === guildId);

    if (!isMember)
      throw new Error(
        "El usuario no es miembro del servidor de DevTaLLes. Para participar en el sorteo, el usuario debe pertenecer a ese servidor."
      );

    const newSubscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        raffleId,
      },
    });

    return { ok: true, subscription: newSubscription };
  } catch (error) {
    console.log({ name: "Action Server Error: participateInARaffle", error });
    return {
      ok: false,
      errorMessage: (error as Error).message,
    };
  }
};
