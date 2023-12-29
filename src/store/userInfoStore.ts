import { create } from "zustand";

interface UserInfo {
  uid: string;
  nickname: string;
  avatar_url: string;
}

interface UpdateFunctions {
  //   fetchUser: (data: object) => void;
  updateName: (newName: string) => void;
  updateAvatar: (newAvatar: string) => void;
  resetUser: () => void;
  getUID: () => void;
}

export const useUserInfoStore = create<UserInfo & UpdateFunctions>((set) => ({
  uid: "",
  nickname: "",
  avatar_url: "",
  updateName: (newName) => set({ nickname: newName }),
  updateAvatar: (newAvatar) => set({ avatar_url: newAvatar }),
  resetUser: () => set({ uid: "", nickname: "", avatar_url: "" }),
  getUID: () => set({ uid: sessionStorage.getItem("uid") || "" })
}));
