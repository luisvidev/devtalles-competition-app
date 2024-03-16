import { getRaffleById } from "@/actions/raffles/getRaffleById";
import { redirect } from "next/navigation";
import React from "react";
import { GoBackButton } from "../ui/GoBackButton";
import { RaffleDetail } from "./ui/RaffleDetail";

interface Props {
  params: {
    id: string;
  };
}

export default async function RaffleDetailPage({ params }: Props) {
  const { id: raffleId } = params;

  const { raffle, totalParticipants, authorEmail, prizes } =
    await getRaffleById(raffleId);

  if (!raffle) {
    redirect("/backoffice/raffles");
  }

  return (
    <section className="p-10">
      <GoBackButton />
      <RaffleDetail
        raffle={raffle}
        totalParticipants={totalParticipants}
        authorEmail={authorEmail}
        prizes={prizes}
      />
    </section>
  );
}
