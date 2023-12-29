import { supabase } from "@/lib/supabase";

export const getPlaceData = async (): Promise<Place[] | null> => {
  const { data } = await supabase.from("places").select();

  if (typeof data === null) return [];
  else return data;
};
