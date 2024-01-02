import { create } from "zustand";

interface ModalOpen {
  open: boolean;

  setOpen: (state: boolean) => void;
}

const useModalStore = create<ModalOpen>((set) => ({
  open: false,

  setOpen: (state) => set({ open: state })
}));

export default useModalStore;
