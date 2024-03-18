"use client";

import { Prize, Raffle } from "@/types";
import dayjs from "@/lib/dayjs";
import React from "react";
import { Prizes } from "@/app/backoffice/raffles/[id]/ui/Prizes";
import { RaffleCountDown } from "@/app/backoffice/raffles/[id]/ui/RaffleCountDown";
import { participateInARaffle } from "@/actions/raffles/participateInARaffle";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  raffle: Raffle;
  prizes: Prize[];
  authorEmail: string;
  totalParticipants: number;
  participationResponse:
    | {
        ok: boolean;
        subscription: {
          id: string;
          userId: string;
          raffleId: string;
          prizeId: string | null;
          createdAt: Date;
        } | null;
        errorMessage?: undefined;
      }
    | {
        ok: boolean;
        errorMessage: string;
        subscription?: undefined;
      };
}

export const RaffleDetail = ({
  raffle,
  prizes,
  totalParticipants,
  authorEmail,
  participationResponse,
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

  const isPossibleToParticipate = dayjs().isBefore(dayjs(endAt));
  const { subscription } = participationResponse;

  const { data: session, status } = useSession();

  const handleParticipate = async () => {
    try {
      const response = await participateInARaffle({ raffleId });
      if (!response.ok) throw new Error(response.errorMessage);
      alert("Success");
    } catch (error) {
      console.error({ error });
      alert(`error: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="my-6 flex items-center justify-center w-100 h-80 bg-cover bg-center rounded-lg"
      ></div>

      <div className="py-10">
        <h1 className="text-5xl font-extrabold dark:text-white">{name}</h1>
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
              Total participantes:
            </h4>
            <p className="text-gray-600">{totalParticipants}</p>
          </div>
        </div>
      </div>

      {isPossibleToParticipate && (
        <div className="py-10">
          <RaffleCountDown endAt={endAt} />
        </div>
      )}

      {isPossibleToParticipate &&
        session?.user.role !== "admin" &&
        !subscription && (
          <button
            onClick={handleParticipate}
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Participar
          </button>
        )}

      {isPossibleToParticipate &&
        session?.user.role !== "admin" &&
        subscription && (
          <p className="text-gray-600">
            Te inscribiste a este sorteo el{" "}
            {dayjs(subscription.createdAt).format("YYYY/MM/DD HH:mm:ss")}! 🎊
          </p>
        )}

      <div className="py-10">
        <h2 className="text-4xl font-bold dark:text-white mb-3">Premio/s</h2>
        <Prizes prizes={prizes} />
      </div>
    </div>
  );
};
