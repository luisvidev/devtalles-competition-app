"use server";

import prisma from "@/lib/prisma";

interface RaffleOptions {
  raffleId: string;
}

export const getSubscribers = async ({ raffleId }: RaffleOptions) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        raffleId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const totalCount = await prisma.subscription.count({
      where: {
        raffleId,
      },
    });

    const subscribers = subscriptions.map((item) => ({
      email: item.user.email,
      subscriptionDate: item.createdAt,
    }));

    return {
      ok: true,
      subscribers,
      totalCount,
    };
  } catch (error) {
    console.log({ name: "Action Server Error: getSubscribers", error });
    return {
      ok: false,
      errorMessage: (error as Error).message,
    };
  }
};
