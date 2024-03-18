import React from "react";
import { getRaffles } from "@/actions/raffles/getRaffles";
import { RaffleList } from "@/components/raffles/RaffleList";
import type { Metadata } from "next";
import { RaffleCard } from "@/components/raffles/RaffleCard";

export const metadata: Metadata = {
  title: "Sorteos",
  description:
    "La página de sorteos es un destino emocionante para aquellos que buscan participar en eventos promocionales y tener la oportunidad de ganar premios increíbles. Esta plataforma ofrece una variedad de sorteos,Los usuarios pueden explorar una amplia gama de sorteos disponibles, cada uno con su propio conjunto de premios y requisitos de participación.",
  keywords: ["Sorteos", "informacion", "Premios", "participar"],
};

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
