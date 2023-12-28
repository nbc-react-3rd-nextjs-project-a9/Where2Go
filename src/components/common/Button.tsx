import React from "react";

type Props = {
  value: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ value, onClick, disabled }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} className="bg-purple-300 p-2 rounded-xl text-lg ">
      {value}
    </button>
  );
};

export default Button;
