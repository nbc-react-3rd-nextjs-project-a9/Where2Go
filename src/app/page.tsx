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
  const [placeData, setPlaceData] = useState<Place[]>();
  const { data } = useQuery({ queryKey: ["places"], queryFn: getPlaceData });

  return (
    <>
      <Carousel />
      <div className="container m-auto" style={{ width: "90%" }}>
        <Section title="Editor's Pick">{<></>}</Section>

        <Section title="내 근처 핫플">
          {
            <>
              <div className="flex my-4">
                <FilterTagList list={categoryTagList} onChange={onChangeCategory} />
                <FilterTagList list={filterTagList} onChange={onChangefilterTag} className={"ml-auto"} />
              </div>
              <PostCardList placeList={data} />
            </>
          }
        </Section>
      </div>
    </>
  );
}
