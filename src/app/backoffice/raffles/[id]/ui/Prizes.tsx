import { Prize } from "@/types";
import { PrizeCard } from "./PrizeCard";

interface Props {
  prizes: Prize[];
}

export const Prizes = ({ prizes }: Props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {prizes.map((prize) => (
        <PrizeCard key={prize.id} prize={prize} />
      ))}
    </ul>
  );
};
