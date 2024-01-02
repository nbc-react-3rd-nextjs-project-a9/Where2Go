import { supabase } from "@/lib/supabase";

export const addFollow = async (newFollow: Follow) => {
  await supabase.from("follow").insert([newFollow]);
};

export const deleteFollow = async (id: string | string[]) => {
  await supabase.from("follow").delete().eq("to", id);
};
