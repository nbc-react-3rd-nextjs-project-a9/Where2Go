"use client";

import React from "react";

interface FilterTagProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterTag = ({ value, onChange }: FilterTagProps) => {
  return (
    <>
      <label
        className="cursor-pointer  px-3 py-1 mr-2 border-purple-900  border-2 rounded-full has-[:checked]:bg-purple-900 has-[:checked]:text-white"
        htmlFor={`filterTag-${value}`}
      >
        {value}
        <input
          className="hidden"
          type="radio"
          name={`filterTag`}
          id={`filterTag-${value}`}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};
export default FilterTag;
