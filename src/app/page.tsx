import Carousel from "@/components/Carousel";
import FilterTagList from "@/components/filterTag/FilterTagList";
import PostCardList from "@/components/PostCardList";
import Section from "@/components/layout/Section";
import { mockPlaceData } from "@/data/mockPlace";

export default function Home() {
  return (
    <>
      <Carousel />
      <div className="container m-auto" style={{ width: "90%" }}>
        <Section title="Editor's Pick">{<></>}</Section>

        <Section title="내 근처 핫플">
          {
            <>
              <div className="flex my-4">
                <FilterTagList tagType="category" />
                <FilterTagList tagType="filter" className={"ml-auto"} />
              </div>
              <PostCardList placeList={mockPlaceData} />
            </>
          }
        </Section>
      </div>
    </>
  );
}
