import { useState } from "react";
import type { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    onSelect?: (type: string) => void; //callback
}

export function Sidebaritem({ text, icon, onSelect }: SidebarItemProps) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);

        if (onSelect) onSelect(text.toLowerCase()); //pass type to parent
        setTimeout(() => setClicked(false), 200);
    };

    return (
        <div
            className={`flex items-center  text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-60 transition-all duration-150
           ${clicked ? "bg-gray-300 scale-95" : " "}`}
            onClick={handleClick}>
            <div className="pr-2">{icon}</div>
            <div>{text}</div>
        </div >
    );
}