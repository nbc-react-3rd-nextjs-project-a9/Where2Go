import useMapStore from "@/store/store";
import React from "react";

const SearchResultsBox = ({ keywords }: { keywords: Marker[] }) => {
  const setInfo = useMapStore((state) => state.setInfo);
  return (
    <div className="absolute top-[5px] left-[5px] z-10 w-[250px] h-[300px] overflow-auto bg-slate-50/70 flex flex-col gap-1">
      {keywords.map((keyword) => {
        return (
          <div
            key={`marker-${keyword.content}-${keyword.position.lat},${keyword.position.lng}`}
            className="cursor-pointer border-b-black border-b-2 p-2"
            onClick={() => {
              setInfo(keyword);
            }}
          >
            <p className="font-semibold">{keyword.placeName}</p>
            <p>{keyword.address}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsBox;
