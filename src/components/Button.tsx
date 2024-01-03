import React from "react";

interface Props {
  children: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  theme?: keyof typeof ButtonTheme;
}

enum ButtonSizeEnum {
  sm = "px-4 py-1 text-sm rounded-lg min-w-[6rem]",
  md = "px-8 py-2 text-base rounded-xl min-w-[8rem]",
  lg = "px-12 py-3 text-lg rounded-2xl min-w-[10rem]"
}

enum ButtonTheme {
  default = "text-white font-bold bg-purple-900  hover:bg-purple-400 active:bg-purple-950",
  warning = "text-white font-bold bg-red-600  hover:bg-red-300 active:bg-red-700",
  success = "text-white font-bold bg-green-600  hover:bg-green-400 active:bg-green-700"
}

const Button = ({
  children,
  onClick,
  type = "button",
  theme = "default",
  size = "md",
  disabled = false,
  className
}: Props) => {
  return (
    <button
      className={`${ButtonSizeEnum[size]} ${ButtonTheme[theme]} text-center transition-all disabled:bg-slate-400 disabled:text-gray-300 ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
