import { create } from "zustand";
import { DetailsSlice, createDetailsSlice } from "./details.slice";
import { DateSlice, createDateSlice } from "./date.slice";
import { PrizeSlice, createPrizeSlice } from "./prize.slice";

type ShareState = DetailsSlice & DateSlice & PrizeSlice;

export const useRaffleBoundStore = create<ShareState>()((...a) => ({
  ...createDetailsSlice(...a),
  ...createDateSlice(...a),
  ...createPrizeSlice(...a),
}));
