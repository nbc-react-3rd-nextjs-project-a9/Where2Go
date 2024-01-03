import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const getUserDataByUserId = async (userId: string) => {
  const { data } = await supabase.from("userinfo").select().eq("id", userId).single();
  return data;
};

export const GET = async (request: NextRequest, { params }: any) => {
  const { userId } = params;

  const res: User | null = await getUserDataByUserId(userId);

  return NextResponse.json(res);
};
