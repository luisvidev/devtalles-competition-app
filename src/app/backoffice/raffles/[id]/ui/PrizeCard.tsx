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
    <li className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div className="py-4">
        <h4 className="text-lg font-semibold dark:text-white mb-1">Nombre:</h4>
        <p className="text-gray-600 text-justify">{prize.name}</p>
      </div>
      {prize.description && (
        <div className="py-4">
          <h4 className="text-lg font-semibold dark:text-white mb-1">
            Desripción:
          </h4>
          <p className="text-gray-600 text-justify">{prize.description}</p>
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

      {prize.winnerEmail && (
        <div>
          <h4 className="text-lg font-semibold dark:text-white mb-1">
            Ganador 🎉:
          </h4>
          <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white text-lg ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-300">
              {prize.winnerEmail}
            </span>
          </h1>
        </div>
      )}
    </li>
  );
};
