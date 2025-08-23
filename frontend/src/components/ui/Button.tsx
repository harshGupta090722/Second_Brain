export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "large";
    text: String;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
}

const variantClasses: Record<ButtonProps["variant"], string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

const sizeClasses: Record<ButtonProps["size"], string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
};


export const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 rounded-lg font-medium transition ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            {text}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
        </button>
    );
};