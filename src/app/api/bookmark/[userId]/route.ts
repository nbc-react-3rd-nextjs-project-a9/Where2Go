import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

interface ReturnData {
  placeId: string;
  imageUrl: string;
  placeName: string;
}

const getBookmarkList = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookmark")
    .select("*")
    .eq("userId", userId)
    .select("placeId, places ( placeName, imageUrl)");

  if (error) throw error;

  return data;
};

// 유저의 북마크된 장소 ID 목록들을 가져온다.[GET]
export const GET = async (request: NextRequest, { params }: any) => {
  const { userId } = params;
  try {
    const res = await getBookmarkList(userId);

    const placeIdList = res.map((n: any) => {
      const data = {
        placeId: n.placeId,
        imageUrl: n.places.imageUrl,
        placeName: n.places.placeName
      };

      return data;
    });
    return NextResponse.json(placeIdList);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
