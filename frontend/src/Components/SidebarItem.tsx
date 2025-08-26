import type { ReactElement } from "react";

export function Sidebaritem({ text, icon }: {
    text: string,
    icon: ReactElement,
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-60 transition-all duration-150">
        <div className="pr-2">
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}