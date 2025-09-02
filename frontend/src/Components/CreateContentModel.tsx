import { useRef, useState } from "react";
import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    Facebook = "facebook",
    Reddit = "reddit",
    LinkedIn = "linkedin",
    GitHub = "github",
    Quora = "quora",
    Canva = "canva",
    Netflix = "netflix",
    Amazon = "amazon",
    Flipkart = "flipkart",
    Yahoo = "yahoo"
}

//controlled component
export function CreateContentModel({ open, onclose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Twitter);


    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/content`, {
            link,
            type,
            title
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
                            <Button text="Instagram" variant={type === ContentType.Instagram ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Instagram)
                            }}></Button>
                            <Button text="Facebook" variant={type === ContentType.Facebook ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Facebook )
                            }}></Button>
                            <Button text="Reddit" variant={type === ContentType.Reddit ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Reddit)
                            }}></Button>
                            <Button text="LinkedIn" variant={type === ContentType.LinkedIn ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.LinkedIn)
                            }}></Button>
                            <Button text="GitHub" variant={type === ContentType.GitHub ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.GitHub)
                            }}></Button>
                            <Button text="Quora" variant={type === ContentType.Quora ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Quora )
                            }}></Button>
                            <Button text="Canva" variant={type === ContentType.Canva ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Canva)
                            }}></Button>
                            <Button text="Netflix" variant={type === ContentType.Netflix ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Netflix)
                            }}></Button>
                            <Button text="Amazon" variant={type === ContentType.Amazon ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Amazon)
                            }}></Button>
                            <Button text="Flipkart" variant={type === ContentType.Flipkart ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Flipkart)
                            }}></Button>
                            <Button text="Yahoo" variant={type === ContentType.Yahoo ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Yahoo)
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