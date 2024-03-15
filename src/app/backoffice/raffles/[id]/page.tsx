import { getRaffleById } from "@/actions/raffles/getRaffleById";
import { redirect } from "next/navigation";
import React from "react";
import { GoBackButton } from "../ui/GoBackButton";
import dayjs from "dayjs";
import { removeRaffleById } from "@/actions/raffles/removeRaffleById";
import { DeleteRaffleButton } from "../ui/deleteRaffleButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function RaffleDetailPage({ params }: Props) {
  const { id: raffleId } = params;

  const { raffle, totalParticipants } = await getRaffleById(raffleId);

  if (!raffle) {
    redirect("/backoffice/raffles");
  }

  const {
    name,
    description,
    termsAndConditions,
    imageUrl,
    startAt,
    endAt,
    timezone,
  } = raffle;

  return (
    <section className="contaner-pege-description p-10">
      <GoBackButton />
      <div
        className="my-6 flex items-center justify-center w-100 h-80 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        THIS IS THE BANNER
      </div>

      <div className="flex justify-between pt-8">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex gap-x-4">
          <button
            type="button"
            className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Editar
          </button>
          <DeleteRaffleButton raffleId={raffleId} />
        </div>
      </div>
      <div className="py-4">
        <label>Descripción</label>
        <p>{description}</p>
      </div>
      <div className="py-4">
        <label>Terminos y condiciones</label>
        <p>{termsAndConditions}</p>
      </div>

      <div className="py-4 flex justify-between">
        <div>
          <label>Comienza en la fecha:</label>
          <p>{dayjs(startAt).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
        <div>
          <label>Finaliza en la fecha:</label>
          <p>{dayjs(endAt).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
        <div>
          <label>Zona horaria:</label>
          <p>{timezone}</p>
        </div>
      </div>

      <div className="py-4">
        <label>Total participantes:</label>
        <p>{totalParticipants}</p>
      </div>
    </section>
  );
}
