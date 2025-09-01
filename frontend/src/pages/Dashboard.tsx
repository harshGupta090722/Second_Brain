import { useEffect, useState, useCallback } from "react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { CreateContentModel } from "../Components/CreateContentModel";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";
import { Sidebar } from "../Components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const [filter, setFilter] = useState<string>();
    const { contents, refresh } = useContent(filter);

    const handleSidebarSelect = useCallback((type: string) => {
        setFilter(type);
    }, []);

    // Refresh contents when modal closes/opens
    useEffect(() => {
        refresh();
    }, [modelOpen]);

    // Share brain handler
    const handleShare = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/brain/share`,
                { share: true },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            await navigator.clipboard.writeText(shareUrl);
            alert(shareUrl);
        } catch (err) {
            console.error("Error sharing brain:", err);
            alert("Failed to share. Try again.");
        }
    };

    const user = localStorage.getItem("user") || "User";

    return (
        <div>
            <Sidebar onSelect={handleSidebarSelect} />

            <div className="p-4 ml-50 min-h-screen bg-gray-100">
                <CreateContentModel open={modelOpen} onclose={() => setModelOpen(false)} />

                {/* Top Actions */}
                <div className="flex justify-end gap-4 items-center">
                    <div className="text-gray-700">Welcome {user}</div>

                    <Button
                        onClick={() => setModelOpen(true)}
                        variant="primary"
                        text="Add Content"
                        startIcon={<Plusicon />}
                    />

                    <Button
                        onClick={handleShare}
                        variant="secondary"
                        text="Share Brain"
                        startIcon={<Shareicon />}
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {contents.map(({ type, link, title }) => (
                        <Card type={type} link={link} title={title} />
                    ))}
                </div>
            </div >
        </div >
    );
}