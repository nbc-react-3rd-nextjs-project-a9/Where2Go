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

  let api = "http://localhost:3000/api/places";
  if (checkCategory(category)) {
    api += `?category=${category}`;
  }
  const res = await fetch(api, { cache: "no-store" });
  const data = await res.json();
  return data;
};

const Home = async ({ searchParams }: Props) => {
  const { category } = searchParams;
  // const [placesData, setPlacesData] = useState<Place[]>([]);
  const placesData: Place[] = await getPlaceData(category);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getPlaceData(category);
  //     setPlacesData(data);
  //   };

  //   fetchData();
  // }, [category]);
  const urls = [
    "https://dummyimage.com/1700x400/616161/fff&text=image",
    "https://dummyimage.com/170x400/616161/fff&text=image,"
  ];

  return (
    <>
      <Section title="Editor's Pick">
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
