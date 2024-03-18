import React from "react";
import { getRaffles } from "@/actions/raffles/getRaffles";
import { RaffleList } from "@/components/Raffles/RaffleList";
import { LogoutButton } from "@/components/auth";

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
      <RaffleList raffles={raffles} />
    </div>
  );
}
