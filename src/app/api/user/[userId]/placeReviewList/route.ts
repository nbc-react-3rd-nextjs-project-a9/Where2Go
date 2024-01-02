import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const getPlaceReviewListByUserId = async (userId: string) => {
  const { data } = await supabase.from("placeReview").select().eq("userId", userId);
  return data;
};

export const GET = async (request: NextRequest, { params }: any): Promise<NextResponse<Place[] | null>> => {
  const { userId } = params;

  const res: Place[] | null = await getPlaceReviewListByUserId(userId);

  return NextResponse.json(res);
};
