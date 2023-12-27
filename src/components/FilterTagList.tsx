import { enumCategory, enumFilter } from "@/types/enum";
import React from "react";

interface FilterTagProps {
  tag: keyof typeof enumCategory | keyof typeof enumFilter;
}

interface FilterTagListProps {
  tagType: "category" | "filter";
  className?: string;
}

enum FilterTagPeer {}

const FilterTag = ({ tag }: FilterTagProps) => {
  const tagValue =
    tag in enumCategory ? enumCategory[tag as keyof typeof enumCategory] : enumFilter[tag as keyof typeof enumFilter];
  return (
    <>
      <label
        className="cursor-pointer  px-3 py-1 mr-2 border-purple-900  border-2 rounded-full has-[:checked]:bg-purple-900 has-[:checked]:text-white"
        htmlFor={`filterTag-${tag}`}
      >
        {tagValue}
        <input className="hidden" type="radio" name={`filterTag`} id={`filterTag-${tag}`} />
      </label>
    </>
  );
};

const FilterTagList = ({ tagType, className }: FilterTagListProps) => {
  const enumCategoryList = Object.keys(enumCategory) as Array<keyof typeof enumCategory>;
  const enumFilterList = Object.keys(enumFilter) as Array<keyof typeof enumFilter>;

  return (
    <div className={`${tagType === "filter" && "ml-auto"} inline-block`}>
      {tagType === "category"
        ? enumCategoryList.map((n) => <FilterTag tag={n} key={n} />)
        : enumFilterList.map((n) => <FilterTag tag={n} key={n} />)}
    </div>
  );
};

export default FilterTagList;
