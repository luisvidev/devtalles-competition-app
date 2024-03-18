import { getRaffleById } from "@/actions/raffles/getRaffleById";
import { redirect } from "next/navigation";
import React from "react";
import { RaffleDetail } from "./ui/RaffleDetail";
import { GoBackButton } from "@/components/layout/common/GoBackButton";

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
    <section className="contaner-pege-description p-10">
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
