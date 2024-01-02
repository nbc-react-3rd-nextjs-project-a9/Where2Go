import { checkAuth } from "@/components/auth/authService";
import { supabase } from "@/lib/supabase";
import { create } from "zustand";

interface LogedIn {
  logedIn: boolean;
  setLogedIn: (state: boolean) => void;
}

const useLogedInStore = create<LogedIn>((set) => ({
  //   logedIn: sessionStorage.length === 3 ? true : false,
  logedIn: false,
  setLogedIn: (state) => set({ logedIn: state })
}));

export default useLogedInStore;
