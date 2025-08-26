import type { ReactElement } from "react";


interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    primary: "bg-purple-800 text-white ",
    secondary: "bg-gray-200 text-purple-600",
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {

    return <button
        onClick={onClick}
        className={`
        ${variantClasses[variant]}
        ${defaultStyles}
        ${fullWidth ? "w-full flex justify-center items-center" : ""}
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
        disabled={loading}
    >
        {loading ? (
            <span>Loading...</span>
        ) : (
            <>
                {startIcon && <span className="pr-2 flex items-center">{startIcon}</span>}
                {text}
            </>
        )}
    </button>
}