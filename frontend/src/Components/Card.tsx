import { Bookmarkicon } from "../icons/Bookmarkicon";
import { Deleteicon } from "../icons/Deleteicon";
import { Shareicon } from "../icons/Shareicon";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CardProps {
    _id: string,
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "facebook" | "reddit" | "linkedin" | "github" | "quora" | "canva" | "netflix" | "amazon" | "flipkart" | "yahoo";
    refresh: () => void;
}


export function Card({ _id, title, link, type, refresh }: CardProps) {
    const handleDelete = async (contentId: String) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.delete(`${BACKEND_URL}/content`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { contentId },
            });
            if (res.status === 200) {
                console.log("Deleted Sucessfully");
                refresh();
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="p-0 mt-4 bg-white rounded-2xl border border-gray-300 max-w-[15rem] min-w-[20rem] min-h-[25rem] max-h-[30rem] overflow-y-auto">

            {/* Header */}
            <div className="flex h-12 w-full justify-between sticky top-0 bg-white  shadow-md">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500">
                        <Bookmarkicon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <Shareicon />
                    </div>
                    <div className="text-gray-500 cursor-pointer " onClick={() => handleDelete(_id)}>
                        <Deleteicon />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="pr-1 pl-1">
                {type === "twitter" && (
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                )}

                {type === "youtube" && (
                    <iframe
                        width="420"
                        height="315"
                        src={
                            link.includes("watch?v=")
                                ? link.replace("watch?v=", "embed/").split("&")[0]
                                : link.includes("youtu.be/")
                                    ? link.replace("youtu.be/", "youtube.com/embed/").split("?")[0]
                                    : link
                        }
                    ></iframe>
                )}

                {type === "instagram"}
                {type === "facebook"}
                {type === "reddit"}
                {type === "linkedin"}
                {type === "github"}
                {type === "quora"}
                {type === "canva"}
                {type === "netflix"}
                {type === "amazon"}
                {type === "flipkart"}
                {type === "yahoo"}
            </div>

        </div>
    );
}