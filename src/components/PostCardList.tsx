import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  data: Place;
  selectCaregory?: string | null;
}

interface PostCardListProps {
  placeList: Place[] | undefined | null;
  selectCaregory?: string | null;
}

const PostCard = ({ data }: PostCardProps) => {
  console.log("data", data);
  const imagePath = data.imageUrl?.path;
  const storage = supabase.storage.from("placeReviewImg");
  const imageUrl = storage.getPublicUrl(imagePath);
  const publicUrl = imageUrl.data.publicUrl;
  return (
    <Link href={`/posts/${data.placeId}`}>
      <div className="relative w-[12rem] h-[16rem]  mx-auto transition-all ring-2 ring-black rounded-lg  overflow-hidden shadow-lg hover:-translate-y-2">
        <Image src={publicUrl} alt="Picture of the author" fill={true} sizes="12rem" />
        <div className="absolute h-[4rem]  w-full bottom-0 p-2  text-white bg-black bg-opacity-25 backdrop-blur-sm">
          <p className="font-bold text-md whitespace-nowrap text-ellipsis overflow-hidden">{data.placeName}</p>
          <p className=" text-xs mt-1 whitespace-nowrap text-ellipsis overflow-hidden">{data.address}</p>
        </div>
      </div>
    </Link>
  );
};

const PostCardList = ({ placeList, selectCaregory }: PostCardListProps) => {
  const filteredPlaceList = (): Place[] | undefined | null => {
    if (selectCaregory === "전체" || selectCaregory === null) return placeList;
    else {
      return placeList?.filter((n) => n.category === selectCaregory);
    }
  };
  return (
    <div>
      <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  grid-cols-2  gap-y-4 ">
        {filteredPlaceList()?.map((n) => (
          <li key={`postCard-${n.placeId}`} className={``}>
            <PostCard data={n} selectCaregory={selectCaregory} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCardList;
