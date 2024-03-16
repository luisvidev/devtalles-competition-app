import { Prize } from "@/types";
import { PrizeCard } from "./PrizeCard";

interface Props {
  prizes: Prize[];
}

export const Prizes = ({ prizes }: Props) => {
  return (
    <ul>
      {prizes.map((prize) => (
        <PrizeCard key={prize.id} prize={prize} />
      ))}
    </ul>
  );
};
