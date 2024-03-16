import React from "react";
import LogoutButton from "./ui/LogoutButton";
import { getRaffles } from "@/actions/raffles/getRaffles";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RaffleCard } from "@/components/RaffleCard/RaffleCard";

import dayjs from "dayjs";

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
      <RaffleCard raffles={raffles}/>
      <LogoutButton />
    </div>
  );
}
