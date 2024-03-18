import { StateCreator } from "zustand";

export interface DateSlice {
  startDate: Date;
  endDate?: Date;

  setStartDate: (endDate: Date | undefined) => void;
  setEndDate: (endDate: Date | undefined) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  startDate: new Date(),
  endDate: new Date(),

  setStartDate: (startDate: Date | undefined) => {
    if (!startDate) return;

    if (startDate < new Date()) return;

    const endDate = get().endDate;

    if (endDate && endDate < startDate) {
      return;
    }

    set({ startDate });
  },
  setEndDate: (endDate: Date | undefined) => {
    if (!endDate) return;
    if (endDate < get().startDate) return;
    set({ endDate });
  },
});
