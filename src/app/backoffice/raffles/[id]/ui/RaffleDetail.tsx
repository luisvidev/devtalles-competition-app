"use client";

import { Prize, Raffle } from "@/types";
import dayjs from "@/lib/dayjs";
import React from "react";
import { DeleteRaffleButton } from "./DeleteRaffleButton";
import Countdown from "react-countdown";
import { Prizes } from "./Prizes";
import { RaffleCountDown } from "./RaffleCountDown";
import Link from "next/link";

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

  return (
    <div>
      <div
        className="my-6 flex items-center justify-center w-100 h-80 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="flex justify-between pt-8 py-10">
        <h1 className="text-5xl font-extrabold dark:text-white">{name}</h1>
        <div className="flex items-start gap-x-4">
          <button
            type="button"
            className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Editar
          </button>
          <DeleteRaffleButton raffleId={raffleId} />
        </div>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">Descripción</h2>
        <p className="text-gray-600 text-justify">{description}</p>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">
          Terminos y condiciones
        </h2>
        <p className="text-gray-600 text-justify">{termsAndConditions}</p>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">
          Información general
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
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
              Total participantes: {totalParticipants}
            </h4>
            <Link
              href={`/backoffice/raffles/${raffleId}/participants`}
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Ver todos los participantes
              <svg
                className="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {showCountdown && (
        <div className="py-10">
          <RaffleCountDown endAt={endAt} />
        </div>
      )}

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">Premio/s</h2>
        <Prizes prizes={prizes} />
      </div>
    </div>
  );
};
