import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "large";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

type VariantClasses = {
  primary: string;
  secondary: string;
};

const variantClasses: VariantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-400 text-purple-600",
};

type SizeClasses = {
  sm: string;
  md: string;
  large: string;
};

const sizeClasses: SizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`flex items-center gap-2 rounded-md ${variantClasses[props.variant]} ${sizeClasses[props.size]}`}
    >
      {props.startIcon && <span className="flex items-center">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="flex items-center">{props.endIcon}</span>}
    </button>
  );
};