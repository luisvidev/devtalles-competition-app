"use client";

import { Prize, Raffle } from "@/types";
import dayjs from "@/lib/dayjs";
import React from "react";
import { DeleteRaffleButton } from "./DeleteRaffleButton";
import Countdown from "react-countdown";
import { Prizes } from "./Prizes";

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
    endAt,
    timezone,
    createdAt,
  } = raffle;

  const showCountdown = dayjs().isBefore(dayjs(endAt));

  // Renderer callback with condition
  const rendererInCountDown = (props: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
    formatted: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  }) => {
    const { formatted, days, completed } = props;
    if (completed) {
      return <span>You are good to go!</span>;
    } else {
      // TODO: this can be a component
      return (
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>{formatted.days}</div>
            <div>días</div>
          </div>
          <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>{formatted.hours}</div>
            <div>Horas</div>
          </div>
          <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>{formatted.minutes}</div>
            <div>Minutos</div>
          </div>
          <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>{formatted.seconds}</div>
            <div>Segundos</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div
        className="my-6 flex items-center justify-center w-100 h-80 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* THIS IS THE BANNER */}
      </div>

      <div className="flex justify-between pt-8">
        <h1 className="text-3xl font-bold">{name}</h1>
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

      {showCountdown && (
        <div>
          <h2>Tiempo restante para para que finalice el sorteo:</h2>
          <Countdown date={endAt} renderer={rendererInCountDown} />
        </div>
      )}

      <div className="py-4">
        <label className="block text-gray-700 text-2xl font-bold mb-2">Descripcion</label>
        <p className="text-gray-900 text-lg">{description}</p>
      </div>
      <div className="py-4">
        <label className="block text-gray-700 text-2xl font-bold mb-2">Terminos y condiciones</label>
        <p className="text-gray-900 text-lg">{termsAndConditions}</p>
      </div>

      <div className="py-4 flex justify-between">
        <div className="rounded-xl bg-gray-300 rounded-tl rounded-br border border-solid p-7">
          <label className="text-primary text-xl font-bold">Fecha de finalización en hora local:</label>
          <p className="text-gray-900 text-lg">{dayjs(endAt).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
        <div className="rounded-xl bg-gray-300 rounded-tl rounded-br border border-solid p-7">
          <label className="text-primary text-xl font-bold">Finaliza en la fecha:</label>
          <p className="text-gray-900 text-lg">{dayjs(endAt).tz(timezone).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
        <div className="rounded-xl bg-gray-300 rounded-tl rounded-br border border-solid p-7">
          <label className="text-primary text-xl font-bold">Zona horaria:</label>
          <p className="text-gray-900 text-lg">{timezone}</p>
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
      <Prizes prizes={prizes} />
    </div>
  );
};
