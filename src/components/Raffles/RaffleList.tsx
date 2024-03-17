import React from "react";
import { getRaffles } from "@/actions/raffles/getRaffles";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import "../../styles/RaffleCard.css";
import { Raffle } from "@/types";
import dayjs from "@/lib/dayjs";

interface Props {
  raffles: Raffle[]
}

export const RaffleList = ({ raffles }: Props) => {

  const showCountdown = dayjs().isBefore(dayjs());

  return (
    <ul className="containerCard  my-10">
      {raffles.map((raffle) => (
        <Link
          key={raffle.id}
          className="bodyCard"
          href={`/backoffice/raffles/${raffle.id}`}
        >
          <Card className="cardTest max-w-sm bg-white" key={raffle.id}>
            <CardHeader className="p-0">
              <div className="flex justify-center borderRadius-md">
                <Image
                  className="object-cover w-full h-52"
                  src={`${raffle?.imageUrl}`}
                  width={350}
                  height={350}
                  alt="imagen sorteo"
                />
              </div>
            </CardHeader>
            <CardContent className="card-description object-cover w-full h-37 bg-gray-200">
              <div className="flex flex-col justify-center text-xl font-bold text-black">
                <h1 className="text-center">{raffle.name}</h1>
                <p className="font-normal text-sm justify-start pt-3 pb-2">
                  <span className="font-bold">Zona Horaria:</span>{" "}
                  {raffle.timezone}
                </p>
                <p className="text-sm g-3 p-1 shadow-sm rounded-md text-orange-400"><span className="text-black">Fin Sorteo: </span>{dayjs(raffle.endAt).format('DD-MM-YY HH:mm')}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </ul>
  );
};
