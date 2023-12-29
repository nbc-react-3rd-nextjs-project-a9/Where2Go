import { supabase } from "@/lib/supabase";

export const getPlaceData = async () => {
  const { data, error } = await supabase.from("place").select();
  return { data, error };
};
