"use client";

import React from "react";

interface FilterTagProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterTagListProps {
  list: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FilterTag = ({ value, onChange }: FilterTagProps) => {
  return (
    <>
      <label
        className="cursor-pointer text-sm font-bold px-2 py-1 border-2 border-purple-900   rounded-md hover:bg-purple-100  has-[:checked]:bg-purple-900 has-[:checked]:text-white"
        htmlFor={`filterTag-${value}`}
      >
        {value}
        <input
          className="hidden"
          type="radio"
          name={`filterTag`}
          id={`filterTag-${value}`}
          defaultChecked={value === "전체"}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

const FilterTagList = ({ list, onChange, className }: FilterTagListProps) => {
  return (
    <div className={`flex flex-row gap-2 flex-wrap ${className}`}>
      {list.map((n) => (
        <FilterTag value={n} key={n} onChange={onChange} />
      ))}
    </div>
  );
};

export default FilterTagList;
