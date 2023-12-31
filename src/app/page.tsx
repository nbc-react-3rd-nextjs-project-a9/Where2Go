import Carousel from "@/components/Carousel";
import PostCardList from "@/components/PostCardList";
import Section from "@/components/layout/Section";
import { categoryTagList } from "@/data/tagData";
import HomeFilterTagList from "./HomeFilterTagList";

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
  const res = await fetch(api);
  const data = await res.json();
  return data;
};

const Home = async ({ searchParams }: Props) => {
  const { category } = searchParams;
  const placesData: Place[] = await getPlaceData(category);
  return (
    <>
      <Section title="Editor's Pick">
        <Carousel />
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
