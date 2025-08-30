import { Shareicon } from "../icons/Shareicon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}


export function Card({ title, link, type }: CardProps) {
    return <div className="p-4 mt-4 bg-white rounded-md border border-gray-200 max-w-[15rem] min-w-[17rem] min-h-[20rem] max-h-[25rem] overflow-y-auto">
        <div className="flex justify-between">
            <div className="flex items-center text-md">
                <div className="pr-2 text-gray-500">
                    <a href={link} target="_blank">
                        <Shareicon />
                    </a>
                </div>
                {title}
            </div>
            <div className="flex items-center">
                <div className="pr-2 text-gray-500">
                    <a href={link} target="_blank">
                        <Shareicon />
                    </a>
                </div>
                <div className="pr-2 text-gray-500">
                    <a href={link} target="_blank">
                        <Shareicon />
                    </a>
                </div>
            </div>
        </div>
        <div className="pt-4">
            {type === "youtube" && <iframe className="w-full" src={link.replace("watch?v=6p8R6vFuFMI&ab_channel=100xDevs", "embed/6p8R6vFuFMI?si=p72gVv1jfHMoOOCS")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            {type === "twitter" && <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>}
        </div>
    </div>
}