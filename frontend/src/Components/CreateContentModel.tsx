import { useRef, useState } from "react";
import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

//controlled component
export function CreateContentModel({ open, onclose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);


    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/content`,{
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        onclose();
    }

    return <div>
        {open && <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onclose} className="cursor-pointer">
                            <Crossicon />
                        </div>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder={"title"} />
                        <Input ref={linkRef} placeholder={"Link"} />
                    </div>
                    <div>
                        <h1>Type</h1>
                        <div className="flex gap-1 justify-center pb-4">
                            <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Youtube)
                            }}></Button>
                            <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Twitter)
                            }}></Button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text="Submit"></Button>
                    </div>
                </span>
            </div>
        </div>}
    </div>
}