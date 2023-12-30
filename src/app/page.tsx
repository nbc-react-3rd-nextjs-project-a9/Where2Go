"use client";
import Carousel from "@/components/Carousel";
import FilterTagList from "@/components/filterTag/FilterTagList";
import PostCardList from "@/components/PostCardList";
import Section from "@/components/layout/Section";
import { mockPlaceData } from "@/data/mockPlace";
import useTag from "@/hooks/useTag";
import { categoryTagList, filterTagList } from "@/data/tagData";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaceData } from "@/api/places";

export default function Home() {
  const [categoryValue, onChangeCategory] = useTag();
  const [filterTagListValue, onChangefilterTag] = useTag();
  const { data } = useQuery({ queryKey: ["places"], queryFn: getPlaceData });

  const filteredData = data?.filter((item) => item.category === categoryValue);

  const urls = [
    "https://dummyimage.com/1700x400/616161/fff&text=image",
    "https://dummyimage.com/170x400/616161/fff&text=image,"
  ];
  return (
    <>
      0
      <div className="">
        <Section title="Editor's Pick">{<Carousel urls={urls} />}</Section>

        <Section title="내 근처 핫플">
          {
            <>
              <div className="flex my-4">
                <FilterTagList list={categoryTagList} onChange={onChangeCategory} />
                <FilterTagList list={filterTagList} onChange={onChangefilterTag} className={"ml-auto"} />
              </div>
              {categoryValue === "전체" || categoryValue === null ? (
                <PostCardList placeList={data} />
              ) : (
                <PostCardList placeList={filteredData} />
              )}
            </>
          }
        </Section>
      </div>
    </>
  );
}
