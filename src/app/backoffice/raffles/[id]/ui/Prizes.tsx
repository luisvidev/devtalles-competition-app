import { Prize } from "@/types";
import { PrizeCard } from "./PrizeCard";

interface Props {
  prizes: Prize[];
}

export const Prizes = ({ prizes }: Props) => {
  return (
    <ul className="flex gap-3 max-w-3xl">
      {prizes.map((prize) => (
        <PrizeCard key={prize.id} prize={prize} />
      ))}
    </ul>
  );
};
