import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "large";
    text: String;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

type VariantClasses = {
  primary: string;
  secondary: string;
};

const variantClasses: VariantClasses = {
  primary: "bg-purple-600 text-white hover:bg-blue-700",
  secondary: "bg-purple-300 text-gray-600 hover:bg-gray-300",
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
            className={`flex-row mx-[5px]  items-center gap-2 rounded-lg font-medium transition ${variantClasses[props.variant]} ${sizeClasses[props.size]}`}
        >
            {props.startIcon && <span className="flex items-center">{props.startIcon}</span>}
            {props.text}
            {props.endIcon && <span className="flex items-center">{props.endIcon}</span>}
        </button>
    );
};