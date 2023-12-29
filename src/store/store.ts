import create from "zustand";

type position = {
  lat: number;
  lng: number;
};

interface Marker {
  position: position;
  content: string;
  address: string;
  placeName: string;
}

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
