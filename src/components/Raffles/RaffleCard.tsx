import dayjs from "@/lib/dayjs";
import { Raffle } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  raffle: Raffle;
  redirectTo: string;
}

export const RaffleCard = ({ raffle, redirectTo }: Props) => {
  const { name, description, endAt, timezone } = raffle;
  return (
    <Link key={raffle.id} className="bodyCard" href={redirectTo}>
      <div className="max-w-sm h-auto bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
        <Image
          className="rounded-t-lg h-40 bg-cover bg-center"
          width={400}
          height={400}
          src={raffle.imageUrl || "/default_banner.png"}
          alt="Raffle picture"
        />
        <div className="px-4 pt-4 grid grid-rows-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        </div>
        <div>
          <div className="px-4 pb-4">
            <div className="flex gap-x-4 mb-2">
              <h4>Finaliza:</h4>
              <p className="text-gray-600 text-sm">
                {dayjs(endAt).format("YYYY/MM/DD HH:mm:ss")}
              </p>
            </div>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
              Terminada
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
