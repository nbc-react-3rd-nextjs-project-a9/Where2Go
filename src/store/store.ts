import { create } from "zustand";

interface MapStore {
  info: Marker;
  setInfo: (newInfo: Marker) => void;
  initInfo: () => void;
}

const initialState: Marker = {
  position: {
    lat: 37.566826,
    lng: 126.9786567
  },
  content: "",
  address: "",
  placeName: ""
};

const useMapStore = create<MapStore>((set) => ({
  info: {
    position: {
      lat: 37.566826,
      lng: 126.9786567
    },
    content: "",
    address: "",
    placeName: ""
  },

  setInfo: (newInfo) => set({ info: newInfo }),
  initInfo: () => set({ info: initialState })
}));

export default useMapStore;
