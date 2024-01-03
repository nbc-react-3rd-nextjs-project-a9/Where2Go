import { supabase } from "@/lib/supabase";

export const getPlaceData = async (): Promise<Place[] | null> => {
  const { data } = await supabase.from("places").select();

  if (typeof data === null) return [];
  else return data;
};

export const getPlaceDataByPlaceId = async (placeId: string | string[]) => {
  const { data } = await supabase.from("places").select().eq("placeId", placeId).single();
  return data;
};

export const getPlaceReviewsDataByPlaceName = async (placeName: string): Promise<any[] | null> => {
  const { data } = await supabase.from("placeReview").select().eq("placeName", placeName);
  return data;
};
// test
export const getPlaceReviewsDataByPlaceNameAndUserId = async (placeName: string, userId: string | string[]) => {
  const { data } = await supabase.from("placeReview").select().eq("placeName", placeName).eq("userId", userId).single();
  return data;
};

export const getPlaceReviewsDataByUserId = async (userId: string | string[]) => {
  const { data } = await supabase.from("placeReview").select().eq("userId", userId);
  return data;
};

export const getUserIdInPlaceReviewsDataByPlaceName = async (placeName: string) => {
  const { data } = await supabase.from("placeReview").select("userId").eq("placeName", placeName);
  return data;
};

export const getUserDataByUserIds = async (userIds: any[]): Promise<any[] | null> => {
  const { data } = await supabase.from("userinfo").select().in("id", userIds);
  return data;
};

// export const getFollowId = async() => {
//   const {data} = await supabase.from('follow').select()
// }
export const getFollowListByUserId = async (userId: string | null): Promise<any[] | null> => {
  const { data } = await supabase.from("follow").select("to").eq("from", userId);
  return data;
};

export const getFollowedListByUserId = async (userId: string | null): Promise<any[] | null> => {
  const { data } = await supabase.from("follow").select("from").eq("to", userId);
  return data;
};
