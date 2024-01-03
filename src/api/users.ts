import { supabase } from "@/lib/supabase";

export const getUserDataByUserId = async (userId: string) => {
  const { data } = await supabase.from("userinfo").select().eq("id", userId).single();
  return data;
};
