import { Logo } from "../icons/Logo";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Yahooicon } from "../icons/Yahoo";
import { Flipkarticon } from "../icons/Flipkart";
import { Amazonicon } from "../icons/Amazon";
import { Netflixicon } from "../icons/Netflix";
import { Canvaicon } from "../icons/Canva";
import { Quoraicon } from "../icons/Quora";
import { GitHubicon } from "../icons/GitHub";
import { LinkedInicon } from "../icons/LinkedIn";
import { Redditicon } from "../icons/Reddit";
import { Facebookicon } from "../icons/Facebook";
import { Instagramicon } from "../icons/Instagram";
import { Sidebaritem } from "./SidebarItem";
import { Button } from "./Button";
import { Logouticon } from "../icons/Logouticon";
import { BACKEND_URL } from "../config";
import axios from "axios";


interface SidebarProps {
    onSelect?: (type: string) => void;
}


export function Sidebar({ onSelect }: SidebarProps) {
    return (
        <div className=" h-screen-[2] background-blue shadow right-2px w-50 fixed left-0 top-0  pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-3 ">
                    <Logo />
                </div>
                Brainly
            </div>
            <div className=" flex flex-col  bg-slate-50 pt-8 pl-4">
                <Sidebaritem text="Twitter" icon={<Twittericon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Youtube" icon={<Youtubeicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Instagram" icon={<Instagramicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Facebook" icon={<Facebookicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Reddit" icon={<Redditicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="LinkedIn" icon={<LinkedInicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="GitHub" icon={<GitHubicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Quora" icon={<Quoraicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Canva" icon={<Canvaicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Netflix" icon={<Netflixicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Amazon" icon={<Amazonicon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Flipkart" icon={<Flipkarticon />} onSelect={onSelect}></Sidebaritem>
                <Sidebaritem text="Yahoo" icon={<Yahooicon />} onSelect={onSelect}></Sidebaritem>
            </div>
            <div >
                <Button
                    variant="primary"
                    text="Logout"
                    startIcon={<Logouticon />}
                    fullWidth={true}
                    onClick={async () => {
                        try {
                            await axios.post(`${BACKEND_URL}/logout`, {}, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                            });

                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
                            window.location.href = "/";

                        } catch (err) {
                            console.error("Logout failed:", err);
                            alert("Logout failed. Try again.");
                        }
                    }}
                />

            </div>
        </div >
    )
}