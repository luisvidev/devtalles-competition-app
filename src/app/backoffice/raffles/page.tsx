import React from "react";
import LogoutButton from "./ui/LogoutButton";
import { getRaffles } from "@/actions/raffles/getRaffles";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CardsSorteos } from "@/components/cardsSorteos/CardsSorteos";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function RafflesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const response = await getRaffles({ page });
  const { raffles, currentPage, totalPages } = response;

  console.log("Rafles:", raffles);

  return (
    <div className="p-10">
      <h2>Sorteos - Devtalles</h2>
      <CardsSorteos raffles={raffles}/>
      <LogoutButton />
    </div>
  );
}
