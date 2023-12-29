import { supabase } from "@/lib/supabase";
export const getPlaceData = async () => {
  const { data, error } = await supabase.from("places").select();
  return { data, error };
};
