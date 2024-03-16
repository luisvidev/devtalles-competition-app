import React from "react";
import LogoutButton from "./ui/LogoutButton";
import { getRaffles } from "@/actions/raffles/getRaffles";
import { RaffleList } from "@/components/Raffles/RaffleList";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function RafflesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const response = await getRaffles({ page });
  const { raffles, currentPage, totalPages } = response;

  return (
    <div className="container p-10">
      <h2>Sorteos - Devtalles</h2>
      <RaffleList raffles={raffles} />
      <LogoutButton />
    </div>
  );
}
