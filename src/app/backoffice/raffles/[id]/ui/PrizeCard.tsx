import { chooseWinner } from "@/actions/raffles/chooseWinner";
import { Prize } from "@/types";
import { useState } from "react";

interface Props {
  prize: Prize;
}

export const PrizeCard = ({ prize }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleChooseWinner = async () => {
    setErrorMessage(null);
    try {
      await chooseWinner(prize.id);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <li className="max-w-sm items-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="py-4">
        <label className="text-primary text-xl font-bold">Premio</label>
        <p className="text-gray-900 text-lg">{prize.name}</p>
      </div>
      {prize.description && (
        <div className="py-4">
          <label className="text-primary text-xl font-bold">Desripción del premio</label>
          <p className="text-gray-900 text-lg">{prize.description}</p>
        </div>
      )}
      {!prize.winnerId && (
        <div>
          <button
            onClick={handleChooseWinner}
            className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Escoger ganador
          </button>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        </div>
      )}

      {prize.winnerEmail && <div className="text-primary text-xl font-bold">El ganador es: {prize.winnerEmail}</div>}
    </li>
  );
};
