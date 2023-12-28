"use client";

import React from "react";
import FilterTag from "./FilterTag";

interface FilterTagListProps {
  list: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FilterTagList = ({ list, onChange, className }: FilterTagListProps) => {
  return (
    <div className={`whitespace-nowrap ${className}`}>
      {list.map((n) => (
        <FilterTag value={n} key={n} onChange={onChange} />
      ))}
    </div>
  );
};

export default FilterTagList;
