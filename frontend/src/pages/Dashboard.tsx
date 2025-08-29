import { useState } from 'react'
import { Button } from '../Components/Button'
import { Card } from '../Components/Card'
import { CreateContentModel } from '../Components/CreateContentModel'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { Sidebar } from '../Components/Sidebar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {

    const [modelOpen, setModelOpen] = useState(false);
    const contents = useContent();

    return <div>
        <Sidebar />

        <div className="p-4 ml-76 min-h-screen bg-gray-100">

            <CreateContentModel open={modelOpen} onclose={() => {
                setModelOpen(false);
            }} />

            <div className="flex justify-end gap-4">
                <Button onClick={() =>
                    setModelOpen(true)} variant="primary" text="Add Content" startIcon={<Plusicon />}></Button>
                <Button variant="secondary" text="Share Brain" startIcon={<Shareicon />}></Button>
            </div>

            <div className='flex gap-4'>
                {contents.map(({ type, link, title }, index) => (
                    <Card
                        key={index} // or better, a unique id from backend
                        type={type}
                        link={link}
                        title={title}
                    />
                ))}
            </div>
        </div>
    </div >
}
