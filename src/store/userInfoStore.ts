import { create } from "zustand";

interface UserInfo {
  uid: string;

  fetchUser: (data: string) => void;
  updateUser: (data: string) => void;
  resetUser: () => void;
}

const useUserStore = create<UserInfo>()((set) => ({
  uid: "",
  fetchUser: (data) => set(() => ({ uid: data })),
  updateUser: (data) => set(() => ({ uid: data })),
  resetUser: () => set(() => ({ uid: "" }))
}));
