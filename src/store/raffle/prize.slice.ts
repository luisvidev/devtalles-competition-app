import { StateCreator } from "zustand";

export interface PrizeItem {
  id: number;
  prizeName: string;
  prizeDescription: string;
}

export interface PrizeSlice {
  prizes: PrizeItem[];

  addPrize: (name: string, description: string) => void;
  removePrize: (id: number) => void;
}

let nextId = 1;

export const createPrizeSlice: StateCreator<PrizeSlice> = (set) => ({
  prizes: [],
  addPrize: (name: string, description: string) => {
    const newPrize: PrizeItem = {
      id: nextId++,
      prizeName: name,
      prizeDescription: description,
    };
    set((prevState) => ({
      prizes: [...prevState.prizes, newPrize],
    }));
  },
  removePrize: (id: number) => {
    set((prevState) => ({
      prizes: prevState.prizes.filter((prize) => prize.id !== id),
    }));
  },
});
