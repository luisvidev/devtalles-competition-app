import React from "react";
import LogoutButton from "./ui/LogoutButton";
import { getRaffles } from "@/actions/raffles/getRaffles";
import Link from "next/link";

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
    <div className="p-10">
      <h2>List of raffles</h2>
      <div className="my-10">
        {raffles.map((raffle) => (
          <div key={raffle.id}>
            <Link href={`/backoffice/raffles/${raffle.id}`}>{raffle.id}</Link>
          </div>
        ))}
      </div>
      <LogoutButton />
    </div>
  );
}
