import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const addBookmark = async (userId: string, placeId: string) => {
  const { data, error } = await supabase
    .from("bookmark")
    .insert([{ userId: userId, placeId: placeId }])
    .select();

  if (error) throw error;
  return data;
};

const checkBookmark = async (userId: string, placeId: string) => {
  const { data, error } = await supabase
    .from("bookmark")
    .select("userId,placeId")
    .eq("userId", userId)
    .eq("placeId", placeId);
  if (error) throw error;
  return data;
};

const deleteBookmark = async (userId: string, placeId: string) => {
  const { error } = await supabase.from("bookmark").delete().eq("userId", `${userId}`).eq("placeId", `${placeId}`);
  if (error) throw error;
  return true;
};

/**
 * [GET] 유저가 해당 placeID를 북마크를 했는지 안했는지 확인하는 함수
 * @returns boolean
 */
export const GET = async (request: NextRequest, { params }: any) => {
  const { userId, placeId } = params;
  try {
    const res = await checkBookmark(userId, placeId);
    const data = res.length > 0 ? true : false;
    return NextResponse.json(data);
  } catch (error) {
    NextResponse.json({ error }, { status: 500 });
  }
};

/**
 * [POST] 유저가 해당 placeID를 북마크하는 함수
 * @returns id, userId, placeId
 */
export const POST = async (request: NextRequest, { params }: any) => {
  const { userId, placeId } = params;

  const postRes = await addBookmark(userId, placeId);
  return NextResponse.json(postRes);
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { userId, placeId } = params;

  const deleteRes = await deleteBookmark(userId, placeId);
  return NextResponse.json(deleteRes);
};
