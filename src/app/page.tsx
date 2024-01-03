import Carousel from "@/components/Carousel";
import PostCardList from "@/components/PostCardList";
import Section from "@/components/layout/Section";
import { categoryTagList } from "@/data/tagData";
import HomeFilterTagList from "./HomeFilterTagList";
import { supabase } from "@/lib/supabase";
// import React, { useEffect, useState } from "react";

interface Props {
  searchParams: {
    category: string | null;
  };
}

const getPlaceData = async (category: string | null = null) => {
  /**
   * 쿼리스트링의 category가 CategoryType에 있는지 확인하는 함수
   * @param value 쿼리스트링
   * @returns 쿼리스트링이 CategoryType이 맞는지 확인
   */
  const checkCategory = (value: string | null): boolean => {
    const categories: CategoryType[] = ["카페", "아웃도어", "레스토랑", "미술관", "공원", "기타"];
    return categories.includes(value as CategoryType);
  };

  let api = "https://where2-go.vercel.app/api/places";
  if (checkCategory(category)) {
    api += `?category=${category}`;
  }
  const res = await fetch(api, { cache: "no-store" });
  const data = await res.json();
  return data;
};

const Home = async ({ searchParams }: Props) => {
  const { category } = searchParams;

  const placesData: Place[] = await getPlaceData(category);

  const urls = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg"];

  return (
    <>
      <Section title="Where to Go">
        <Carousel urls={urls} />
      </Section>
      <Section title="내 근처 핫플">
        <div>
          <HomeFilterTagList list={categoryTagList} category={category} className="my-4" />
          <PostCardList placeList={placesData} />
        </div>
      </Section>
    </>
  );
};

export default Home;
