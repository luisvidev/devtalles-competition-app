import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import "../../styles/RaffleCard.css";
import { Raffle } from "@/types";

interface Props {
  raffles: Raffle[];
}

export const RaffleList = ({ raffles }: Props) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
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
                  // className="card-img"
                  src={`${raffle?.imageUrl}`}
                  width={350}
                  height={350}
                  alt="imagen sorteo"
                />
              </div>
            </CardHeader>
            <CardContent className="card-description">
              <div className="flex flex-col justify-center px-5 text-xl font-bold text-black">
                <h1>{raffle.name}</h1>
                <p className="font-normal text-sm justify-start pt-3">
                  <span className="font-bold">Zona Horaria:</span>{" "}
                  {raffle.timezone}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </ul>
  );
};
