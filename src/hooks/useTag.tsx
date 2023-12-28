"use client";

type ReturnType = [string | null, (e: React.ChangeEvent<HTMLInputElement>) => void];

import { useState } from "react";

const useTag = (): ReturnType => {
  const [value, setValue] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, onChange];
};

export default useTag;
