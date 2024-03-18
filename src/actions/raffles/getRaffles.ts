"use server";

import prisma from "@/lib/prisma";

interface RaffleOptions {
  page?: number;
  take?: number;
  // TODO: filter types
}

export const getRaffles = async ({ page = 1, take = 12 }: RaffleOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const raffles = await prisma.raffle.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        endAt: "desc",
      },
      // include: {
      //   ProductImage: {
      //     take: 2,
      //     select: {
      //       url: true,
      //     },
      //   },
      // },
    });

    const totalCount = await prisma.raffle.count({});

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      raffles,
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos"); // TODO:
  }
};
