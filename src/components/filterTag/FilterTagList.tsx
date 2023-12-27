import { enumCategory, enumFilter } from "@/types/enum";
import React from "react";
import FilterTag from "./FilterTag";

interface FilterTagListProps {
  tagType: "category" | "filter";
  className?: string;
}

const FilterTagList = ({ tagType }: FilterTagListProps) => {
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
