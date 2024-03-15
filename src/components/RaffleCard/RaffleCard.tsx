import React from "react";
import { getRaffles } from "@/actions/raffles/getRaffles";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import '../../styles/RaffleCard.css'

interface UpperCamelCase {
    id: string;
    name: string;
    description: string;
    termsAndConditions: string;
    imageUrl: string | null;
    timezone: string;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    endAt: Date;
    userId: string;
}

export const RaffleCard = ({ raffles }: any) => {
  return (
    <div className="containerCard  my-10">
      {[...raffles, ...raffles, ...raffles, ...raffles].map((raffle: any) => (
        <Link
          className="bodyCard"
          href={`/backoffice/raffles/${raffle.id}`}
        >
          <Card className="cardTest max-w-sm bg-white" key={raffle.id}>
            <CardHeader className="p-0" >
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
                <p className="font-normal text-sm justify-start pt-3"><span className="font-bold">Zona Horaria:</span> {raffle.timezone}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
