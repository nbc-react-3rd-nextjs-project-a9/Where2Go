import { create } from "zustand";

interface UserInfo {
  uid: string;
  nickname: string;
  avatar_url: string;
}

interface UpdateFunctions {
  updateName: (newName: string) => void;
  updateAvatar: (newAvatar: string) => void;
  resetUser: () => void;
  getUID: (id: string) => void;
}

export const useUserInfoStore = create<UserInfo & UpdateFunctions>((set) => ({
  uid: "",
  nickname: "",
  avatar_url: "",
  updateName: (newName) => set({ nickname: newName }),
  updateAvatar: (newAvatar) => set({ avatar_url: newAvatar }),
  resetUser: () => set({ uid: "", nickname: "", avatar_url: "" }),
  getUID: (id) => set({ uid: id })
}));
