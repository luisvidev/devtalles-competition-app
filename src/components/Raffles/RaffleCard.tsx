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

  const isFinished = dayjs().isSame(endAt) || dayjs().isAfter(endAt);
  const isAboutToEnd = !isFinished && dayjs(endAt).diff(dayjs(), "days") < 1;
  const isInProgress = !isFinished && !isAboutToEnd;

  return (
    <Link key={raffle.id} className="flex flex-col" href={redirectTo}>
      <div className=" flex flex-col justify-between flex-grow bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
        <div>
          <Image
            className="rounded-t-lg h-40 bg-cover bg-center"
            width={400}
            height={400}
            src={raffle.imageUrl || "/default_banner.png"}
            alt="Raffle picture"
          />
          <div className="px-4 pt-4 grid grid-rows-2 justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {name}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="place-content-end">
            <div className="px-4 pb-4">
              <div className="flex gap-x-4 mb-2">
                <h4>Finaliza:</h4>
                <p className="text-gray-600 text-sm">
                  {dayjs(endAt).format("YYYY/MM/DD HH:mm:ss")}
                </p>
              </div>
              <div className="flex gap-4">
                {isFinished && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    Terminado
                  </span>
                )}
                {isAboutToEnd && (
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                    A punto de terminar
                  </span>
                )}
                {isInProgress && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    En progreso
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
