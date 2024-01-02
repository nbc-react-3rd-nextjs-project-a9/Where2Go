// import { create } from "zustand";

// interface UserInfo {
//   uid: string;
//   nickname: string;
//   avatar_url: string;
// }

// interface UpdateFunctions {
//   updateName: (newName: string) => void;
//   updateAvatar: (newAvatar: string) => void;
//   resetUser: () => void;
//   getUID: (id: string) => void;
// }

// // let rawData = localStorage.getItem("sb-fatcfzssyzoiskrplehv-auth-token") || "";
// let rawData = localStorage.getItem("sb-cojgljiqpitvuwdvnmgf-auth-token") || "";

// let userInfo = rawData.length ? JSON.parse(rawData) : "";

// export const useUserInfoStore = create<UserInfo & UpdateFunctions>((set) => ({
//   uid: userInfo === "" ? "" : userInfo.user.id,
//   nickname: userInfo === "" ? "" : userInfo.user.user_metadata.user_name,
//   avatar_url: userInfo === "" ? "" : userInfo.user.user_metadata.avatar_url,
//   updateName: (newName) => set({ nickname: newName }),
//   updateAvatar: (newAvatar) => set({ avatar_url: newAvatar }),
//   resetUser: () => set({ uid: "", nickname: "", avatar_url: "" }),
//   getUID: (id) => set({ uid: id })
// }));
