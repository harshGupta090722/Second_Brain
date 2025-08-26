import { Crossicon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";

//controlled component
export function CreateContentModel({ open, onclose }) {
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
                        <Input placeholder={"title"} />
                        <Input placeholder={"Link"} />
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" text="Submit"></Button>
                    </div>
                </span>
            </div>
        </div>}
    </div>
}
