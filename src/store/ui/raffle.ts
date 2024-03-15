import { create } from "zustand";

interface State {
  isEditing: boolean;
  isDeleting: boolean;
  editRaffle: (state: boolean) => void;
  deleteRaffle: (state: boolean) => void;
}

export const useUIRaffle = create<State>()((set) => ({
  isEditing: false,
  isDeleting: false,
  editRaffle: (state: boolean) => set({ isEditing: state }),
  deleteRaffle: (state: boolean) => set({ isDeleting: state }),
}));
