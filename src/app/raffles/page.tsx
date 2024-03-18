import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getRaffles } from "@/actions/raffles/getRaffles";
import { RaffleCard } from "@/components/raffles/RaffleCard";

export default async function RafflePage() {
  const response = await getRaffles({ page: 1, take: 12 });
  const { raffles, currentPage, totalPages } = response;

  return (
    <section className="h-dvh p-4">
      <h1 className="text-3xl font-bold mb-6">Sorteos</h1>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {raffles.map((raffle) => (
          <RaffleCard
            key={raffle.id}
            raffle={raffle}
            redirectTo={`/raffles/${raffle.id}`}
          />
        ))}
      </ul>
    </section>
  );
}
