import React from "react";
import { getRaffles } from "@/actions/raffles/getRaffles";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Propsraffles {
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

export const CardsSorteos = ({ raffles }: any) => {
  return (
    <div className="flex justify-center gap-5 my-10">
      {raffles?.map((raffle: any) => (
        <Link
          className="flex justify-center"
          href={`/backoffice/raffles/${raffle.id}`}
        >
          <Card className="max-w-sm p-3" key={raffle.id}>
            <CardHeader>
              <div className="flex justify-center px-5 text-primary">
                <h1>{raffle.name}</h1>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Image
                  src={`${raffle?.imageUrl}`}
                  width={250}
                  height={250}
                  alt="imagen sorteo"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
