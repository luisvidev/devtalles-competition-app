import { Prize, Raffle } from "@/types";
import dayjs from "dayjs";
import React from "react";
import { DeleteRaffleButton } from "./DeleteRaffleButton";

interface Props {
  raffle: Raffle;
  prizes: Prize[];
  authorEmail: string;
  totalParticipants: number;
}

export const RaffleDetail = ({
  raffle,
  prizes,
  totalParticipants,
  authorEmail,
}: Props) => {
  const {
    imageUrl,
    name,
    description,
    id: raffleId,
    termsAndConditions,
    startAt,
    endAt,
    timezone,
    createdAt,
  } = raffle;

  return (
    <div>
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

      <div className="py-4 flex justify-between">
        <div>
          <label>Fecha de creación del sorteo:</label>
          <p>{dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
        <div>
          <label>Creado por:</label>
          <p>{authorEmail}</p>
        </div>
        <div>
          <label>Total participantes:</label>
          <p>{totalParticipants}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold">Premio/s</h3>
      <ul>
        {prizes.map((prize) => (
          <li
            key={prize.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="py-4">
              <label>Nombre</label>
              <p>{prize.name}</p>
            </div>
            <div className="py-4">
              <label>Desripción del premio</label>
              <p>{prize.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
