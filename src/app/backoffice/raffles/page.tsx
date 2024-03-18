import React from "react";
import { getRaffles } from "@/actions/raffles/getRaffles";
import { RaffleList } from "@/components/raffles/RaffleList";
import { RaffleCard } from "@/components/raffles/RaffleCard";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function RafflesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const response = await getRaffles({ page });
  const { raffles, currentPage, totalPages } = response;

  // TODO: RENDER TOTAL RAFFLES
  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white mb-3">
        Sorteos (100)
      </h1>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {raffles.map((raffle) => (
          <RaffleCard
            key={raffle.id}
            raffle={raffle}
            redirectTo={`/backoffice/raffles/${raffle.id}`}
          />
        ))}
      </ul>
    </div>
  );
}
