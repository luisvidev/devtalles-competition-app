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

  return (
    <>
    <RaffleList raffles={raffles} />
    </>

  );
}
