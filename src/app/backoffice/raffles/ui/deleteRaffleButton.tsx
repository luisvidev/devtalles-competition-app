"use client";

import { removeRaffleById } from "@/actions/raffles/removeRaffleById";

export const DeleteRaffleButton = ({ raffleId }: { raffleId: string }) => {
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-secondary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={() => removeRaffleById(raffleId)}
    >
      Eliminar
    </button>
  );
};
