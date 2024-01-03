import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const { data } = await supabase.from("places").select().eq("placeId", placeId).single();
  const { data: recentReviewerData } = await supabase
    .from("placeReview")
    .select()
    .eq("placeName", data.placeName)
    .single();
  const userId = await recentReviewerData?.userId;
  return redirect(`${placeId}/${userId}`);
};
export default page;
