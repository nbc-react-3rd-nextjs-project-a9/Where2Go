import { create } from "zustand";

interface ModalOpen {
  open: boolean;
  modalType: string;
  setOpen: (state: boolean) => void;
  setModalType: (state: string) => void;
}

const useModalStore = create<ModalOpen>((set) => ({
  open: false,
  modalType: "login",
  setOpen: (state) => set({ open: state }),
  setModalType: (state) => set({ modalType: state })
}));

export default useModalStore;
