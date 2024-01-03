import { supabase } from "@/lib/supabase";

export const addFollow = async (newFollow: Follow) => {
  await supabase.from("follow").insert([newFollow]);
};

export const deleteFollow = async (deleteFollow: Follow) => {
  await supabase.from("follow").delete().eq("to", deleteFollow.to).eq("from", deleteFollow.from);
};
