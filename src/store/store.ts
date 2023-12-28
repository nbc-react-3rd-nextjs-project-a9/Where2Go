import create from "zustand";

interface MapStore {
  info: any;
  setInfo: (newInfo: any) => void;
}

const useMapStore = create<MapStore>((set) => ({
  info: null,
  setInfo: (newInfo) => set({ info: newInfo })
}));

export default useMapStore;
