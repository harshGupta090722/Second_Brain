import { useEffect, useState } from 'react'
import { Button } from '../Components/Button'
import { Card } from '../Components/Card'
import { CreateContentModel } from '../Components/CreateContentModel'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { Sidebar } from '../Components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

export function Dashboard() {

    const [modelOpen, setModelOpen] = useState(false);
    const { contents, refresh } = useContent();


    useEffect(() => {
        refresh();
    }, [modelOpen])

    return <div>
        <Sidebar />

        <div className="p-4 ml-76 min-h-screen bg-gray-100">

            <CreateContentModel open={modelOpen} onclose={() => {
                setModelOpen(false);
            }} />

            <div className="flex justify-end gap-4">
                <Button onClick={() =>
                    setModelOpen(true)} variant="primary" text="Add Content" startIcon={<Plusicon />}></Button>
                <Button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/brain/share`, {
                        share: true
                    }, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                    navigator.clipboard.writeText(shareUrl);
                    alert(shareUrl);

                }} variant="secondary" text="Share Brain" startIcon={<Shareicon />}></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {contents.map(({ type, link, title }) => (
                    <Card
                        key={link}  // ideally use an id
                        type={type}
                        link={link}
                        title={title}
                    />
                ))}
            </div>
        </div>
    </div >
}