"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface FilterTagProps {
  value: string;
  category: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterTagListProps {
  list: string[];
  category: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FilterTag = ({ value, category, onChange }: FilterTagProps) => {
  const defaultChecked = () => {
    const checkCategory = (value: string | null): boolean => {
      const categories: CategoryType[] = ["카페", "아웃도어", "레스토랑", "미술관", "공원", "기타"];
      return categories.includes(value as CategoryType);
    };
    if (!category || !checkCategory(category)) {
      return value === "전체";
    } else return value === category;
  };
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
          defaultChecked={defaultChecked()}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

const HomeFilterTagList = ({ list, category, className }: FilterTagListProps) => {
  const router = useRouter();
  const onChange = (category: string) => {
    router.push(`?category=${category}`, { scroll: false });
  };
  return (
    <div className={`flex flex-row gap-2 flex-wrap ${className}`}>
      {list.map((n) => (
        <FilterTag value={n} key={n} category={category} onChange={() => onChange(n)} />
      ))}
    </div>
  );
};

export default HomeFilterTagList;
