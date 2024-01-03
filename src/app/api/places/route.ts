import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const getPlaceData = async () => {
  const { data } = await supabase.from("places").select();
  if (typeof data === null) return [];
  else return data;
};

export const GET = async (request: NextRequest): Promise<NextResponse<Place[] | null>> => {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get("category");
  const res = await getPlaceData();

  if (!!category) {
    const result = res?.filter((n) => n.category === category);
    return !result ? NextResponse.json([]) : NextResponse.json(result);
  } else {
    return NextResponse.json(res);
  }
};
