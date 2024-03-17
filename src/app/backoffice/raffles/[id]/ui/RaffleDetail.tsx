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
        THIS IS THE BANNER
      </div>

      <div className="flex justify-between pt-8">
        <h1 className="text-5xl font-extrabold dark:text-white">{name}</h1>
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

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">Descripción</h2>
        <p className="text-gray-600">{description}</p>d
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">
          Terminos y condiciones
        </h2>
        <p className="text-gray-600">{termsAndConditions}</p>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">
          Información general
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 py-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h4 className="text-lg font-semibold dark:text-white mb-3">
              Fecha de finalización en hora local:
            </h4>
            <p className="text-gray-600">
              {dayjs(endAt).format("YYYY/MM/DD HH:mm:ss")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h4 className="text-lg font-semibold dark:text-white mb-3">
              Finaliza en la fecha:
            </h4>
            <p className="text-gray-600">
              {dayjs(endAt).tz(timezone).format("YYYY/MM/DD HH:mm:ss")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h4 className="text-lg font-semibold dark:text-white mb-3">
              Zona horaria:
            </h4>
            <p className="text-gray-600">{timezone}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h4 className="text-lg font-semibold dark:text-white mb-3">
              Fecha de creación del sorteo:
            </h4>
            <p className="text-gray-600">
              {dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h4 className="text-lg font-semibold dark:text-white mb-3">
              Creado por:
            </h4>
            <p className="text-gray-600">{authorEmail}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h4 className="text-lg font-semibold dark:text-white mb-3">
              Total participantes:
            </h4>
            <p className="text-gray-600">{totalParticipants}</p>
          </div>
        </div>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">Premio/s</h2>
        <Prizes prizes={prizes} />
      </div>
    </div>
  );
};
