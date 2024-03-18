import { StateCreator } from "zustand";

export interface DetailsSlice {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  termsAndConditions: string;
  imageUrl?: string;
  authorId: string;

  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setStartDate: (endDate: Date | undefined) => void;
  setEndDate: (endDate: Date | undefined) => void;
  setTermsAndConditions: (termsAndConditions: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setAuthorId: (authorId: string) => void;
}

export const createDetailsSlice: StateCreator<DetailsSlice> = (set) => ({
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  termsAndConditions: "",
  imageUrl: "",
  authorId: "",

  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setStartDate: (startDate: Date | undefined) => set({ startDate }),
  setEndDate: (endDate: Date | undefined) => set({ endDate }),
  setTermsAndConditions: (termsAndConditions: string) =>
    set({ termsAndConditions }),
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
  setAuthorId: (authorId: string) => set({ authorId }),
});
