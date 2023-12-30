"use client";
import Carousel from "@/components/Carousel";
import FilterTagList from "@/components/filterTag/FilterTagList";
import PostCardList from "@/components/PostCardList";
import Section from "@/components/layout/Section";
import useTag from "@/hooks/useTag";
import { categoryTagList } from "@/data/tagData";
import { useQuery } from "@tanstack/react-query";
import { getPlaceData } from "@/api/places";

export default function Home() {
  const [selectCategory, onChangeCategory] = useTag();
  const { data } = useQuery({ queryKey: ["places"], queryFn: getPlaceData });

  return (
    <>
      <Section title="Editor's Pick">
        <Carousel />
      </Section>
      <Section title="내 근처 핫플">
        <div>
          <FilterTagList list={categoryTagList} onChange={onChangeCategory} className="my-4" />
          <PostCardList placeList={data} selectCaregory={selectCategory} />
        </div>
      </Section>
    </>
  );
}
