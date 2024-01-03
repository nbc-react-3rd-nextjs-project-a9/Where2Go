import create from "zustand";

interface PositionStore {
  position: { lat: number; lng: number };
  setPosition: (newPosition: any) => void;
}

const usePositionStore = create<PositionStore>((set) => ({
  position: { lat: 37.566826, lng: 126.9786567 },
  setPosition: (newPosition) => set({ position: newPosition })
}));

export default usePositionStore;
