import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getRaffles } from "@/actions/raffles/getRaffles";
import { RaffleCard } from "@/components/raffles/RaffleCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorteos disponibles",
  description:
    "La página de sorteos disponibles es un destino vibrante y emocionante para aquellos en busca de oportunidades para participar en sorteos y ganar premios emocionantes. ",
  keywords: ["Sorteos", "informacion", "Premios", "Sorteo", "Participantes"],
};

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
